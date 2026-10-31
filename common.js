// 저장소: Firebase 주소가 있으면 Firebase, 없으면 이 브라우저 안의 체험 모드
const Store = (() => {
  const listeners = [];
  let state = {}, loaded = false;
  const emit = () => listeners.forEach(f => f(state));
  const clone = v => (v == null ? null : JSON.parse(JSON.stringify(v)));

  if (CONFIG.firebaseDatabaseURL) {
    firebase.initializeApp({ databaseURL: CONFIG.firebaseDatabaseURL });
    const root = firebase.database().ref('rooms/' + CONFIG.roomKey);
    root.on('value', s => { state = s.val() || {}; loaded = true; emit(); });
    return {
      demo: false,
      subscribe(f) { listeners.push(f); if (loaded) f(state); },
      set: (path, v) => root.child(path).set(v),
      // fn 이 undefined 를 돌려주면 취소. 여러 명이 동시에 눌러도 한 명씩 처리된다.
      transaction: (path, fn) => root.child(path).transaction(fn).then(r => r.committed),
      resetAll: () => root.remove(),
    };
  }

  const LS = 'vibe-demo-' + CONFIG.roomKey;
  const load = () => { try { state = JSON.parse(localStorage.getItem(LS) || '{}'); } catch (e) { state = {}; } };
  const save = () => { try { localStorage.setItem(LS, JSON.stringify(state)); } catch (e) {} emit(); };
  const get = path => path.split('/').reduce((o, k) => (o == null ? undefined : o[k]), state);
  const put = (path, v) => {
    const ks = path.split('/');
    let o = state;
    for (const k of ks.slice(0, -1)) { if (!o[k] || typeof o[k] !== 'object') o[k] = {}; o = o[k]; }
    if (v == null) delete o[ks[ks.length - 1]]; else o[ks[ks.length - 1]] = clone(v);
  };
  load();
  // 같은 컴퓨터의 다른 탭과 동기화
  window.addEventListener('storage', e => { if (e.key === LS) { load(); emit(); } });
  return {
    demo: true,
    subscribe(f) { listeners.push(f); setTimeout(() => f(state)); },
    set(path, v) { load(); put(path, v); save(); return Promise.resolve(); },
    transaction(path, fn) {
      load();
      const r = fn(clone(get(path)));
      if (r === undefined) return Promise.resolve(false);
      put(path, r); save();
      return Promise.resolve(true);
    },
    resetAll() { state = {}; save(); return Promise.resolve(); },
  };
})();

/* ---------- 공용 도우미 ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = u => (/^https?:\/\/\S+$/i.test(String(u || '').trim()) ? String(u).trim() : '');
const fmtTime = t => { if (!t) return ''; const d = new Date(t); return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); };
const newId = () => 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const actById = id => ACTS.find(a => a.id === id);
const groupById = id => GROUPS.find(g => g.id === id);
const isOpen = (state, id) => !!(state.open && state.open[id]);

function membersOf(state, gid) {
  const m = (state.groups && state.groups[gid]) || {};
  return Object.entries(m).map(([uid, v]) => ({ uid, ...v })).sort((a, b) => (a.t || 0) - (b.t || 0));
}
function groupIdOf(state, uid) {
  for (const g of GROUPS) if (state.groups && state.groups[g.id] && state.groups[g.id][uid]) return g.id;
  return null;
}
function groupBadge(gid) {
  const g = groupById(gid);
  return g ? `<span class="gbadge" style="--gc:${g.c};--gbg:${g.bg}">${esc(g.name)}</span>` : '';
}
function subsOf(state, actId) {
  const s = (state.subs && state.subs[actId]) || {};
  return Object.entries(s).map(([uid, v]) => ({ uid, ...v }));
}
function fillHeader() {
  document.title = `${CONFIG.title} · ${CONFIG.school}`;
  $('brandSchool').textContent = CONFIG.school;
  $('brandTitle').textContent = CONFIG.title;
  $('brandSub').textContent = CONFIG.subtitle;
  if (Store.demo) $('demoNote').hidden = false;
}
