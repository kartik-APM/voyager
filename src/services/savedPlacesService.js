import { supabase } from '../lib/supabase';

export const savedPlacesService = {
  async getUserSavedPlaces(userId) {
    const { data, error } = await supabase
      .from('saved_places')
      .select(`
        *,
        destination:destinations (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async savePlace(placeData) {
    const { data, error } = await supabase
      .from('saved_places')
      .insert(placeData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeSavedPlace(placeId) {
    const { error } = await supabase
      .from('saved_places')
      .delete()
      .eq('id', placeId);
    
    if (error) throw error;
    return true;
  },

  async updateSavedPlace(placeId, updates) {
    const { data, error } = await supabase
      .from('saved_places')
      .update(updates)
      .eq('id', placeId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
