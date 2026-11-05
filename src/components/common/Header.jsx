import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ searchValue = '', onSearch, onMenuClick }) {
  const [inputValue, setInputValue] = useState(searchValue);

  useEffect(() => {
    setInputValue(searchValue);
  }, [searchValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(inputValue);
  };

  return (
    <header className="app-header">
      <div className="app-header-inner">
        <button
          type="button"
          className="icon-btn menu-btn"
          aria-label="Open filters"
          onClick={onMenuClick}
        >
          ☰
        </button>

        <Link to="/" className="brand-link">
          Product Listing
        </Link>

        <form className="header-search" onSubmit={handleSubmit}>
          <span className="search-icon" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="21" y2="21" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search products..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            aria-label="Search products"
          />
        </form>

        <div className="header-actions">
          <button type="button" className="icon-btn" aria-label="Cart">
            🛒
          </button>
          <button type="button" className="icon-btn" aria-label="Account">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
