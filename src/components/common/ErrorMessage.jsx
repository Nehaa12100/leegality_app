function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message" role="alert">
      <p>{message || 'Something went wrong.'}</p>
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
