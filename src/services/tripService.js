import { supabase } from '../lib/supabase';

export const tripService = {
  async getAllTrips() {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getTripById(tripId) {
    const { data, error } = await supabase
      .from('trips')
      .select(`
        *,
        trip_destinations (
          *,
          destination:destinations (*)
        ),
        activities (*)
      `)
      .eq('id', tripId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createTrip(tripData) {
    const { data, error } = await supabase
      .from('trips')
      .insert(tripData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTrip(tripId, updates) {
    const { data, error } = await supabase
      .from('trips')
      .update(updates)
      .eq('id', tripId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteTrip(tripId) {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', tripId);
    
    if (error) throw error;
    return true;
  },

  async addDestinationToTrip(tripId, destinationId, details = {}) {
    const { data, error } = await supabase
      .from('trip_destinations')
      .insert({
        trip_id: tripId,
        destination_id: destinationId,
        ...details
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeDestinationFromTrip(tripDestinationId) {
    const { error } = await supabase
      .from('trip_destinations')
      .delete()
      .eq('id', tripDestinationId);
    
    if (error) throw error;
    return true;
  }
};
