import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import ErrorMessage from '../components/common/ErrorMessage';
import Header from '../components/common/Header';
import Loader from '../components/common/Loader';
import StarRating from '../components/common/StarRating';
import { FILTER_QUERY_KEYS } from '../constants/appConstants';
import useProductDetail from '../hooks/useProductDetail';

function getSearchFromState(fromSearch) {
  if (!fromSearch) {
    return '';
  }

  const params = new URLSearchParams(
    fromSearch.startsWith('?') ? fromSearch.slice(1) : fromSearch
  );

  return params.get(FILTER_QUERY_KEYS.search) || '';
}

function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { product, loading, error } = useProductDetail(id);

  const fromSearch = location.state?.fromSearch || '';
  const headerSearchValue = getSearchFromState(fromSearch);

  const handleSearch = (query) => {
    const params = new URLSearchParams(
      fromSearch.startsWith('?') ? fromSearch.slice(1) : fromSearch
    );

    if (query.trim()) {
      params.set(FILTER_QUERY_KEYS.search, query.trim());
    } else {
      params.delete(FILTER_QUERY_KEYS.search);
    }

    params.delete(FILTER_QUERY_KEYS.page);
    navigate({ pathname: '/', search: params.toString() });
  };

  return (
    <div className="app-shell">
      <Header searchValue={headerSearchValue} onSearch={handleSearch} />

      <div className="detail-page">
        <Link
          to={{ pathname: '/', search: fromSearch }}
          className="back-btn"
        >
          ← Back
        </Link>

        {loading && <Loader message="Loading product..." />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && product && (
          <div className="detail-card">
            <div className="detail-media">
              <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
              />
            </div>

            <div className="detail-info">
              <h1>{product.title}</h1>

              <div className="detail-price-row">
                <p className="detail-price">${product.price}</p>
                <StarRating rating={product.rating} />
              </div>

              <p className="detail-meta">
                <span>Brand: {product.brand || 'N/A'}</span>
                <span>Category: {product.category}</span>
              </p>

              <section className="detail-section">
                <h2>Description</h2>
                <p>{product.description}</p>
              </section>

              {product.reviews?.length > 0 && (
                <section className="detail-section">
                  <h2>Reviews</h2>
                  <ul className="review-list">
                    {product.reviews.map((review, index) => (
                      <li
                        key={`${review.reviewerName}-${index}`}
                        className="review-item"
                      >
                        <div className="review-header">
                          <strong>{review.reviewerName}</strong>
                          <StarRating rating={review.rating} />
                        </div>
                        <p>{review.comment}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
