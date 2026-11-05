const API_BASE_URL = 'https://dummyjson.com';

export const PRODUCT_ENDPOINTS = {
  products: `${API_BASE_URL}/products`,
  productById: (id) => `${API_BASE_URL}/products/${id}`,
  categories: `${API_BASE_URL}/products/categories`,
  productsByCategory: (category) =>
    `${API_BASE_URL}/products/category/${category}`,
  searchProducts: `${API_BASE_URL}/products/search`,
};
