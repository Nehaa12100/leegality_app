function StarRating({ rating, showValue = true }) {
  const filledStars = Math.round(rating || 0);

  return (
    <div className="star-rating" aria-label={`Rating ${rating}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= filledStars ? 'star filled' : 'star'}
        >
          ★
        </span>
      ))}
      {showValue && <span className="rating-value">({rating})</span>}
    </div>
  );
}

export default StarRating;
