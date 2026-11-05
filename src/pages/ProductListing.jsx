import { useState } from 'react';

import ErrorMessage from '../components/common/ErrorMessage';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import Pagination from '../components/common/Pagination';
import ProductFilters from '../components/product/ProductFilters';
import ProductGrid from '../components/product/ProductGrid';
import useCategories from '../hooks/useCategories';
import useProductFilters from '../hooks/useProductFilters';
import useProducts from '../hooks/useProducts';

function ProductListing() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const {
    filters,
    setSearch,
    setCategory,
    setPriceRange,
    toggleBrand,
    setPage,
  } = useProductFilters();

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const {
    products,
    availableBrands,
    totalProducts,
    totalPages,
    currentPage,
    loading,
    error,
  } = useProducts(filters);

  return (
    <div className="app-shell">
      <Header
        searchValue={filters.search}
        onSearch={setSearch}
        onMenuClick={() => setFiltersOpen(true)}
      />

      <div className="listing-layout">
        <ProductFilters
          categories={categories}
          categoriesLoading={categoriesLoading}
          availableBrands={availableBrands}
          filters={filters}
          onCategoryChange={setCategory}
          onPriceApply={setPriceRange}
          onBrandToggle={toggleBrand}
          isOpen={filtersOpen}
          onClose={() => setFiltersOpen(false)}
        />

        <section className="listing-content">
          <div className="listing-header">
            <div className="listing-header-main">
              <h1>Products</h1>
              {!loading && !error && (
                <p className="result-count">{totalProducts} results</p>
              )}
            </div>

            <button
              type="button"
              className="btn btn-secondary filters-toggle-btn"
              onClick={() => setFiltersOpen(true)}
            >
              Filters
            </button>
          </div>

          {categoriesError && (
            <ErrorMessage message={`Categories: ${categoriesError}`} />
          )}

          {loading && <Loader message="Loading products..." />}

          {!loading && error && <ErrorMessage message={error} />}

          {!loading && !error && (
            <>
              <ProductGrid products={products} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProductListing;
