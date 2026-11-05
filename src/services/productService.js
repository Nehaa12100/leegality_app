import { PRODUCT_ENDPOINTS } from '../constants/apiEndpoints';

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getProducts() {
  const data = await fetchJson(`${PRODUCT_ENDPOINTS.products}?limit=0`);
  return data.products || [];
}

export async function getProductsByCategory(category) {
  const data = await fetchJson(
    `${PRODUCT_ENDPOINTS.productsByCategory(category)}?limit=0`
  );
  return data.products || [];
}

export async function searchProducts(query) {
  const data = await fetchJson(
    `${PRODUCT_ENDPOINTS.searchProducts}?q=${encodeURIComponent(query)}&limit=0`
  );
  return data.products || [];
}

export async function getProductById(id) {
  return fetchJson(PRODUCT_ENDPOINTS.productById(id));
}

export async function getCategories() {
  return fetchJson(PRODUCT_ENDPOINTS.categories);
}
