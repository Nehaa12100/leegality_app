import { Link, useLocation } from 'react-router-dom';

import StarRating from '../common/StarRating';

function ProductCard({ product }) {
  const location = useLocation();

  return (
    <Link
      to={`/product/${product.id}`}
      state={{ fromSearch: location.search }}
      className="product-card"
    >
      <div className="product-card-image">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="product-card-body">
        <h3 className="product-card-title">{product.title}</h3>
        <div className="product-card-meta">
          <p className="product-card-price">${product.price}</p>
          <StarRating rating={product.rating} />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
