import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import SideNavBar from '../components/SideNavBar';
import MobileNav from '../components/MobileNav';
import { useTrips } from '../hooks/useTrips';

const formatDateRange = (startDate, endDate) => {
  if (!startDate || !endDate) return 'Dates TBD';
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return `${start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${end.toLocaleDateString('en-US', options)}`;
};

const getStatusLabel = (status) => {
  const labels = {
    planning: 'Planning',
    upcoming: 'Upcoming',
    ongoing: 'Ongoing',
    completed: 'Completed'
  };
  return labels[status] || 'Future';
};

const MyTripsScreen = () => {
  const navigate = useNavigate();
  const { trips, loading } = useTrips();

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <div className="flex pt-20 flex-grow">
        <SideNavBar />
        <main className="flex-1 lg:ml-64 p-8 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-tertiary font-bold tracking-widest text-[10px] uppercase mb-2">Dashboard</p>
                <h1 className="text-5xl font-serif text-on-surface">My Trips</h1>
                <p className="text-on-surface-variant mt-4 max-w-md">Welcome back, explorer. Your curated collection of past memories and future adventures awaits.</p>
              </div>
            </div>
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {trips.map((trip) => (
                  <div key={trip.id} className="group relative bg-surface-container-lowest rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer" onClick={() => navigate('/builder')}>
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img alt={trip.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={trip.cover_image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMtR9u5kWcdPfE4yZsJmTxECPujnBQuYkRv_5rpHjoUimDls1AwRTo_TNIxUPTDTQfHeaUk7oNGuOcI-QZ6eVicReC67DKSelsMZ3FFcXV2NjFiGJ4J6JRlym6lbdrIyo6eFFX20-GsT3_pFpNfZtxfV34SRQBO2pRArlxEqNF3qJXl5YzKDUXAG6qHUZV0pIrftLIsnh3GyM-fFbrJvsc2qzFpD9W9yhaDhSgB_aLVbhTphZNJP3oie28sJUbrFWtYo8mdG337nA'} />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary">{getStatusLabel(trip.status)}</span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-2xl font-serif mb-1 -translate-y-4 group-hover:-translate-y-6 transition-transform bg-white/90 backdrop-blur-md p-4 rounded-md inline-block self-start shadow-sm">{trip.title}</h3>
                      <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="border-2 border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center p-8 min-h-[400px] group hover:border-primary transition-colors cursor-pointer bg-white/50" onClick={() => navigate('/map')}>
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-primary-fixed transition-colors">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary transition-colors">add_location</span>
                  </div>
                  <h4 className="text-xl font-serif text-on-surface mb-2">Where to next?</h4>
                  <button className="px-8 py-3 bg-white border border-slate-200 rounded-full text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all mt-4">
                    Plan a New Trip
                  </button>
                </div>
              </div>
            )}
            <footer className="mt-20 py-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 pb-24 md:pb-12">
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="font-serif text-slate-800 text-lg">Voyager</span>
                <p className="text-xs font-light text-slate-400">© 2024 Editorial Voyager. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default MyTripsScreen;
