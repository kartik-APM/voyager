import { Link, useLocation } from 'react-router-dom';

const TopNavBar = () => {
  const location = useLocation();
  const isDiscover = location.pathname === '/';
  const isMyTrips = location.pathname === '/mytrips';
  const isBuilder = location.pathname === '/builder';

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm h-20 flex justify-between items-center px-8 max-w-full mx-auto">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-serif italic text-blue-800">Voyager</Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium tracking-wide">
          <Link to="/" className={`${isDiscover ? 'text-blue-700 font-bold border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-blue-600 transition-colors'}`}>Discover</Link>
          <Link to="/mytrips" className={`${isMyTrips ? 'text-blue-700 font-bold border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-blue-600 transition-colors'}`}>My Trips</Link>
          <Link to="/builder" className={`${isBuilder ? 'text-blue-700 font-bold border-b-2 border-blue-700 pb-1' : 'text-slate-600 hover:text-blue-600 transition-colors'}`}>Planned Trips</Link>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 gap-2">
          <span className="material-symbols-outlined text-slate-500 text-sm">search</span>
          <input className="bg-transparent border-none text-xs focus:ring-0 w-48" placeholder="Search destinations..." type="text" />
        </div>
        <button className="material-symbols-outlined text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-all">notifications</button>
        <button className="material-symbols-outlined text-slate-600 p-2 hover:bg-slate-50 rounded-full transition-all">settings</button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 ml-2">
          <img alt="User profile avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATc8akM7yw21BSo3d-xFW27TFAIJDuqyBQqjsrn47gUN_f6XymNIydQsLdLBs7Kyt_bOGezx2EdTH59QonsZ45XGCqYdbHmVXJg7cOagGf3UXEj4BB2Dzk5fEdLSMDBL5pxxtQfXGbBf7lHFNpJ8fLwOgoxII03yJzkWn8AhEulR1zLNjMlAB6vn-MkAZxRmj1zrhDNpe-siAMXkvuPzu510I395ESK2hlas-k0BNYEmFSxcFbusMd7pYqlUgYB3R0GXaasITY0YE" />
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
