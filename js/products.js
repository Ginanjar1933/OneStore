/* =====================================================
   ONE STORE — Product Data
   24 fashion products across 5 categories
   ===================================================== */

const PRODUCTS = [
  // ─── MEN ──────────────────────────────────────────
  {
    id: 1,
    name: "Kemeja Oxford Slim Fit",
    category: "men",
    subcategory: "Shirts",
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    rating: 4.7,
    reviews: 128,
    sold: 342,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#FFFFFF", "#0F172A", "#1E40AF"],
    colorNames: ["White", "Black", "Navy Blue"],
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    ],
    description: "Kemeja Oxford premium dengan potongan slim fit modern. Terbuat dari bahan katun premium yang breathable dan nyaman dipakai sepanjang hari. Cocok untuk formal maupun kasual.",
    isNew: false,
    isFeatured: true,
    stock: 50,
  },
  {
    id: 2,
    name: "Kaos Oversize Premium",
    category: "men",
    subcategory: "T-Shirts",
    price: 185000,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 89,
    sold: 215,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#F8FAFC", "#1E293B", "#6B7280", "#10B981"],
    colorNames: ["White", "Black", "Gray", "Green"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    ],
    description: "Kaos oversize dengan bahan cotton combed 30s yang lembut dan tebal. Desain minimalis yang timeless, cocok untuk tampilan streetwear.",
    isNew: true,
    isFeatured: true,
    stock: 80,
  },
  {
    id: 3,
    name: "Celana Chino Slim Tapered",
    category: "men",
    subcategory: "Pants",
    price: 359000,
    originalPrice: 459000,
    discount: 22,
    rating: 4.8,
    reviews: 203,
    sold: 520,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#C4A882", "#0F172A", "#374151"],
    colorNames: ["Khaki", "Black", "Charcoal"],
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80",
    ],
    description: "Celana chino slim tapered dengan bahan stretch premium. Kenyamanan sepanjang hari dengan tampilan yang stylish.",
    isNew: false,
    isFeatured: true,
    stock: 45,
  },
  {
    id: 4,
    name: "Jaket Varsity College",
    category: "men",
    subcategory: "Jackets",
    price: 549000,
    originalPrice: 699000,
    discount: 21,
    rating: 4.6,
    reviews: 74,
    sold: 180,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#0F172A", "#1E40AF", "#7C3AED"],
    colorNames: ["Black", "Navy", "Purple"],
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    ],
    description: "Jaket varsity college dengan desain klasik American style. Material wool blend dengan aksen kulit sintetis berkualitas tinggi.",
    isNew: false,
    isFeatured: false,
    stock: 30,
  },
  {
    id: 5,
    name: "Hoodie Fleece Premium",
    category: "men",
    subcategory: "Hoodies",
    price: 425000,
    originalPrice: null,
    discount: 0,
    rating: 4.9,
    reviews: 156,
    sold: 398,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#F8FAFC", "#1E293B", "#6B7280", "#92400E"],
    colorNames: ["White", "Black", "Gray", "Brown"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80",
    ],
    description: "Hoodie fleece dengan bahan super lembut dan hangat. Dilengkapi dengan pouch pocket besar dan drawstring hood yang adjustable.",
    isNew: true,
    isFeatured: true,
    stock: 65,
  },

  // ─── WOMEN ────────────────────────────────────────
  {
    id: 6,
    name: "Dress Midi Floral Elegant",
    category: "women",
    subcategory: "Dresses",
    price: 349000,
    originalPrice: 449000,
    discount: 22,
    rating: 4.8,
    reviews: 247,
    sold: 620,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#FDE8D8", "#E8D3F5", "#D3EAF5"],
    colorNames: ["Peach", "Lavender", "Baby Blue"],
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    ],
    description: "Dress midi dengan motif floral yang elegan. Bahan chiffon lembut yang jatuh indah, cocok untuk acara formal maupun semi-formal.",
    isNew: false,
    isFeatured: true,
    stock: 40,
  },
  {
    id: 7,
    name: "Blouse Satin Modern",
    category: "women",
    subcategory: "Tops",
    price: 225000,
    originalPrice: null,
    discount: 0,
    rating: 4.6,
    reviews: 132,
    sold: 310,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#FFFFFF", "#FDE8D8", "#0F172A"],
    colorNames: ["White", "Cream", "Black"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80",
    ],
    description: "Blouse satin dengan potongan modern yang mengikuti lekuk tubuh. Bahan satin premium yang halus dan berkilau elegan.",
    isNew: true,
    isFeatured: true,
    stock: 55,
  },
  {
    id: 8,
    name: "Celana Kulot Linen",
    category: "women",
    subcategory: "Pants",
    price: 285000,
    originalPrice: 359000,
    discount: 21,
    rating: 4.7,
    reviews: 98,
    sold: 245,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#F5F0E8", "#0F172A", "#7C6B5E"],
    colorNames: ["Cream", "Black", "Mocha"],
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b5a4c?w=600&q=80",
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80",
    ],
    description: "Celana kulot berbahan linen premium yang ringan dan breathable. Perfect untuk tampilan casual chic yang nyaman.",
    isNew: false,
    isFeatured: false,
    stock: 60,
  },
  {
    id: 9,
    name: "Cardigan Rajut Premium",
    category: "women",
    subcategory: "Outerwear",
    price: 389000,
    originalPrice: 489000,
    discount: 20,
    rating: 4.9,
    reviews: 189,
    sold: 450,
    sizes: ["S", "M", "L"],
    colors: ["#F5F0E8", "#E8C9B0", "#374151"],
    colorNames: ["Ivory", "Camel", "Gray"],
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    ],
    description: "Cardigan rajut dengan benang premium yang lembut. Desain oversized yang trendy dengan bukaan depan yang longgar.",
    isNew: false,
    isFeatured: true,
    stock: 35,
  },
  {
    id: 10,
    name: "Rok Mini Pleated",
    category: "women",
    subcategory: "Skirts",
    price: 199000,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 76,
    sold: 185,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#1E40AF", "#0F172A", "#BE185D"],
    colorNames: ["Blue", "Black", "Pink"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5218cec5f5?w=600&q=80",
    ],
    description: "Rok mini pleated dengan bahan berkualitas yang jatuh sempurna. Elastis di bagian pinggang untuk kenyamanan maksimal.",
    isNew: true,
    isFeatured: false,
    stock: 70,
  },

  // ─── KIDS ─────────────────────────────────────────
  {
    id: 11,
    name: "Kaos Anak Printed Fun",
    category: "kids",
    subcategory: "T-Shirts",
    price: 95000,
    originalPrice: 125000,
    discount: 24,
    rating: 4.7,
    reviews: 54,
    sold: 142,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
    colors: ["#FDE047", "#60A5FA", "#F87171"],
    colorNames: ["Yellow", "Blue", "Red"],
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80",
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80",
    ],
    description: "Kaos anak dengan print fun dan warna cerah. Bahan cotton combed yang lembut dan aman untuk kulit anak.",
    isNew: false,
    isFeatured: true,
    stock: 100,
  },
  {
    id: 12,
    name: "Set Baju Anak Setelan",
    category: "kids",
    subcategory: "Sets",
    price: 175000,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    reviews: 67,
    sold: 198,
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["#FDE047", "#60A5FA", "#86EFAC"],
    colorNames: ["Yellow", "Blue", "Green"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80",
      "https://images.unsplash.com/photo-1565766266200-1be067eb4f64?w=600&q=80",
    ],
    description: "Setelan baju anak yang cute dan nyaman. Terdiri dari atasan dan celana/rok yang matching dengan motif lucu.",
    isNew: true,
    isFeatured: false,
    stock: 80,
  },

  // ─── SHOES ────────────────────────────────────────
  {
    id: 13,
    name: "Sneakers Casual Premium",
    category: "shoes",
    subcategory: "Sneakers",
    price: 649000,
    originalPrice: 849000,
    discount: 24,
    rating: 4.9,
    reviews: 312,
    sold: 780,
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: ["#FFFFFF", "#0F172A", "#1E40AF"],
    colorNames: ["White", "Black", "Blue"],
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
    ],
    description: "Sneakers premium dengan sole rubber berkualitas tinggi. Desain minimalis yang cocok dipakai untuk berbagai kesempatan.",
    isNew: false,
    isFeatured: true,
    stock: 25,
  },
  {
    id: 14,
    name: "Loafers Kulit Genuine",
    category: "shoes",
    subcategory: "Loafers",
    price: 789000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviews: 145,
    sold: 320,
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["#8B4513", "#0F172A", "#C4A882"],
    colorNames: ["Brown", "Black", "Tan"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&q=80",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
    ],
    description: "Loafers berbahan kulit genuine yang berkualitas premium. Tapak empuk untuk kenyamanan sepanjang hari.",
    isNew: true,
    isFeatured: true,
    stock: 20,
  },
  {
    id: 15,
    name: "Sandal Slides Trendy",
    category: "shoes",
    subcategory: "Sandals",
    price: 189000,
    originalPrice: 249000,
    discount: 24,
    rating: 4.5,
    reviews: 89,
    sold: 234,
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["#FFFFFF", "#0F172A", "#10B981"],
    colorNames: ["White", "Black", "Green"],
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=600&q=80",
      "https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=600&q=80",
    ],
    description: "Sandal slides casual dengan tali yang lebar dan nyaman. Bahan EVA yang ringan dan tahan lama.",
    isNew: false,
    isFeatured: false,
    stock: 55,
  },
  {
    id: 16,
    name: "Sepatu Boots Ankle",
    category: "shoes",
    subcategory: "Boots",
    price: 899000,
    originalPrice: 1100000,
    discount: 18,
    rating: 4.8,
    reviews: 98,
    sold: 210,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["#8B4513", "#0F172A"],
    colorNames: ["Brown", "Black"],
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&q=80",
    ],
    description: "Sepatu boots ankle dengan material kulit premium. Zipper di samping untuk kemudahan pemakaian. Sole tebal anti-slip.",
    isNew: false,
    isFeatured: false,
    stock: 15,
  },

  // ─── ACCESSORIES ──────────────────────────────────
  {
    id: 17,
    name: "Topi Baseball Cap",
    category: "accessories",
    subcategory: "Hats",
    price: 125000,
    originalPrice: null,
    discount: 0,
    rating: 4.6,
    reviews: 167,
    sold: 430,
    sizes: ["One Size"],
    colors: ["#0F172A", "#F8FAFC", "#1E40AF", "#10B981"],
    colorNames: ["Black", "White", "Navy", "Green"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=600&q=80",
    ],
    description: "Baseball cap dengan embroidery logo One Store yang stylish. Bahan cotton twill premium dengan adjustable strap di belakang.",
    isNew: true,
    isFeatured: true,
    stock: 90,
  },
  {
    id: 18,
    name: "Tas Tote Canvas Premium",
    category: "accessories",
    subcategory: "Bags",
    price: 245000,
    originalPrice: 310000,
    discount: 21,
    rating: 4.7,
    reviews: 113,
    sold: 285,
    sizes: ["One Size"],
    colors: ["#F5F0E8", "#0F172A", "#1E40AF"],
    colorNames: ["Cream", "Black", "Navy"],
    badge: "Best Seller",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    ],
    description: "Tote bag canvas berkualitas dengan strap yang panjang dan nyaman. Kapasitas besar dengan inner pocket untuk organisasi.",
    isNew: false,
    isFeatured: true,
    stock: 60,
  },
  {
    id: 19,
    name: "Kacamata Hitam Vintage",
    category: "accessories",
    subcategory: "Eyewear",
    price: 189000,
    originalPrice: null,
    discount: 0,
    rating: 4.5,
    reviews: 78,
    sold: 195,
    sizes: ["One Size"],
    colors: ["#0F172A", "#8B4513", "#1E40AF"],
    colorNames: ["Black", "Tortoise", "Blue"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    ],
    description: "Kacamata hitam dengan desain vintage yang timeless. Lensa UV400 protection dengan frame acetate yang ringan.",
    isNew: true,
    isFeatured: false,
    stock: 45,
  },
  {
    id: 20,
    name: "Belt Kulit Casual",
    category: "accessories",
    subcategory: "Belts",
    price: 149000,
    originalPrice: 199000,
    discount: 25,
    rating: 4.6,
    reviews: 92,
    sold: 240,
    sizes: ["S (70-85cm)", "M (85-100cm)", "L (100-115cm)"],
    colors: ["#8B4513", "#0F172A"],
    colorNames: ["Brown", "Black"],
    badge: "Sale",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    ],
    description: "Belt kulit pria/wanita dengan buckle premium. Bahan split leather yang kuat dan tahan lama.",
    isNew: false,
    isFeatured: false,
    stock: 75,
  },
  {
    id: 21,
    name: "Scarf Cashmere Blend",
    category: "accessories",
    subcategory: "Scarves",
    price: 275000,
    originalPrice: null,
    discount: 0,
    rating: 4.8,
    reviews: 56,
    sold: 130,
    sizes: ["One Size"],
    colors: ["#F5F0E8", "#374151", "#7C3AED"],
    colorNames: ["Cream", "Charcoal", "Purple"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80",
    ],
    description: "Scarf cashmere blend yang super lembut dan hangat. Tersedia dalam berbagai warna elegan yang cocok untuk musim dingin.",
    isNew: true,
    isFeatured: false,
    stock: 40,
  },
  {
    id: 22,
    name: "Kemeja Flanel Kotak",
    category: "men",
    subcategory: "Shirts",
    price: 265000,
    originalPrice: 339000,
    discount: 22,
    rating: 4.6,
    reviews: 110,
    sold: 290,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#DC2626", "#1E40AF", "#374151"],
    colorNames: ["Red", "Navy Blue", "Gray"],
    badge: null,
    images: [
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
      "https://images.unsplash.com/photo-1598032896994-f2e52daf5a51?w=600&q=80",
    ],
    description: "Kemeja flanel kotak-kotak dengan bahan tebal dan hangat. Cocok untuk outdoor activities maupun casual daily wear.",
    isNew: false,
    isFeatured: false,
    stock: 55,
  },
  {
    id: 23,
    name: "Jumpsuit Casual Wanita",
    category: "women",
    subcategory: "Jumpsuits",
    price: 399000,
    originalPrice: 499000,
    discount: 20,
    rating: 4.7,
    reviews: 88,
    sold: 205,
    sizes: ["XS", "S", "M", "L"],
    colors: ["#0F172A", "#F5F0E8", "#374151"],
    colorNames: ["Black", "Cream", "Gray"],
    badge: "Trending",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=80",
    ],
    description: "Jumpsuit casual wanita dengan potongan modern yang flattering. Bahan rayon halus yang nyaman dipakai seharian.",
    isNew: false,
    isFeatured: true,
    stock: 30,
  },
  {
    id: 24,
    name: "Celana Jogger Pria",
    category: "men",
    subcategory: "Pants",
    price: 229000,
    originalPrice: null,
    discount: 0,
    rating: 4.7,
    reviews: 145,
    sold: 370,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["#374151", "#0F172A", "#F8FAFC"],
    colorNames: ["Gray", "Black", "White"],
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
      "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80",
    ],
    description: "Celana jogger pria dengan bahan fleece premium. Elastis di pinggang dan pergelangan kaki untuk tampilan sporty.",
    isNew: true,
    isFeatured: true,
    stock: 85,
  },
];

/* ─── Helper Functions ────────────────────────────── */

/**
 * Get all products
 */
function getAllProducts() {
  return PRODUCTS;
}

/**
 * Get product by ID
 * @param {number} id
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

/**
 * Get products by category
 * @param {string} category
 */
function getProductsByCategory(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get featured products (for landing page)
 * @param {number} limit
 */
function getFeaturedProducts(limit = 8) {
  return PRODUCTS.filter(p => p.isFeatured).slice(0, limit);
}

/**
 * Get new arrivals
 * @param {number} limit
 */
function getNewArrivals(limit = 4) {
  return PRODUCTS.filter(p => p.isNew).slice(0, limit);
}

/**
 * Get related products (same category, different id)
 * @param {number} productId
 * @param {number} limit
 */
function getRelatedProducts(productId, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, limit);
}

/**
 * Format price to Indonesian Rupiah
 * @param {number} price
 */
function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Filter and sort products
 * @param {object} options
 */
function filterProducts({
  category = 'all',
  minPrice = 0,
  maxPrice = Infinity,
  sizes = [],
  colors = [],
  minRating = 0,
  sortBy = 'popular',
  searchQuery = '',
} = {}) {
  let results = [...PRODUCTS];

  // Category filter
  if (category !== 'all') {
    results = results.filter(p => p.category === category);
  }

  // Price filter
  results = results.filter(p => p.price >= minPrice && p.price <= maxPrice);

  // Size filter
  if (sizes.length > 0) {
    results = results.filter(p =>
      sizes.some(size => p.sizes.includes(size))
    );
  }

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q)
    );
  }

  // Rating filter
  if (minRating > 0) {
    results = results.filter(p => p.rating >= minRating);
  }

  // Sort
  switch (sortBy) {
    case 'popular':
      results.sort((a, b) => b.sold - a.sold);
      break;
    case 'newest':
      results.sort((a, b) => b.id - a.id);
      break;
    case 'price-low':
      results.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      results.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return results;
}

/**
 * Generate star rating HTML
 * @param {number} rating
 */
function generateStarsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '½';
  for (let i = 0; i < empty; i++) html += '☆';
  return html;
}

/**
 * Generate product card HTML
 * @param {object} product
 */
function generateProductCard(product) {
  const price = formatPrice(product.price);
  const originalPrice = product.originalPrice ? formatPrice(product.originalPrice) : '';
  const badgeHTML = product.badge
    ? `<span class="product-badge badge-${product.badge === 'Sale' ? 'danger' : product.badge === 'New' ? 'primary' : 'accent'}">${product.badge}</span>`
    : '';

  return `
    <div class="product-card fade-in" data-id="${product.id}" onclick="window.location.href='product-detail.html?id=${product.id}'">
      <div class="product-card-img-wrap">
        ${badgeHTML}
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80'">
        <div class="product-card-actions">
          <button class="product-action-btn wishlist-btn" onclick="event.stopPropagation(); toggleWishlist(${product.id}, this)" title="Wishlist"
            aria-label="Add to wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button class="product-action-btn quick-view-btn" onclick="event.stopPropagation(); quickView(${product.id})" title="Quick view"
            aria-label="Quick view">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <p class="product-card-cat">${product.subcategory}</p>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="product-card-rating">
          <span class="stars-text">${generateStarsHTML(product.rating)}</span>
          <span class="rating-num">${product.rating}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-card-price">
            <span class="price-current">${price}</span>
            ${originalPrice ? `<span class="price-original">${originalPrice}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm add-to-cart-btn"
            onclick="event.stopPropagation(); addToCart(${product.id})"
            aria-label="Add ${product.name} to cart">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Expose to global scope
window.PRODUCTS = PRODUCTS;
window.getAllProducts = getAllProducts;
window.getProductById = getProductById;
window.getProductsByCategory = getProductsByCategory;
window.getFeaturedProducts = getFeaturedProducts;
window.getNewArrivals = getNewArrivals;
window.getRelatedProducts = getRelatedProducts;
window.formatPrice = formatPrice;
window.filterProducts = filterProducts;
window.generateStarsHTML = generateStarsHTML;
window.generateProductCard = generateProductCard;
