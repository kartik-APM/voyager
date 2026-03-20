import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import MobileNav from '../components/MobileNav';

const DiscoverScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="pt-20 flex-grow">
        <section className="relative h-[870px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img alt="Amalfi Coast" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDySh5kc8_j_r9TbzZJ49gHygFZi4L_908opbIreeSGRhVbstliGpVGuIUJ1CiaVkNWvrKF63Ucbssrg9OXstgLxNwByOz2LXy1lROKoSFJ_kCp31exbEiy1LOcGi3qmrKpU6nN3Q_8lGTvcfz5Ty11BrssLFV4oAkFqjSsvUblv-Q0bl9REy2smPKIol4lDMw4KK21tV9Zuf1zEHvAVIUfaaNnY9yG2H90O7Y2uxNhYttghhgb82ORYjHbMek2vTRcXKB9n7h4LsA" />
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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px]">
            <div className="md:col-span-8 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto" onClick={() => navigate('/builder')}>
              <img alt="Japan" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7StCzzpqXowHIaXFBFks6arHLSrKOCHbenatq688I1ou8aQcJns61OJAStJA5YRTmiGa7pkFEj7EcObt7i1doVfhLwMGwNiflSppqs7nV_MIUSgtetqLNcSY6OCagyeB6M0ohN1thVFqF0C4vct9vAT7wCH1zwP5DQ91coAf0LpF7Fr_OAg4h-IssN4ZBdcU68koOAJMw8H0hd5dPjDRNhP835ymvmykB0k8DZrbVfSp8yO7G6XLUlfOPco98hAP7azGfVt9TgDU" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10">
                <span className="inline-block bg-tertiary text-white text-[10px] font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-tighter">New Guide</span>
                <h3 className="text-white text-4xl font-bold mb-2">The Spirit of Japan</h3>
                <p className="text-white/80 max-w-md">From the neon pulse of Tokyo to the serene temples of Kyoto.</p>
              </div>
            </div>
            <div className="md:col-span-4 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
              <img alt="Iceland" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRkrrNMXHzTdrwD_DIPjuiQvMdZFaaqTpuLBBa7I-d1jYvfZZRifg52YBLRPHOuVlo_Nfq_9xtxI5kma3gj2eNVlw_f496dOwVDumWKeMAF90tqCO1KzM3uVTwpeDPv4zqA_Y1iKHZc6pkFL7p_UdUgbfX5-BFvco9wyhOfQlOyXjIrHCV7S1xEVdv3tLnr9vrMo7UvZu8vJp2_dS_QmtehywtK8epp5-6Kx7a6iyJ7jUZ0pmARJ59gVuMQKZ9Pi-ebwoCCgIPq9I" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-1">Icelandic Glaciers</h3>
                <p className="text-white/70 text-sm">Adventure in the Land of Fire and Ice.</p>
              </div>
            </div>
            <div className="md:col-span-4 md:row-start-2 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
              <img alt="Portugal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0PpzxzA1CBi2GrT5lnYmCt0utnpntGfWiaL3aar14ZeFiCHdwYS_WY9PQrzf27ZTw4wO0OWqxcqg7r6xHwpj2-DX4KbH0kTjxry7eD_LhNtWfeUf-JPX8VU1YBY0nqOxn6aoB6PhnCz7N0zI7R8Z3rI4xfuDjBG1_2LWPtDdEqIQrUgHm7ipzdhh_DwhdMltkGKOZBlB0mVGs0PbTUpBth38PghmsiALeq-p_1HJkxTlOtd8rqQ-l0QcrDHaEQhep235fLeP-mvE" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-1">Coastal Portugal</h3>
                <p className="text-white/70 text-sm">Sun-drenched streets and Atlantic breezes.</p>
              </div>
            </div>
            <div className="md:col-span-4 md:row-start-2 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
              <img alt="Morocco" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu5PCp7vp1j8-0auIdTQ0PK6bE8OzeJA41akwejiytRAbC-0syKH5AMNM46WVkKlViavo7uhAT-RmVx70ZMoqCbb5oPZdJb8kjVEwIAOxGobTDc4A8sm2dKu4w1N7cs_mY1EOm1td-WEvsqbSLLS1g1WywDf69efJHCvMbWb0qM8cQSRGxa0PlknoLXR8Sez3OnTHZjBW3_9m7tAJY2vCE9uJ6nuvh4MlM-iR-fGt8xgeYhIa54ORsCeCMnrV7ndbf6Nywljvfbjk" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-1">Magic of Morocco</h3>
                <p className="text-white/70 text-sm">A sensory journey through the medinas.</p>
              </div>
            </div>
            <div className="md:col-span-4 md:row-start-2 relative rounded-md overflow-hidden group cursor-pointer h-64 md:h-auto">
              <img alt="Alps" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnPgo23JvGCAfJ-GjFuIMBkOa4TS634GfiOGcETFiJ_R7aqrhufM1Y9uOpPGg9orGp4KuUqdiJLG3P5M_L4D5BXzyp23zV1fWUyCpEGCSC2kPiiwhSzI00Q1-45YBvkX0PSUH_3dAUTQsBiFj794VE3WM6NKPgYiqQhIXQJRgEQkbQrksCPmqiDYD8yhRFT74bgWXRJQ1J_MznhylXHzb2ICfbQzVKMblJ8LV_8yhT83XO1zVM3PSUqjc5w0kLeXVxca3MzqV7ffA" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-bold mb-1">Swiss Alpine Peaks</h3>
                <p className="text-white/70 text-sm">Pure serenity at 3,000 meters.</p>
              </div>
            </div>
          </div>
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
