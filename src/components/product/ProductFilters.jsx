import { useEffect, useState } from 'react';

function ProductFilters({
  categories,
  categoriesLoading,
  availableBrands,
  filters,
  onCategoryChange,
  onPriceApply,
  onBrandToggle,
  isOpen = false,
  onClose,
}) {
  const [minPrice, setMinPrice] = useState(
    filters.minPrice !== null ? String(filters.minPrice) : ''
  );
  const [maxPrice, setMaxPrice] = useState(
    filters.maxPrice !== null ? String(filters.maxPrice) : ''
  );

  useEffect(() => {
    setMinPrice(filters.minPrice !== null ? String(filters.minPrice) : '');
    setMaxPrice(filters.maxPrice !== null ? String(filters.maxPrice) : '');
  }, [filters.minPrice, filters.maxPrice]);

  const handleCategoryChange = (slug) => {
    onCategoryChange(slug);
  };

  const handlePriceSubmit = (event) => {
    event.preventDefault();

    const parsedMin = minPrice === '' ? null : Number(minPrice);
    const parsedMax = maxPrice === '' ? null : Number(maxPrice);

    onPriceApply(
      Number.isFinite(parsedMin) ? parsedMin : null,
      Number.isFinite(parsedMax) ? parsedMax : null
    );
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="filters-backdrop"
          aria-label="Close filters"
          onClick={onClose}
        />
      )}

      <aside className={`filters-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="filters-panel-header">
          <h2 className="filters-title">Filters</h2>
          <button
            type="button"
            className="filters-close-btn"
            aria-label="Close filters"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <section className="filter-section">
          <h3>Categories</h3>
          {categoriesLoading ? (
            <p className="filter-hint">Loading categories...</p>
          ) : (
            <ul className="filter-list">
              <li>
                <label className="filter-option filter-option-round">
                  <input
                    type="checkbox"
                    checked={!filters.category}
                    onChange={() => handleCategoryChange('')}
                  />
                  <span>All</span>
                </label>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <label className="filter-option filter-option-round">
                    <input
                      type="checkbox"
                      checked={filters.category === category.slug}
                      onChange={() =>
                        handleCategoryChange(
                          filters.category === category.slug
                            ? ''
                            : category.slug
                        )
                      }
                    />
                    <span>{category.name}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="filter-section">
          <h3>Price Range</h3>
          <form className="price-filter" onSubmit={handlePriceSubmit}>
            <div className="price-inputs">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                aria-label="Minimum price"
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                aria-label="Maximum price"
              />
            </div>
            <button type="submit" className="btn btn-primary price-apply-btn">
              Apply
            </button>
          </form>
        </section>

        <section className="filter-section">
          <h3>Brands</h3>
          {availableBrands.length === 0 ? (
            <p className="filter-hint">No brands available</p>
          ) : (
            <ul className="filter-list">
              {availableBrands.map((brand) => (
                <li key={brand}>
                  <label className="filter-option">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => onBrandToggle(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </aside>
    </>
  );
}

export default ProductFilters;
