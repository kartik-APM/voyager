import { useState, useEffect } from 'react';
import { savedPlacesService } from '../services/savedPlacesService';

export const useSavedPlaces = () => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSavedPlaces = async () => {
    try {
      setLoading(true);
      const data = await savedPlacesService.getAllSavedPlaces();
      setSavedPlaces(data || []);
    } catch (err) {
      console.error('Error fetching saved places:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPlaces();
  }, []);

  return { savedPlaces, loading, error, refetch: fetchSavedPlaces };
};
