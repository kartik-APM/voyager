import { supabase } from '../lib/supabase';

export const activityService = {
  async getTripActivities(tripId) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('trip_id', tripId)
      .order('scheduled_date', { ascending: true })
      .order('scheduled_time', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getActivityById(activityId) {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', activityId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createActivity(activityData) {
    const { data, error } = await supabase
      .from('activities')
      .insert(activityData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateActivity(activityId, updates) {
    const { data, error } = await supabase
      .from('activities')
      .update(updates)
      .eq('id', activityId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteActivity(activityId) {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', activityId);
    
    if (error) throw error;
    return true;
  },

  async reorderActivities(tripId, activityOrders) {
    const updates = activityOrders.map(({ id, order_index }) => 
      supabase
        .from('activities')
        .update({ order_index })
        .eq('id', id)
        .eq('trip_id', tripId)
    );
    
    await Promise.all(updates);
    return true;
  }
};
