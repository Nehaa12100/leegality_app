import { useEffect, useMemo, useState } from 'react';

import { PAGE_SIZE } from '../constants/appConstants';
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
} from '../services/productService';
import {
  filterProducts,
  getTotalPages,
  getUniqueBrands,
  paginateItems,
} from '../utils/productFilters';

function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search, category } = filters;

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (search) {
          data = await searchProducts(search);
        } else if (category) {
          data = await getProductsByCategory(category);
        } else {
          data = await getProducts();
        }

        if (isActive) {
          setProducts(data);
        }
      } catch (err) {
        if (isActive) {
          setProducts([]);
          setError(err.message || 'Failed to load products');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isActive = false;
    };
  }, [search, category]);

  const availableBrands = useMemo(
    () => getUniqueBrands(products),
    [products]
  );

  const filteredProducts = useMemo(() => {
    // Category is already applied by the API when there is no search query.
    // When searching, still apply category client-side so filters combine.
    const categoryFilter = search ? filters.category : '';

    return filterProducts(products, {
      category: categoryFilter,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      brands: filters.brands,
    });
  }, [products, search, filters.category, filters.minPrice, filters.maxPrice, filters.brands]);

  const totalPages = getTotalPages(filteredProducts.length, PAGE_SIZE);
  const currentPage = Math.min(filters.page, totalPages);

  const paginatedProducts = useMemo(
    () => paginateItems(filteredProducts, currentPage, PAGE_SIZE),
    [filteredProducts, currentPage]
  );

  return {
    products: paginatedProducts,
    availableBrands,
    totalProducts: filteredProducts.length,
    totalPages,
    currentPage,
    loading,
    error,
  };
}

export default useProducts;
