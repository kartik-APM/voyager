import { supabase } from '../lib/supabase';

export const destinationService = {
  async getTrendingDestinations() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('is_trending', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAllDestinations() {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async getDestinationById(id) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async searchDestinations(query) {
    const { data, error } = await supabase
      .from('destinations')
      .select('*')
      .ilike('name', `%${query}%`)
      .order('name');
    
    if (error) throw error;
    return data;
  }
};
