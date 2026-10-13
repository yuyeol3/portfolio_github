import { fetchPublicRepositories, fetchExternalRepositories } from './github.js';
import { curateRepositories, resolveExternalRepositories, repositoryUrl } from './repositories.js';

const $ = selector => document.querySelector(selector);
let config;
let repositories = [];
let category = 'all';
let scope = 'all';
let discoveryWarning = '';
const formatter = new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const categories = () => [...config.categories, { id: 'uncategorized', label: '미분류' }];
const isOwned = repo => repo.owner.login.toLowerCase() === config.username.toLowerCase();
const cacheKey = () => `repository-archive:${config.username}:${JSON.stringify(config.externalRepositories)}`;

function renderCategories() {
  const items = [{ id: 'all', label: '모든 프로젝트' }, ...categories()];
  $('#categories').replaceChildren(...items.map(item => {
    const count = repositories.filter(repo => item.id === 'all' || repo.category === item.id).length;
    const button = element('button', '', item.label);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(category === item.id));
    button.append(element('span', 'category-count', String(count)));
    button.addEventListener('click', () => { category = item.id; renderCategories(); renderRepositories(); });
    return button;
  }));
}

function repositoryCard(repo) {
  const card = element('article', 'repo-card');
  const top = element('div', 'card-top');
  top.append(element('span', 'card-category', categories().find(item => item.id === repo.category)?.label));
  const badges = element('div', 'card-badges');
  if (repo.featured) badges.append(element('span', 'badge', '추천'));
  if (!isOwned(repo)) badges.append(element('span', 'badge', '참여'));
  if (repo.fork) badges.append(element('span', 'badge neutral', 'Fork'));
  if (repo.archived) badges.append(element('span', 'badge neutral', 'Archived'));
  top.append(badges);
  const title = element('h3');
  const link = element('a', '', `${repo.name} ↗`);
  link.href = repositoryUrl(repo);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  title.append(link);
  card.append(top, title);
  if (!isOwned(repo)) card.append(element('p', 'repo-owner', repo.full_name));
  card.append(element('p', 'repo-description', repo.description));
  if (repo.role) card.append(element('p', 'repo-description', `참여 역할 · ${repo.role}`));
  const tags = element('div', 'tags');
  for (const tag of repo.tags) tags.append(element('span', 'tag', tag));
  card.append(tags);
  const bottom = element('div', 'card-bottom');
  const metrics = element('div', 'repo-metrics');
  const language = element('span', 'language');
  language.textContent = repo.language ?? '문서 / 기타';
  metrics.append(language, element('span', '', `☆ ${repo.stargazers_count ?? 0}`));
  const date = element('span', '', formatter.format(new Date(repo.updated_at)));
  date.title = 'GitHub 저장소 업데이트 날짜';
  bottom.append(metrics, date);
  card.append(bottom);
  return card;
}

function renderRepositories() {
  const query = $('#search').value.trim().toLocaleLowerCase();
  const filtered = repositories.filter(repo =>
    (category === 'all' || repo.category === category) &&
    (scope === 'all' || (scope === 'owned' ? isOwned(repo) : !isOwned(repo))) &&
    ($('#show-forks').checked || !repo.fork) &&
    [repo.name, repo.full_name, repo.description, repo.language, ...repo.tags].join(' ').toLocaleLowerCase().includes(query)
  );
  const order = $('#sort').value;
  filtered.sort((a, b) => {
    if (order === 'featured' && a.featured !== b.featured) return Number(b.featured) - Number(a.featured);
    if (order === 'name') return a.full_name.localeCompare(b.full_name);
    if (order === 'stars' && a.stargazers_count !== b.stargazers_count) return b.stargazers_count - a.stargazers_count;
    return new Date(b.updated_at) - new Date(a.updated_at) || a.full_name.localeCompare(b.full_name);
  });
  $('#collection-title').textContent = category === 'all' ? '모든 프로젝트' : categories().find(item => item.id === category).label;
  $('#result-count').textContent = `${filtered.length}개`;
  $('#repository-list').replaceChildren(...filtered.map(repositoryCard));
  $('#empty').hidden = filtered.length !== 0;
  $('#summary').textContent = `공개 저장소 ${repositories.length}개 · 개인 ${repositories.filter(isOwned).length} · 참여 ${repositories.filter(repo => !isOwned(repo)).length}`;
}

function applyData(data) {
  repositories = curateRepositories(data, config);
  renderCategories();
  renderRepositories();
}

async function refresh() {
  $('#refresh').disabled = true;
  $('#repository-list').setAttribute('aria-busy', 'true');
  $('#status').textContent = 'GitHub에서 최신 프로젝트를 불러오는 중입니다…';
  try {
    const [owned, external] = await Promise.all([
      fetchPublicRepositories(config.username),
      fetchExternalRepositories(config.externalRepositories ?? []),
    ]);
    const data = [...new Map([...owned, ...external.repositories].map(repo => [repo.full_name, repo])).values()];
    applyData(data);
    const fetchedAt = new Date().toISOString();
    // A partial external response must not replace a previously complete cache.
    if (!external.errors.length && !discoveryWarning) {
      try { localStorage.setItem(cacheKey(), JSON.stringify({ data, fetchedAt })); } catch { /* Storage may be disabled. */ }
    }
    $('#sync-label').textContent = `조회 ${new Date(fetchedAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`;
    $('#status').textContent = [discoveryWarning, ...external.errors].filter(Boolean).join(' ');
  } catch (error) {
    $('#status').textContent = `${error.message} ${repositories.length ? '마지막으로 불러온 목록을 표시합니다.' : '새로고침으로 다시 시도해 주세요.'}`;
    $('#sync-label').textContent = repositories.length ? '이전 조회 결과' : '연결 실패';
  } finally {
    $('#refresh').disabled = false;
    $('#repository-list').setAttribute('aria-busy', 'false');
  }
}

async function initialize() {
  try {
    const response = await fetch(new URL('../content/catalog.json', import.meta.url), { cache: 'no-cache' });
    if (!response.ok) throw new Error('사이트 설정을 불러오지 못했습니다.');
    config = await response.json();
    if (!config.username || !Array.isArray(config.categories)) throw new Error('사이트 설정의 username과 categories를 확인해 주세요.');
    try {
      const discovery = await fetch(new URL('../content/contributions.json', import.meta.url), { cache: 'no-cache' });
      if (!discovery.ok) throw new Error('참여 목록 조회 실패');
      config.externalRepositories = resolveExternalRepositories(config, await discovery.json());
    } catch {
      discoveryWarning = '자동 참여 목록을 불러오지 못해 수동 등록 목록을 표시합니다.';
      config.externalRepositories = resolveExternalRepositories(config);
    }
    document.title = `${config.username} — Repository archive`;
    $('#site-title').textContent = config.title;
    $('#site-description').textContent = config.description;
    $('#site-description').style.whiteSpace = 'pre-line';
    $('#profile-link').href = `https://github.com/${encodeURIComponent(config.username)}`;
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey()));
      if (cached && Array.isArray(cached.data)) applyData(cached.data);
    } catch { /* Ignore missing or invalid browser cache. */ }
    renderCategories();
    $('#search').addEventListener('input', renderRepositories);
    $('#sort').addEventListener('change', renderRepositories);
    $('#show-forks').addEventListener('change', renderRepositories);
    for (const button of document.querySelectorAll('[data-scope]')) button.addEventListener('click', () => {
      scope = button.dataset.scope;
      for (const item of document.querySelectorAll('[data-scope]')) item.setAttribute('aria-pressed', String(item === button));
      renderRepositories();
    });
    $('#refresh').addEventListener('click', refresh);
    await refresh();
  } catch (error) {
    $('#status').textContent = error.message;
    $('#sync-label').textContent = '설정 오류';
    $('#repository-list').setAttribute('aria-busy', 'false');
  }
}
initialize();
