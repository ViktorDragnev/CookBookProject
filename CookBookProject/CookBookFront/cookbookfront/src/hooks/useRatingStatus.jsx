import { useState, useEffect } from 'react';
import axios from 'axios';

const useRatingStatus = () => {
  const [hasRated, setHasRated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkRatingStatus = async () => {
      const authToken = sessionStorage.getItem('authToken');
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8090/api/ratings', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        setHasRated(response.status !== 200);
      } catch (error) {
        setHasRated(error.response?.status === 403);
      } finally {
        setIsLoading(false);
      }
    };

    checkRatingStatus();

    const handleStorageChange = (e) => {
      if (e.key === 'hasRated') {
        setHasRated(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { hasRated, isLoading };
};

export default useRatingStatus;