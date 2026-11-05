export function getUniqueBrands(products) {
  const brands = products
    .map((product) => product.brand)
    .filter(Boolean);

  return [...new Set(brands)].sort((a, b) => a.localeCompare(b));
}

export function filterProducts(products, { category, minPrice, maxPrice, brands }) {
  return products.filter((product) => {
    if (category && product.category !== category) {
      return false;
    }

    if (minPrice !== null && product.price < minPrice) {
      return false;
    }

    if (maxPrice !== null && product.price > maxPrice) {
      return false;
    }

    if (brands.length > 0 && !brands.includes(product.brand)) {
      return false;
    }

    return true;
  });
}

export function paginateItems(items, page, pageSize) {
  const startIndex = (page - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
}

export function getTotalPages(totalItems, pageSize) {
  if (totalItems === 0) {
    return 1;
  }

  return Math.ceil(totalItems / pageSize);
}
