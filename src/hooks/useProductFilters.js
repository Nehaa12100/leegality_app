import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { FILTER_QUERY_KEYS } from '../constants/appConstants';

function parseNumberParam(value) {
  if (value === null || value === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const brandsParam = searchParams.get(FILTER_QUERY_KEYS.brands);
    const pageParam = Number(searchParams.get(FILTER_QUERY_KEYS.page));

    return {
      search: searchParams.get(FILTER_QUERY_KEYS.search) || '',
      category: searchParams.get(FILTER_QUERY_KEYS.category) || '',
      minPrice: parseNumberParam(searchParams.get(FILTER_QUERY_KEYS.minPrice)),
      maxPrice: parseNumberParam(searchParams.get(FILTER_QUERY_KEYS.maxPrice)),
      brands: brandsParam ? brandsParam.split(',').filter(Boolean) : [],
      page: pageParam > 0 ? pageParam : 1,
    };
  }, [searchParams]);

  const updateParams = useCallback(
    (updates, { resetPage = true } = {}) => {
      const nextParams = new URLSearchParams(searchParams);

      Object.entries(updates).forEach(([key, value]) => {
        const isEmpty =
          value === '' ||
          value === null ||
          value === undefined ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          nextParams.delete(key);
        } else if (Array.isArray(value)) {
          nextParams.set(key, value.join(','));
        } else {
          nextParams.set(key, String(value));
        }
      });

      if (resetPage) {
        nextParams.delete(FILTER_QUERY_KEYS.page);
      }

      setSearchParams(nextParams);
    },
    [searchParams, setSearchParams]
  );

  const setSearch = useCallback(
    (search) => {
      updateParams({ [FILTER_QUERY_KEYS.search]: search.trim() });
    },
    [updateParams]
  );

  const setCategory = useCallback(
    (category) => {
      updateParams({ [FILTER_QUERY_KEYS.category]: category });
    },
    [updateParams]
  );

  const setPriceRange = useCallback(
    (minPrice, maxPrice) => {
      updateParams({
        [FILTER_QUERY_KEYS.minPrice]: minPrice,
        [FILTER_QUERY_KEYS.maxPrice]: maxPrice,
      });
    },
    [updateParams]
  );

  const toggleBrand = useCallback(
    (brand) => {
      const nextBrands = filters.brands.includes(brand)
        ? filters.brands.filter((item) => item !== brand)
        : [...filters.brands, brand];

      updateParams({ [FILTER_QUERY_KEYS.brands]: nextBrands });
    },
    [filters.brands, updateParams]
  );

  const setPage = useCallback(
    (page) => {
      updateParams(
        { [FILTER_QUERY_KEYS.page]: page <= 1 ? null : page },
        { resetPage: false }
      );
    },
    [updateParams]
  );

  return {
    filters,
    setSearch,
    setCategory,
    setPriceRange,
    toggleBrand,
    setPage,
  };
}

export default useProductFilters;
