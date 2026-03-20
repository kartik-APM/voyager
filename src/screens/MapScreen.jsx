import TopNavBar from '../components/TopNavBar';
import MobileNav from '../components/MobileNav';

const MapScreen = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavBar />
      <main className="flex-grow pt-20 flex flex-col md:flex-row h-screen overflow-hidden pb-16 md:pb-0">
        <aside className="w-full md:w-[450px] bg-surface flex flex-col h-1/2 md:h-full overflow-y-auto custom-scrollbar border-r border-surface-container-high z-10 relative">
          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <span className="text-label text-[10px] uppercase tracking-widest font-bold text-tertiary">Summer 2024 Expedition</span>
              <h1 className="text-4xl font-serif leading-tight">Mediterranean Coastline: Athens to Amalfi</h1>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-surface-container-lowest rounded-md shadow-sm border border-surface-container-low transition-transform hover:scale-[1.02] duration-300">
                <span className="material-symbols-outlined text-primary mb-2">calendar_today</span>
                <div className="text-2xl font-bold">14 Days</div>
                <div className="text-xs text-outline uppercase tracking-wider">Duration</div>
              </div>
              <div className="p-5 bg-surface-container-lowest rounded-md shadow-sm border border-surface-container-low transition-transform hover:scale-[1.02] duration-300">
                <span className="material-symbols-outlined text-primary mb-2">payments</span>
                <div className="text-2xl font-bold">$4,250</div>
                <div className="text-xs text-outline uppercase tracking-wider">Est. Cost</div>
              </div>
            </div>
          </div>
        </aside>
        <section className="flex-grow relative bg-surface-container-low h-1/2 md:h-full">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="w-full h-full bg-slate-200">
              <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV7WjjIGs2_EHlky55jI-G3xiFsXkvafQ_9M1FjArp8iyeMoWiZmnuNReIuftyi8sonuKZfmfwjvTul9BwJvR9g7WKJy3VyVRV8fUU2yvtYJJ5QpnxLq8PWt_WMhD737n9D3_HLKDvAN6x_FADd41Dg0nRIict8sqCxTB7hwRaj0iLno9fq8LiWYyuEEsWD3upyPQBhS4PvUPJDqH-Gtxf2HRrR5nNh5heAyQnfUUTJDMoXYxiKdQzYTq1a9Xuxq0rkM0mWjAXPLE" alt="Map background" />
            </div>
          </div>
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1000 1000">
            <path d="M700 300 Q 600 450, 400 500 T 200 700" fill="none" stroke="#0058bc" strokeDasharray="10 5" strokeWidth="4"></path>
          </svg>
          <div className="absolute top-[28%] right-[28%] z-20 group">
            <div className="bg-white p-2 rounded-lg shadow-xl border border-surface-container-high transition-transform group-hover:-translate-y-2">
              <div className="w-12 h-12 rounded-md overflow-hidden mb-1">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmIMDHWM2bavq1GhvL-MgRrKMnO0MDKIJHkuOdoUPoWedYbZhWUOSNUzLRW9hyaOnjPkl0If23c4j6WfwTvbYiLvic6RPwp0jrcfJuv445NVb4M6SaaXqWpdd7DwyoBRNDFF4PKTYu7lPN8iAXB1FYiWwIgGduyZoNe5eBlbfs7UuHo_BDHYE-CUwnPPRgbKXmkz2z49eNQfKLlMdHCR33bhJNxLMxalVeFp4mGt298UEca_ir8rbMhj6DSsQnB2-fzNe9vK_eJ00" alt="Athens" />
              </div>
              <div className="text-[10px] font-bold text-center">ATHENS</div>
            </div>
            <div className="w-3 h-3 bg-primary rounded-full mx-auto mt-2 ring-4 ring-white shadow-lg"></div>
          </div>
          <div className="absolute bottom-10 right-10 z-30 flex flex-col gap-2">
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </section>
      </main>
      <MobileNav />
    </div>
  );
};

export default MapScreen;
