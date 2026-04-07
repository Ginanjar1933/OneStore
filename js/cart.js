/* =====================================================
   ONE STORE — Cart Logic
   Manages cart state via localStorage
   ===================================================== */

const CART_KEY      = 'onestore_cart';
const WISHLIST_KEY  = 'onestore_wishlist';
const USER_KEY      = 'onestore_user';

/* =====================================================
   CART FUNCTIONS
   ===================================================== */

/**
 * Get cart from localStorage
 * @returns {Array}
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save cart to localStorage
 * @param {Array} cart
 */
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }));
}

/**
 * Add item to cart
 * @param {number} productId
 * @param {string} size  - selected size
 * @param {string} color - selected color hex
 * @param {number} qty   - quantity to add
 */
function addToCart(productId, size = null, color = null, qty = 1) {
  const cart = getCart();
  const product = (typeof getProductById === 'function') ? getProductById(productId) : null;

  if (!product) {
    showToast('Error', 'Produk tidak ditemukan.', 'error');
    return;
  }

  // Auto-pick size if none selected
  const selectedSize  = size  || product.sizes[0];
  const selectedColor = color || product.colors[0];

  // Check if same product+size+color already in cart
  const existingIndex = cart.findIndex(
    item => item.id === productId &&
            item.size === selectedSize &&
            item.color === selectedColor
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty = Math.min(cart[existingIndex].qty + qty, 99);
  } else {
    cart.push({
      id:    productId,
      name:  product.name,
      price: product.price,
      image: product.images[0],
      size:  selectedSize,
      color: selectedColor,
      qty:   qty,
    });
  }

  saveCart(cart);
  showToast('Berhasil!', `${product.name} ditambahkan ke keranjang.`, 'success');
  animateCartBtn();
}

/**
 * Remove item from cart by index
 * @param {number} index
 */
function removeFromCart(index) {
  const cart = getCart();
  const removed = cart.splice(index, 1);
  saveCart(cart);
  if (removed.length > 0) {
    showToast('Dihapus', `${removed[0].name} dihapus dari keranjang.`, 'info');
  }
}

/**
 * Update quantity of a cart item
 * @param {number} index
 * @param {number} newQty
 */
function updateCartQty(index, newQty) {
  const cart = getCart();
  if (!cart[index]) return;
  if (newQty <= 0) {
    removeFromCart(index);
    return;
  }
  cart[index].qty = Math.min(newQty, 99);
  saveCart(cart);
}

/**
 * Clear entire cart
 */
function clearCart() {
  saveCart([]);
}

/**
 * Get cart total item count
 * @returns {number}
 */
function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/**
 * Get cart subtotal
 * @returns {number}
 */
function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

/**
 * Get cart items with full product data
 * @returns {Array}
 */
function getCartItems() {
  return getCart();
}

/* =====================================================
   WISHLIST FUNCTIONS
   ===================================================== */

/**
 * Get wishlist from localStorage
 * @returns {Array<number>}
 */
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save wishlist to localStorage
 * @param {Array<number>} list
 */
function saveWishlist(list) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent('wishlistUpdated', { detail: list }));
}

/**
 * Toggle product in wishlist
 * @param {number} productId
 * @param {HTMLElement} btn - optional button element to update icon
 */
function toggleWishlist(productId, btn = null) {
  const list = getWishlist();
  const index = list.indexOf(productId);
  let isAdded = false;

  if (index === -1) {
    list.push(productId);
    isAdded = true;
    showToast('Wishlist', 'Produk ditambahkan ke wishlist! ❤️', 'success');
  } else {
    list.splice(index, 1);
    showToast('Wishlist', 'Produk dihapus dari wishlist.', 'info');
  }

  saveWishlist(list);

  // Update button appearance
  if (btn) {
    if (isAdded) {
      btn.classList.add('wishlisted');
    } else {
      btn.classList.remove('wishlisted');
    }
  }

  return isAdded;
}

/**
 * Check if product is in wishlist
 * @param {number} productId
 * @returns {boolean}
 */
function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

/* =====================================================
   USER SESSION (Simulated)
   ===================================================== */

/**
 * Get simulated logged-in user
 * @returns {object|null}
 */
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Simulate login
 * @param {string} email
 * @param {string} name
 */
function loginUser(email, name) {
  const user = { email, name, avatar: null, joinedAt: Date.now() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}

/**
 * Logout user
 */
function logoutUser() {
  localStorage.removeItem(USER_KEY);
  window.location.href = 'login.html';
}

/* =====================================================
   UI HELPERS
   ===================================================== */

/**
 * Update cart badge count in navbar
 */
function updateCartBadge() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count > 99 ? '99+' : count;
    if (count > 0) {
      badge.classList.add('show');
    } else {
      badge.classList.remove('show');
    }
  });
}

/**
 * Animate cart icon on add
 */
function animateCartBtn() {
  const cartBtns = document.querySelectorAll('.nav-cart-btn');
  cartBtns.forEach(btn => {
    btn.classList.add('cart-bounce');
    setTimeout(() => btn.classList.remove('cart-bounce'), 600);
  });
}

/**
 * Show toast notification
 * @param {string} title
 * @param {string} message
 * @param {'success'|'error'|'info'} type
 * @param {number} duration - ms
 */
function showToast(title, message, type = 'success', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
    error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
    info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  };

  const colorMap = {
    success: 'var(--color-primary)',
    error:   'var(--color-danger)',
    info:    'var(--color-info)',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon" style="background: ${colorMap[type]}20; color: ${colorMap[type]}">
      ${iconMap[type] || iconMap.info}
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove
  setTimeout(() => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, duration);

  // Click to dismiss
  toast.addEventListener('click', () => {
    toast.classList.add('hide');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  });
}

/**
 * Quick view modal (placeholder — opens product detail page)
 * @param {number} productId
 */
function quickView(productId) {
  window.location.href = `product-detail.html?id=${productId}`;
}

/* =====================================================
   INIT ON DOM READY
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Update cart badge on page load
  updateCartBadge();

  // Mark wishlist items
  const wishlist = getWishlist();
  document.querySelectorAll('.wishlist-btn[data-id]').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    if (wishlist.includes(id)) btn.classList.add('wishlisted');
  });
});

/* Expose to global scope */
window.getCart          = getCart;
window.saveCart         = saveCart;
window.addToCart        = addToCart;
window.removeFromCart   = removeFromCart;
window.updateCartQty    = updateCartQty;
window.clearCart        = clearCart;
window.getCartCount     = getCartCount;
window.getCartSubtotal  = getCartSubtotal;
window.getCartItems     = getCartItems;
window.getWishlist      = getWishlist;
window.toggleWishlist   = toggleWishlist;
window.isInWishlist     = isInWishlist;
window.getCurrentUser   = getCurrentUser;
window.loginUser        = loginUser;
window.logoutUser       = logoutUser;
window.updateCartBadge  = updateCartBadge;
window.showToast        = showToast;
window.quickView        = quickView;
