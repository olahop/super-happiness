// Thrift Window — customer showroom POC
// Client-only prototype: mock data (data.js) + localStorage for favorites/saved searches.

const ICON = {
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="currentColor" stroke="none"/><circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/><circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.1 4.5 5.6 4c2-.3 3.9.6 5 2.3C11.7 4.6 13.6 3.7 15.6 4c3.5.5 5.2 4.1 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>`,
  back: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  pinSm: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.6 2 4 5.6 4 10c0 5.5 7 11.5 7.3 11.7a1 1 0 001.4 0C13 21.5 20 15.5 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>`,
  navMap: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>`,
  navSearch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  navHeart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.1 4.5 5.6 4c2-.3 3.9.6 5 2.3C11.7 4.6 13.6 3.7 15.6 4c3.5.5 5.2 4.1 3.6 7.7C19.5 16.4 12 21 12 21z"/></svg>`,
  navBell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="11"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
};

// ---------- Persistence ----------
const Store = {
  favorites: JSON.parse(localStorage.getItem("tw_favorites") || "[]"),
  searches: JSON.parse(localStorage.getItem("tw_searches") || "[]"),
  save() {
    localStorage.setItem("tw_favorites", JSON.stringify(this.favorites));
    localStorage.setItem("tw_searches", JSON.stringify(this.searches));
  },
  isFav(id) { return this.favorites.includes(id); },
  toggleFav(id) {
    const i = this.favorites.indexOf(id);
    if (i === -1) { this.favorites.push(id); } else { this.favorites.splice(i, 1); }
    this.save();
    return this.isFav(id);
  },
};

// ---------- Filter state ----------
const emptyFilters = () => ({ q: "", category: null, gender: null, condition: null, colors: [], maxPrice: 5000, sort: "newest" });
let filters = emptyFilters();
let draftFilters = emptyFilters();

function filtersActive(f) {
  return !!(f.category || f.gender || f.condition || f.colors.length || f.maxPrice < 5000);
}

function matches(g, f) {
  if (f.q && !(`${g.brand} ${g.title}`.toLowerCase().includes(f.q.toLowerCase()))) return false;
  if (f.category && g.category !== f.category) return false;
  if (f.gender && g.gender !== f.gender && g.gender !== "any") return false;
  if (f.condition && g.condition !== f.condition) return false;
  if (f.colors.length && !g.colors.some((c) => f.colors.includes(c))) return false;
  if (g.priceKr > f.maxPrice) return false;
  return true;
}

function applySort(list, sort) {
  const arr = [...list];
  if (sort === "newest") arr.sort((a, b) => b.addedAt - a.addedAt);
  else if (sort === "price_asc") arr.sort((a, b) => a.priceKr - b.priceKr);
  else if (sort === "price_desc") arr.sort((a, b) => b.priceKr - a.priceKr);
  return arr;
}

function filterSummary(f) {
  const parts = [];
  if (f.category) parts.push(categoryLabel(f.category));
  if (f.gender) parts.push(genderLabel(f.gender));
  if (f.condition) parts.push(conditionLabel(f.condition));
  if (f.colors.length) parts.push(f.colors.map(colorLabel).join(", "));
  if (f.maxPrice < 5000) parts.push(`Under ${f.maxPrice} kr`);
  if (f.q) parts.push(`"${f.q}"`);
  return parts.length ? parts.join(" · ") : "Alle varer";
}

// ---------- Router ----------
function go(hash) { location.hash = hash; }
function currentRoute() {
  const h = location.hash.replace("#", "") || "map";
  const [name, param] = h.split("/");
  return { name, param };
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", () => {
  initMap();
  render();
});

function render() {
  const { name, param } = currentRoute();
  document.querySelectorAll(".tab-btn").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  document.getElementById("item-overlay").classList.remove("open");
  document.getElementById("shop-overlay").classList.remove("open");

  const tabs = ["map", "browse", "favorites", "alerts"];
  if (tabs.includes(name)) {
    document.getElementById("view-" + name).classList.add("active");
    document.getElementById("tabbar").style.display = "flex";
    if (name === "browse") renderBrowse();
    if (name === "favorites") renderFavorites();
    if (name === "alerts") renderAlerts();
    if (name === "map") setTimeout(() => window.__leafletMap && window.__leafletMap.invalidateSize(), 50);
  } else if (name === "item") {
    openItemOverlay(param);
  } else if (name === "shop") {
    openShopOverlay(param);
  }
  window.scrollTo(0, 0);
}

// ---------- Browse view ----------
function renderBrowse() {
  const list = applySort(GARMENTS.filter((g) => matches(g, filters)), filters.sort);
  const grid = document.getElementById("garment-grid");
  const empty = document.getElementById("browse-empty");
  document.getElementById("result-count").textContent = `${list.length} ${list.length === 1 ? "vare" : "varer"}`;
  document.getElementById("browse-search-input").value = filters.q;
  document.getElementById("filter-btn").classList.toggle("has-filters", filtersActive(filters));
  renderChips();

  if (!list.length) {
    grid.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  grid.innerHTML = list.map(garmentCardHTML).join("");
}

function garmentCardHTML(g) {
  const shop = shopById(g.shopId);
  const fav = Store.isFav(g.id);
  return `
  <div class="garment-card" onclick="go('item/${g.id}')">
    <div class="garment-photo" style="background:${photoBg(g)}">
      <span>${g.icon}</span>
      ${photoImg(g)}
      ${g.isNew ? '<span class="new-badge">NYTT</span>' : ""}
      <button class="fav-btn ${fav ? "active" : ""}" onclick="event.stopPropagation(); onToggleFav('${g.id}', this)">${ICON.heart}</button>
    </div>
    <div class="garment-info">
      <div class="garment-brand">${g.brand}</div>
      <div class="garment-title">${g.title}</div>
      <div class="garment-price-row">
        <span class="garment-price">${g.priceKr} kr</span>
        <span class="garment-size">${g.size}</span>
      </div>
      <div class="garment-shop">${ICON.pinSm} ${shop.name}</div>
    </div>
  </div>`;
}

function renderChips() {
  const row = document.getElementById("chip-row");
  const all = `<div class="chip ${!filters.category ? "active" : ""}" onclick="quickCategory(null)">Alle</div>`;
  const cats = CATEGORIES.map((c) => `<div class="chip ${filters.category === c.id ? "active" : ""}" onclick="quickCategory('${c.id}')">${c.label}</div>`).join("");
  row.innerHTML = all + cats;
}
function quickCategory(id) {
  filters.category = filters.category === id ? null : id;
  renderBrowse();
}
function clearAllFilters() {
  filters = emptyFilters();
  renderBrowse();
}

function photoBg(g) {
  const hex = colorSwatch(g.colors[0]);
  if (hex.startsWith("conic")) return `${hex}`;
  return `linear-gradient(160deg, ${hex}22, ${hex}44)`;
}
// Renders a photo that quietly disappears (falling back to the emoji/color
// placeholder underneath) if no file has been dropped at images/<id>.jpg.
function photoImg(g) {
  return `<img class="photo-img" src="${g.image}" alt="" onerror="this.remove()">`;
}

function onToggleFav(id, btn) {
  const active = Store.toggleFav(id);
  btn.classList.toggle("active", active);
  showToast(active ? "Lagt til i favoritter" : "Fjernet fra favoritter");
  if (currentRoute().name === "favorites") renderFavorites();
}

document.addEventListener("input", (e) => {
  if (e.target.id === "browse-search-input") {
    filters.q = e.target.value;
    renderBrowse();
  }
});

// ---------- Filter drawer ----------
function openDrawer() {
  draftFilters = JSON.parse(JSON.stringify(filters));
  renderDrawer();
  document.getElementById("drawer-backdrop").classList.add("open");
  document.getElementById("filter-drawer").classList.add("open");
}
function closeDrawer() {
  document.getElementById("drawer-backdrop").classList.remove("open");
  document.getElementById("filter-drawer").classList.remove("open");
}
function renderDrawer() {
  const body = document.getElementById("drawer-body");
  body.innerHTML = `
    <div class="filter-group">
      <h3>Kategori</h3>
      <div class="filter-options">
        ${CATEGORIES.map((c) => pillHTML(c.label, draftFilters.category === c.id, `setDraft('category','${c.id}')`)).join("")}
      </div>
    </div>
    <div class="filter-group">
      <h3>Kjønn</h3>
      <div class="filter-options">
        ${GENDERS.map((g) => pillHTML(g.label, draftFilters.gender === g.id, `setDraft('gender','${g.id}')`)).join("")}
      </div>
    </div>
    <div class="filter-group">
      <h3>Tilstand</h3>
      <div class="filter-options">
        ${CONDITIONS.map((c) => pillHTML(c.label, draftFilters.condition === c.id, `setDraft('condition','${c.id}')`)).join("")}
      </div>
    </div>
    <div class="filter-group">
      <h3>Farge</h3>
      <div class="filter-options">
        ${COLORS.map((c) => `
          <div class="opt-pill color-pill ${draftFilters.colors.includes(c.id) ? "active" : ""}" onclick="toggleDraftColor('${c.id}')">
            <span class="swatch" style="background:${c.hex}"></span>${c.label}
          </div>`).join("")}
      </div>
    </div>
    <div class="filter-group">
      <h3>Maks pris</h3>
      <div class="price-range">
        <input type="range" min="200" max="5000" step="100" value="${draftFilters.maxPrice}" oninput="setDraftPrice(this.value)">
        <span class="price-range-val" id="price-val">${draftFilters.maxPrice === 5000 ? "Alle" : draftFilters.maxPrice + " kr"}</span>
      </div>
    </div>
    <div class="filter-group">
      <h3>Sortering</h3>
      <div class="filter-options">
        ${pillHTML("Nyeste først", draftFilters.sort === "newest", "setDraft('sort','newest')")}
        ${pillHTML("Pris: lav–høy", draftFilters.sort === "price_asc", "setDraft('sort','price_asc')")}
        ${pillHTML("Pris: høy–lav", draftFilters.sort === "price_desc", "setDraft('sort','price_desc')")}
      </div>
    </div>
    <div class="filter-group">
      <h3>Lagre søket</h3>
      <div class="save-search-box">
        <label>Navn på søk</label>
        <input type="text" id="search-name" placeholder="F.eks. «Vintage skinnjakker, dame»">
        <div class="notify-row">
          <div>
            <div class="label-text">Varsle meg om nye treff</div>
            <div class="label-sub">Vi sender deg beskjed når en vare matcher</div>
          </div>
          <button class="toggle" id="notify-toggle" onclick="this.classList.toggle('on')"></button>
        </div>
        <button class="btn btn-secondary btn-block btn-sm" style="margin-top:12px" onclick="saveSearchFromDraft()">Lagre søk</button>
      </div>
    </div>
  `;
}
function pillHTML(label, active, onclick) {
  return `<div class="opt-pill ${active ? "active" : ""}" onclick="${onclick}">${label}</div>`;
}
function setDraft(key, value) {
  draftFilters[key] = draftFilters[key] === value ? null : value;
  renderDrawer();
}
function toggleDraftColor(id) {
  const i = draftFilters.colors.indexOf(id);
  if (i === -1) draftFilters.colors.push(id); else draftFilters.colors.splice(i, 1);
  renderDrawer();
}
function setDraftPrice(v) {
  draftFilters.maxPrice = Number(v);
  document.getElementById("price-val").textContent = Number(v) === 5000 ? "Alle" : v + " kr";
}
function resetDrawer() {
  draftFilters = emptyFilters();
  draftFilters.q = filters.q;
  renderDrawer();
}
function applyDrawer() {
  filters = JSON.parse(JSON.stringify(draftFilters));
  closeDrawer();
  if (currentRoute().name !== "browse") go("browse"); else renderBrowse();
}
function saveSearchFromDraft() {
  const nameInput = document.getElementById("search-name");
  const name = nameInput.value.trim() || filterSummary(draftFilters);
  const notify = document.getElementById("notify-toggle").classList.contains("on");
  Store.searches.unshift({
    id: "s" + Date.now(),
    name,
    filters: { ...draftFilters },
    notify,
    createdAt: Date.now(),
    newCount: notify ? Math.floor(Math.random() * 4) : 0,
  });
  Store.save();
  showToast("Søk lagret" + (notify ? " — du får varsel om nye treff" : ""));
  applyDrawer();
  go("alerts");
}

// ---------- Favorites ----------
function renderFavorites() {
  const list = GARMENTS.filter((g) => Store.isFav(g.id));
  const wrap = document.getElementById("favorites-list");
  const empty = document.getElementById("favorites-empty");
  document.getElementById("favorites-count").textContent = list.length;
  if (!list.length) {
    wrap.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  wrap.innerHTML = list.map((g) => {
    const shop = shopById(g.shopId);
    return `
    <div class="fav-item" onclick="go('item/${g.id}')">
      <div class="fav-thumb" style="background:${photoBg(g)}">${g.icon}${photoImg(g)}</div>
      <div class="fav-info">
        <div class="garment-brand">${g.brand}</div>
        <div class="garment-title" style="margin-bottom:2px">${g.title}</div>
        <div class="garment-shop">${ICON.pinSm} ${shop.name} · ${g.priceKr} kr</div>
      </div>
      <button class="fav-remove" onclick="event.stopPropagation(); onToggleFav('${g.id}', this); renderFavorites()">${ICON.trash}</button>
    </div>`;
  }).join("");
}

// ---------- Alerts / saved searches ----------
function renderAlerts() {
  const wrap = document.getElementById("alerts-list");
  const empty = document.getElementById("alerts-empty");
  if (!Store.searches.length) {
    wrap.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  wrap.innerHTML = Store.searches.map((s) => {
    const liveCount = GARMENTS.filter((g) => matches(g, s.filters)).length;
    return `
    <div class="alert-card">
      <div class="alert-top">
        <div>
          <div class="alert-name">${s.name}</div>
          <div class="alert-filters">${filterSummary(s.filters)}</div>
        </div>
        <button class="toggle ${s.notify ? "on" : ""}" onclick="toggleSearchNotify('${s.id}', this)"></button>
      </div>
      <div class="alert-meta">
        <span class="alert-new ${s.newCount ? "" : "zero"}">${s.newCount ? `🔔 ${s.newCount} nye treff` : `${liveCount} treff totalt`}</span>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-secondary btn-sm" onclick="runSavedSearch('${s.id}')">Se treff</button>
          <button class="fav-remove" onclick="deleteSearch('${s.id}')">${ICON.trash}</button>
        </div>
      </div>
    </div>`;
  }).join("");
}
function toggleSearchNotify(id, btn) {
  const s = Store.searches.find((s) => s.id === id);
  s.notify = !s.notify;
  btn.classList.toggle("on", s.notify);
  Store.save();
}
function deleteSearch(id) {
  Store.searches = Store.searches.filter((s) => s.id !== id);
  Store.save();
  renderAlerts();
}
function runSavedSearch(id) {
  const s = Store.searches.find((s) => s.id === id);
  filters = { ...emptyFilters(), ...s.filters };
  const s2 = Store.searches.find((x) => x.id === id);
  s2.newCount = 0;
  Store.save();
  go("browse");
}

// ---------- Item detail overlay ----------
function openItemOverlay(id) {
  const g = garmentById(id);
  if (!g) { go("browse"); return; }
  const shop = shopById(g.shopId);
  const overlay = document.getElementById("item-overlay");
  const fav = Store.isFav(g.id);
  overlay.innerHTML = `
    <div class="detail-photo" style="background:${photoBg(g)}">
      <div class="detail-topbar">
        <button class="icon-btn back" onclick="history.back()">${ICON.back}</button>
        <button class="icon-btn ${fav ? "active" : ""}" style="color:${fav ? "var(--accent)" : "var(--text)"}" onclick="toggleFavAndRefreshDetail('${g.id}')">${ICON.heart}</button>
      </div>
      <span>${g.icon}</span>
      ${photoImg(g)}
    </div>
    <div class="detail-body">
      <div class="detail-brand">${g.brand}</div>
      <div class="detail-title">${g.title}</div>
      <div class="detail-price">${g.priceKr} kr</div>
      <div class="tag-row">
        <div class="tag">Str. ${g.size}</div>
        <div class="tag">${conditionLabel(g.condition)}</div>
        <div class="tag">${genderLabel(g.gender)}</div>
        ${g.colors.map((c) => `<div class="tag"><span class="swatch" style="background:${colorSwatch(c)}"></span>${colorLabel(c)}</div>`).join("")}
      </div>

      ${g.isNew ? `<div class="note-box" style="margin-bottom:18px">${ICON.info} Nylig lagt ut — kom innom før den blir tatt!</div>` : ""}

      <div class="detail-section">
        <h3>I butikk</h3>
        <div class="shop-card" onclick="go('shop/${shop.id}')">
          <div class="shop-avatar" style="background:${shop.heroColor}">${shop.name.slice(0,1)}</div>
          <div class="shop-card-info">
            <div class="shop-card-name">${shop.name}</div>
            <div class="shop-card-addr">${shop.address}</div>
            <div class="shop-card-hours">Åpent nå · ${shop.hours}</div>
          </div>
          <span class="chevron">${ICON.chevron}</span>
        </div>
      </div>

      <div class="detail-section">
        <h3>Vær obs på</h3>
        <p style="font-size:13px; color:var(--muted); line-height:1.5; margin:0">
          Denne varen finnes kun i fysisk butikk hos ${shop.name} — den kan ikke kjøpes eller reserveres i appen.
          Ta turen innom for å prøve den, eller lagre den som favoritt så den er lett å finne igjen.
        </p>
      </div>
    </div>
    <div class="detail-cta" style="padding-left:18px; padding-right:18px;">
      <button class="btn btn-secondary" onclick="go('shop/${shop.id}')">${ICON.pin} Vis i kart</button>
      <button class="btn btn-primary" onclick="toggleFavAndRefreshDetail('${g.id}')">${fav ? "Lagt til ♥" : "Lagre favoritt"}</button>
    </div>
  `;
  overlay.classList.add("open");
  overlay.scrollTop = 0;
}
function toggleFavAndRefreshDetail(id) {
  const active = Store.toggleFav(id);
  showToast(active ? "Lagt til i favoritter" : "Fjernet fra favoritter");
  openItemOverlay(id);
}

// ---------- Shop detail overlay ----------
function openShopOverlay(id) {
  const shop = shopById(id);
  if (!shop) { go("map"); return; }
  const items = GARMENTS.filter((g) => g.shopId === shop.id);
  const overlay = document.getElementById("shop-overlay");
  overlay.innerHTML = `
    <div class="detail-photo" style="background:linear-gradient(160deg, ${shop.heroColor}33, ${shop.heroColor}66); font-size:56px;">
      <div class="detail-topbar">
        <button class="icon-btn back" onclick="history.back()">${ICON.back}</button>
      </div>
      <span>🏬</span>
    </div>
    <div class="detail-body">
      <div class="detail-title" style="margin-bottom:4px">${shop.name}</div>
      <div class="detail-brand" style="text-transform:none; font-weight:600; font-size:13px; color:var(--muted)">${shop.address}</div>
      <div class="tag-row" style="margin-top:12px">
        <div class="tag">${ICON.pin} ${shop.hours}</div>
        <div class="tag">${items.length} varer i nettverket</div>
      </div>
      <div class="detail-section">
        <h3>Om butikken</h3>
        <p style="font-size:13.5px; line-height:1.55; margin:0; color:var(--text)">${shop.description}</p>
      </div>
      <div class="detail-section">
        <h3>Kontakt</h3>
        <p style="font-size:13.5px; line-height:1.6; margin:0; color:var(--muted)">${shop.phone}<br>${shop.address}</p>
      </div>
      <div class="section-divider"><span>Varer i butikken</span></div>
      <div class="garment-grid">
        ${items.map(garmentCardHTML).join("") || `<p style="grid-column:1/-1; color:var(--muted); font-size:13px;">Ingen varer registrert akkurat nå.</p>`}
      </div>
    </div>
  `;
  overlay.classList.add("open");
  overlay.scrollTop = 0;
}

// ---------- Map ----------
function initMap() {
  document.getElementById("shop-count-text").textContent = SHOPS.length + " butikker";
  const map = L.map("leaflet-map", { zoomControl: false, attributionControl: false }).setView([59.919, 10.745], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  window.__leafletMap = map;
  window.__markers = {};

  SHOPS.forEach((shop) => {
    const count = GARMENTS.filter((g) => g.shopId === shop.id).length;
    const icon = L.divIcon({
      className: "",
      html: `<div class="pin-marker" id="pin-${shop.id}"><span>🏬</span></div>`,
      iconSize: [34, 34],
      iconAnchor: [17, 30],
    });
    const marker = L.marker([shop.lat, shop.lng], { icon }).addTo(map);
    marker.on("click", () => selectShopOnMap(shop.id));
    window.__markers[shop.id] = marker;
  });

  renderShopStrip();
}

let selectedShopId = null;
function selectShopOnMap(id) {
  if (selectedShopId) {
    const prevEl = document.getElementById("pin-" + selectedShopId);
    if (prevEl) prevEl.classList.remove("selected");
  }
  selectedShopId = id;
  const el = document.getElementById("pin-" + id);
  if (el) el.classList.add("selected");
  const shop = shopById(id);
  window.__leafletMap.panTo([shop.lat, shop.lng]);
  showShopSheet(shop);
}
function showShopSheet(shop) {
  const count = GARMENTS.filter((g) => g.shopId === shop.id).length;
  const sheet = document.getElementById("shop-sheet");
  sheet.innerHTML = `
    <div class="shop-sheet-top">
      <div class="shop-avatar" style="background:${shop.heroColor}">${shop.name.slice(0,1)}</div>
      <div style="flex:1; min-width:0;">
        <div class="shop-sheet-name">${shop.name}</div>
        <div class="shop-sheet-meta">${shop.address}</div>
        <div class="shop-sheet-count">${count} varer akkurat nå</div>
      </div>
      <button class="icon-btn" onclick="closeShopSheet()">${ICON.close}</button>
    </div>
    <button class="btn btn-primary btn-block" onclick="go('shop/${shop.id}')">Se butikk og varer</button>
  `;
  sheet.classList.add("open");
}
function closeShopSheet() {
  document.getElementById("shop-sheet").classList.remove("open");
  if (selectedShopId) {
    const el = document.getElementById("pin-" + selectedShopId);
    if (el) el.classList.remove("selected");
  }
  selectedShopId = null;
}
function renderShopStrip() {
  const wrap = document.getElementById("shop-strip-list");
  wrap.innerHTML = SHOPS.map((shop) => {
    const count = GARMENTS.filter((g) => g.shopId === shop.id).length;
    return `
    <div class="shop-row" onclick="selectShopOnMap('${shop.id}')">
      <div class="shop-avatar" style="background:${shop.heroColor}">${shop.name.slice(0,1)}</div>
      <div class="shop-row-info">
        <div class="shop-row-name">${shop.name}</div>
        <div class="shop-row-addr">${shop.address} · ${count} varer</div>
      </div>
      <span class="chevron">${ICON.chevron}</span>
    </div>`;
  }).join("");
}

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
}
