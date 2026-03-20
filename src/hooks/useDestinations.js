import { useState, useEffect } from 'react';
import { destinationService } from '../services/destinationService';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [trendingDestinations, setTrendingDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const [all, trending] = await Promise.all([
          destinationService.getAllDestinations(),
          destinationService.getTrendingDestinations()
        ]);
        setDestinations(all || []);
        setTrendingDestinations(trending || []);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, trendingDestinations, loading, error };
};
