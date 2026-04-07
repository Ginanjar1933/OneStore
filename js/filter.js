/* =====================================================
   ONE STORE — Filter & Sort Logic (Shop Page)
   ===================================================== */

'use strict';

/* ─── State ───────────────────────────────────────── */
let shopState = {
  category:  'all',
  minPrice:  0,
  maxPrice:  2000000,
  sizes:     [],
  colors:    [],
  minRating: 0,
  sortBy:    'popular',
  searchQuery: '',
  page:      1,
  perPage:   12,
  viewMode:  'grid',  // 'grid' | 'list'
};

let filteredProducts = [];

/* ─── DOM refs ────────────────────────────────────── */
const shopGrid      = document.getElementById('shop-products-grid');
const resultCount   = document.getElementById('result-count');
const sortSelect    = document.getElementById('sort-select');
const activeFilters = document.getElementById('active-filters');

/* ─── Init ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Parse URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('cat'))    shopState.category   = params.get('cat');
  if (params.get('search')) shopState.searchQuery= params.get('search');
  if (params.get('sort'))   shopState.sortBy     = params.get('sort');

  // Sync UI with state
  syncUIWithState();

  // Initial render
  applyFilters();

  // Bind events
  bindFilterEvents();
  bindSortEvent();
  bindViewToggle();
  bindMobileFilter();
  bindCategoryLinks();
});

/* ─── Sync UI with initial state ─────────────────── */
function syncUIWithState() {
  // Category checkboxes
  document.querySelectorAll('.cat-checkbox').forEach(cb => {
    cb.checked = shopState.category === 'all'
      ? false
      : cb.value === shopState.category;
    if (cb.value === shopState.category) {
      cb.closest('.filter-category-label')?.classList.add('checked');
    }
  });

  // Sort select
  if (sortSelect) sortSelect.value = shopState.sortBy;

  // Search input
  const searchHeading = document.getElementById('search-query-heading');
  if (searchHeading && shopState.searchQuery) {
    searchHeading.textContent = `Hasil pencarian: "${shopState.searchQuery}"`;
  }

  // Price inputs
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');
  if (minInput) minInput.value = shopState.minPrice;
  if (maxInput) maxInput.value = shopState.maxPrice;
}

/* ─── Apply Filters & Re-render ──────────────────── */
function applyFilters() {
  filteredProducts = filterProducts({
    category:    shopState.category,
    minPrice:    shopState.minPrice,
    maxPrice:    shopState.maxPrice,
    sizes:       shopState.sizes,
    colors:      shopState.colors,
    minRating:   shopState.minRating,
    sortBy:      shopState.sortBy,
    searchQuery: shopState.searchQuery,
  });

  renderResultCount();
  renderActiveFilterChips();
  renderPage(shopState.page);
  renderPagination();
}

/* ─── Render Products ─────────────────────────────── */
function renderPage(page) {
  if (!shopGrid) return;

  const start = (page - 1) * shopState.perPage;
  const end   = start + shopState.perPage;
  const items = filteredProducts.slice(start, end);

  if (items.length === 0) {
    shopGrid.innerHTML = `
      <div class="no-products">
        <div class="no-products-icon">🔍</div>
        <h3>Produk tidak ditemukan</h3>
        <p>Coba ubah filter atau kata kunci pencarianmu.</p>
        <button class="btn btn-primary" onclick="resetAllFilters()">Reset Filter</button>
      </div>
    `;
    return;
  }

  shopGrid.innerHTML = items.map(p => generateProductCard(p)).join('');

  // Trigger fade-in
  requestAnimationFrame(() => {
    shopGrid.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 60);
    });
  });
}

/* ─── Result Count ────────────────────────────────── */
function renderResultCount() {
  if (!resultCount) return;
  const total = filteredProducts.length;
  const start = (shopState.page - 1) * shopState.perPage + 1;
  const end   = Math.min(shopState.page * shopState.perPage, total);
  resultCount.innerHTML = total === 0
    ? 'Tidak ada produk ditemukan'
    : `Menampilkan <strong>${start}–${end}</strong> dari <strong>${total}</strong> produk`;
}

/* ─── Active Filter Chips ─────────────────────────── */
function renderActiveFilterChips() {
  if (!activeFilters) return;
  const chips = [];

  if (shopState.category !== 'all') {
    const labels = { men:'Pria', women:'Wanita', kids:'Anak', shoes:'Sepatu', accessories:'Aksesori' };
    chips.push({ key: 'category', label: labels[shopState.category] || shopState.category });
  }
  if (shopState.minPrice > 0) {
    chips.push({ key: 'minPrice', label: `Min ${formatPrice(shopState.minPrice)}` });
  }
  if (shopState.maxPrice < 2000000) {
    chips.push({ key: 'maxPrice', label: `Max ${formatPrice(shopState.maxPrice)}` });
  }
  shopState.sizes.forEach(s => chips.push({ key: 'size-' + s, label: `Size: ${s}` }));
  if (shopState.minRating > 0) {
    chips.push({ key: 'rating', label: `${shopState.minRating}★ ke atas` });
  }
  if (shopState.searchQuery) {
    chips.push({ key: 'search', label: `"${shopState.searchQuery}"` });
  }

  activeFilters.innerHTML = chips.map(c => `
    <span class="filter-chip" onclick="removeFilterChip('${c.key}')">
      ${c.label} <span class="filter-chip-x">×</span>
    </span>
  `).join('');

  if (chips.length > 1) {
    activeFilters.innerHTML += `<button class="clear-all-btn" onclick="resetAllFilters()">Hapus Semua</button>`;
  }
}

/* ─── Remove single filter chip ──────────────────── */
function removeFilterChip(key) {
  if (key === 'category') {
    shopState.category = 'all';
    document.querySelectorAll('.cat-checkbox').forEach(cb => cb.checked = false);
  } else if (key === 'minPrice') {
    shopState.minPrice = 0;
    const el = document.getElementById('price-min');
    if (el) el.value = 0;
  } else if (key === 'maxPrice') {
    shopState.maxPrice = 2000000;
    const el = document.getElementById('price-max');
    if (el) el.value = 2000000;
  } else if (key.startsWith('size-')) {
    const size = key.replace('size-', '');
    shopState.sizes = shopState.sizes.filter(s => s !== size);
    document.querySelectorAll('.size-chip').forEach(chip => {
      if (chip.dataset.size === size) chip.classList.remove('active');
    });
  } else if (key === 'rating') {
    shopState.minRating = 0;
    document.querySelectorAll('.rating-filter-item input').forEach(r => r.checked = false);
  } else if (key === 'search') {
    shopState.searchQuery = '';
  }
  shopState.page = 1;
  applyFilters();
}

/* ─── Reset all filters ───────────────────────────── */
function resetAllFilters() {
  shopState.category   = 'all';
  shopState.minPrice   = 0;
  shopState.maxPrice   = 2000000;
  shopState.sizes      = [];
  shopState.colors     = [];
  shopState.minRating  = 0;
  shopState.searchQuery= '';
  shopState.page       = 1;

  document.querySelectorAll('.cat-checkbox').forEach(cb => cb.checked = false);
  document.querySelectorAll('.size-chip').forEach(chip => chip.classList.remove('active'));
  document.querySelectorAll('.color-dot').forEach(dot => dot.classList.remove('active'));
  document.querySelectorAll('.rating-filter-item input').forEach(r => r.checked = false);
  const minEl = document.getElementById('price-min');
  const maxEl = document.getElementById('price-max');
  if (minEl) minEl.value = 0;
  if (maxEl) maxEl.value = 2000000;

  applyFilters();
}

/* ─── Pagination ──────────────────────────────────── */
function renderPagination() {
  const pagination = document.getElementById('pagination');
  if (!pagination) return;

  const totalPages = Math.ceil(filteredProducts.length / shopState.perPage);
  if (totalPages <= 1) {
    pagination.innerHTML = '';
    return;
  }

  const current = shopState.page;
  let html = '';

  // Prev
  html += `<button class="page-btn" ${current === 1 ? 'disabled' : ''} onclick="goToPage(${current - 1})" aria-label="Previous page">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>`;

  // Page numbers
  const range = getPaginationRange(current, totalPages);
  range.forEach(item => {
    if (item === '...') {
      html += `<span class="page-dots">…</span>`;
    } else {
      html += `<button class="page-btn ${item === current ? 'active' : ''}" onclick="goToPage(${item})">${item}</button>`;
    }
  });

  // Next
  html += `<button class="page-btn" ${current === totalPages ? 'disabled' : ''} onclick="goToPage(${current + 1})" aria-label="Next page">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  </button>`;

  pagination.innerHTML = html;
}

function getPaginationRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function goToPage(page) {
  shopState.page = page;
  applyFilters();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─── Bind Filter Events ──────────────────────────── */
function bindFilterEvents() {
  // Category checkboxes
  document.querySelectorAll('.cat-checkbox').forEach(cb => {
    cb.addEventListener('change', () => {
      const checked = [...document.querySelectorAll('.cat-checkbox:checked')].map(c => c.value);
      shopState.category = checked.length === 1 ? checked[0] : 'all';
      shopState.page = 1;
      applyFilters();
    });
  });

  // Price inputs
  const minInput = document.getElementById('price-min');
  const maxInput = document.getElementById('price-max');

  function handlePriceChange() {
    const min = parseInt(minInput?.value) || 0;
    const max = parseInt(maxInput?.value) || 2000000;
    shopState.minPrice = Math.max(0, min);
    shopState.maxPrice = Math.max(shopState.minPrice, max);
    shopState.page = 1;
    applyFilters();
  }

  minInput?.addEventListener('change', handlePriceChange);
  maxInput?.addEventListener('change', handlePriceChange);

  // Size chips
  document.querySelectorAll('.size-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const size = chip.dataset.size;
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        if (!shopState.sizes.includes(size)) shopState.sizes.push(size);
      } else {
        shopState.sizes = shopState.sizes.filter(s => s !== size);
      }
      shopState.page = 1;
      applyFilters();
    });
  });

  // Color dots
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      dot.classList.toggle('active');
      const color = dot.dataset.color;
      if (dot.classList.contains('active')) {
        if (!shopState.colors.includes(color)) shopState.colors.push(color);
      } else {
        shopState.colors = shopState.colors.filter(c => c !== color);
      }
      shopState.page = 1;
      applyFilters();
    });
  });

  // Rating filter
  document.querySelectorAll('.rating-filter-item input').forEach(input => {
    input.addEventListener('change', () => {
      shopState.minRating = parseFloat(input.value) || 0;
      shopState.page = 1;
      applyFilters();
    });
  });

  // Filter group collapse
  document.querySelectorAll('.filter-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.filter-group');
      group.classList.toggle('collapsed');
      const body = group.querySelector('.filter-group-body');
      if (body) {
        if (group.classList.contains('collapsed')) {
          body.style.maxHeight = null;
        } else {
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });
    // Set initial max-height
    const body = header.closest('.filter-group')?.querySelector('.filter-group-body');
    if (body) body.style.maxHeight = body.scrollHeight + 'px';
  });

  // Reset button
  document.getElementById('filter-reset-btn')?.addEventListener('click', resetAllFilters);
}

/* ─── Sort ────────────────────────────────────────── */
function bindSortEvent() {
  sortSelect?.addEventListener('change', () => {
    shopState.sortBy = sortSelect.value;
    shopState.page   = 1;
    applyFilters();
  });
}

/* ─── View Toggle ─────────────────────────────────── */
function bindViewToggle() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      shopState.viewMode = btn.dataset.view;
      if (shopGrid) {
        shopGrid.classList.toggle('list-view', shopState.viewMode === 'list');
      }
    });
  });
}

/* ─── Mobile Filter Sheet ─────────────────────────── */
function bindMobileFilter() {
  const openBtn  = document.getElementById('mobile-filter-open');
  const sheet    = document.getElementById('filter-sheet');
  const closeBtn = document.getElementById('filter-sheet-close');
  const applyBtn = document.getElementById('filter-sheet-apply');
  const overlay  = document.getElementById('overlay');

  openBtn?.addEventListener('click', () => {
    sheet?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  function closeSheet() {
    sheet?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeSheet);
  applyBtn?.addEventListener('click', () => { applyFilters(); closeSheet(); });
  overlay?.addEventListener('click', closeSheet);
}

/* ─── Category Links in mobile drawer ────────────── */
function bindCategoryLinks() {
  document.querySelectorAll('[data-category-link]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const cat = link.dataset.categoryLink;
      shopState.category = cat;
      shopState.page = 1;

      // Update checkboxes
      document.querySelectorAll('.cat-checkbox').forEach(cb => {
        cb.checked = cb.value === cat;
      });

      applyFilters();
    });
  });
}

/* Expose */
window.goToPage         = goToPage;
window.resetAllFilters  = resetAllFilters;
window.removeFilterChip = removeFilterChip;
