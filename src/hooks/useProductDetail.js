import { useEffect, useState } from 'react';

import { getProductById } from '../services/productService';

function useProductDetail(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    let isActive = true;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(id);
        if (isActive) {
          setProduct(data);
        }
      } catch (err) {
        if (isActive) {
          setProduct(null);
          setError(err.message || 'Failed to load product');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [id]);

  return { product, loading, error };
}

export default useProductDetail;
