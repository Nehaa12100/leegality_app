import { useEffect, useState } from 'react';

import { getCategories } from '../services/productService';

function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;

    async function loadCategories() {
      setLoading(true);
      setError(null);

      try {
        const data = await getCategories();
        if (isActive) {
          setCategories(data);
        }
      } catch (err) {
        if (isActive) {
          setError(err.message || 'Failed to load categories');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  return { categories, loading, error };
}

export default useCategories;
