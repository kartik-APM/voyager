import { useState, useEffect } from 'react';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import { tripService } from '../services/tripService';
import { activityService } from '../services/activityService';
import { useSavedPlaces } from '../hooks/useSavedPlaces';

const activityIcons = {
  flight: 'flight_takeoff',
  hotel: 'hotel',
  restaurant: 'restaurant',
  attraction: 'museum',
  transport: 'directions_car',
  other: 'event'
};

const formatTime = (time) => {
  if (!time) return '';
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const BuilderScreen = () => {
  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { savedPlaces } = useSavedPlaces();

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        setLoading(true);
        const trips = await tripService.getAllTrips();
        const florenceTrip = trips?.find(t => t.title.includes('Florence')) || trips?.[0];
        
        if (florenceTrip) {
          setTrip(florenceTrip);
          const tripActivities = await activityService.getTripActivities(florenceTrip.id);
          setActivities(tripActivities || []);
        }
      } catch (err) {
        console.error('Error fetching trip data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopNavBar />
        <SideNavBar />
        <main className="lg:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-8 flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <SideNavBar />
      <main className="lg:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-8 flex-grow">
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-label uppercase tracking-widest text-tertiary mb-2 block">{trip?.description || 'Trip Details'}</span>
              <h1 className="text-5xl md:text-6xl font-headline font-bold text-on-surface leading-tight -ml-1">{trip?.title || 'Trip Journal'}</h1>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-md bg-surface-container-low text-primary font-medium hover:bg-surface-container-high transition-colors">Export PDF</button>
              <button className="px-6 py-3 rounded-md bg-primary text-on-primary font-medium shadow-lg shadow-primary/20 hover:opacity-90 transition-all">Share Itinerary</button>
            </div>
          </div>
          <div className="h-px bg-surface-container-high w-full mt-8"></div>
        </header>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-2 space-y-4">
            <h3 className="text-xs font-label uppercase tracking-widest text-slate-400 mb-6">Timeline</h3>
            <div className="space-y-6 relative ml-4 border-l-2 border-surface-container-high">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/10"></div>
                <p className="font-serif text-lg leading-none mb-1">Day 1</p>
                <p className="text-xs text-slate-500 font-label">{trip?.start_date ? new Date(trip.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}, Arrival</p>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif">Day 1: Arrival & Rebirth</h2>
            </div>
            <div className="space-y-6">
              {activities.length > 0 ? activities.map((activity) => (
                <div key={activity.id} className="group bg-surface-container-lowest p-6 rounded-md flex gap-6 items-start hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-transparent hover:border-surface-container-high">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{activityIcons[activity.activity_type] || 'event'}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-label uppercase tracking-widest text-primary mb-1">{formatTime(activity.scheduled_time)} — {activity.activity_type}</p>
                        <h4 className="text-xl font-serif mb-2">{activity.title}</h4>
                      </div>
                    </div>
                    {activity.location_address && (
                      <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {activity.location_address}
                      </p>
                    )}
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400">
                  <p>No activities planned yet</p>
                </div>
              )}
              <button className="w-full border-2 border-dashed border-surface-container-high py-6 rounded-md text-slate-400 hover:text-primary hover:border-primary transition-all flex flex-col items-center justify-center gap-2">
                <span className="material-symbols-outlined text-3xl">add_circle</span>
                <span className="text-sm font-medium">Add Activity to Day 1</span>
              </button>
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 space-y-6">
            <div className="bg-surface-container-low p-6 rounded-2xl sticky top-28">
              <h3 className="text-xs font-label uppercase tracking-widest text-slate-500 mb-6">Saved Places</h3>
              <div className="space-y-4">
                {savedPlaces.length > 0 ? savedPlaces.map((place) => (
                  <div key={place.id} className="bg-white p-3 rounded-md shadow-sm border border-slate-100 cursor-grab active:cursor-grabbing hover:-translate-y-1 transition-transform group">
                    <div className="h-20 rounded-lg overflow-hidden mb-3 relative">
                      <img alt={place.name} className="w-full h-full object-cover" src={place.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAee4zaaDLBPg9rd_n3KfiUPqGdX_PDQKt-I1gBA_udvLWi-gXarIEfgpyTB31-1xC6AZdIVajU3DVZplnWl5lGsGRbHAPHMNbWC0lbRWRvIwHx8kY7G10OAqTGUL9c9wIiY3u7J0bksKqQXUQ1nJcfAaTUmecTC3Hml0qn351QsGhG5LuKQcmV_wqHQlDMQK8wjqem6esv6nDFtO93qyMz7EATq4JMgqEKvdqBPDwdWHgaC87leKSZdFw0tI6xghBAcoApdg8UiOA'} />
                    </div>
                    <h5 className="text-sm font-bold mb-1">{place.name}</h5>
                  </div>
                )) : (
                  <p className="text-sm text-slate-400">No saved places yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
};

export default BuilderScreen;
