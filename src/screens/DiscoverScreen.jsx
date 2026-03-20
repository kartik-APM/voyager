import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';
import { useDestinations } from '../hooks/useDestinations';

const DiscoverScreen = () => {
  const navigate = useNavigate();
  const { trendingDestinations, loading } = useDestinations();

  const heroDestination = trendingDestinations.find(d => d.name === 'Amalfi Coast') || trendingDestinations[0];
  const featuredDestination = trendingDestinations.find(d => d.country === 'Japan') || trendingDestinations[0];
  const otherDestinations = trendingDestinations.filter(d => d.id !== featuredDestination?.id && d.id !== heroDestination?.id).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="pt-20 flex-grow">
        <section className="relative h-[870px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt={heroDestination?.name || 'Destination'} className="w-full h-full object-cover" src={heroDestination?.image_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDySh5kc8_j_r9TbzZJ49gHygFZi4L_908opbIreeSGRhVbstliGpVGuIUJ1CiaVkNWvrKF63Ucbssrg9OXstgLxNwByOz2LXy1lROKoSFJ_kCp31exbEiy1LOcGi3qmrKpU6nN3Q_8lGTvcfz5Ty11BrssLFV4oAkFqjSsvUblv-Q0bl9REy2smPKIol4lDMw4KK21tV9Zuf1zEHvAVIUfaaNnY9yG2H90O7Y2uxNhYttghhgb82ORYjHbMek2vTRcXKB9n7h4LsA'} />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-4xl">
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-8 leading-tight drop-shadow-lg">
              Find your next <br />
              <span className="italic font-normal">unforgettable</span> escape.
            </h1>
            <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-3xl mx-auto">
              <div className="flex-1 flex items-center px-6 py-3 gap-3 border-b md:border-b-0 md:border-r border-slate-100 w-full">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <input className="bg-transparent border-none text-on-surface w-full focus:ring-0 font-medium" placeholder="Where to next?" type="text" />
              </div>
              <div className="flex-1 flex items-center px-6 py-3 gap-3 w-full">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <input className="bg-transparent border-none text-on-surface w-full focus:ring-0 font-medium" placeholder="Add dates" type="text" />
              </div>
              <button onClick={() => navigate('/map')} className="w-full md:w-auto bg-gradient-to-b from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl md:rounded-full font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                Explore
              </button>
            </div>
          </div>
        </section>
        <section className="py-24 px-8 max-w-7xl mx-auto bg-surface">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-xl">
              <span className="text-xs font-bold tracking-widest text-primary uppercase block mb-3">Discovery</span>
              <h2 className="text-4xl font-bold text-on-surface">Trending Now</h2>
            </div>
            <button onClick={() => navigate('/mytrips')} className="text-primary font-bold flex items-center gap-2 group">
              View all regions <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
              {featuredDestination && (
                <div className="md:col-span-8 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto" onClick={() => navigate('/builder')}>
                  <img alt={featuredDestination.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={featuredDestination.image_url} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-10">
                    <span className="inline-block bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-tighter">New Guide</span>
                    <h3 className="text-white text-4xl font-bold mb-2">The Spirit of {featuredDestination.country}</h3>
                    <p className="text-white/80 max-w-md">{featuredDestination.description}</p>
                  </div>
                </div>
              )}
              {otherDestinations.slice(0, 1).map((dest) => (
                <div key={dest.id} className="md:col-span-4 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
                  <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={dest.image_url} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-white text-2xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-white/70 text-sm">{dest.description}</p>
                  </div>
                </div>
              ))}
              {otherDestinations.slice(1, 4).map((dest) => (
                <div key={dest.id} className="md:col-span-4 md:row-start-2 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
                  <img alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={dest.image_url} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-white text-2xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-white/70 text-sm">{dest.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <button className="fixed bottom-8 right-8 bg-primary-container text-on-primary-container w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
      </button>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default DiscoverScreen;
