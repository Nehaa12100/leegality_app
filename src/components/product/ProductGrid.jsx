import ProductCard from './ProductCard';

function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>No products match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
