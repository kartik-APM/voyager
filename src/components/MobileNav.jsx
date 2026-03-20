import { Link } from 'react-router-dom';

const MobileNav = () => (
  <nav className="md:hidden fixed bottom-0 w-full bg-white/80 backdrop-blur-xl flex justify-around items-center h-16 border-t border-slate-100 z-50">
    <Link to="/" className="flex flex-col items-center text-slate-400">
      <span className="material-symbols-outlined">explore</span>
      <span className="text-[10px] mt-1">Discover</span>
    </Link>
    <Link to="/mytrips" className="flex flex-col items-center text-primary">
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>travel_explore</span>
      <span className="text-[10px] mt-1 font-bold">My Trips</span>
    </Link>
    <Link to="/builder" className="flex flex-col items-center text-slate-400">
      <span className="material-symbols-outlined">favorite</span>
      <span className="text-[10px] mt-1">Saved</span>
    </Link>
    <Link to="/map" className="flex flex-col items-center text-slate-400">
      <span className="material-symbols-outlined">map</span>
      <span className="text-[10px] mt-1">Map</span>
    </Link>
  </nav>
);

export default MobileNav;
