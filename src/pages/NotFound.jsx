import { Link } from 'react-router-dom';

import Header from '../components/common/Header';

function NotFound() {
  return (
    <div className="app-shell">
      <Header />
      <main className="detail-page">
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link to="/">Go back to products</Link>
      </main>
    </div>
  );
}

export default NotFound;
