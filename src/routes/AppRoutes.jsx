import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProductListing from '../pages/ProductListing';
import ProductDetail from '../pages/ProductDetail';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
