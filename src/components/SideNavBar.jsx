const SideNavBar = () => (
  <aside className="h-screen w-64 fixed left-0 top-0 pt-20 border-r border-slate-200/50 bg-slate-50 flex flex-col gap-4 py-6 px-4 hidden lg:flex z-40">
    <div className="px-4 py-2">
      <h2 className="text-xl font-serif text-blue-800">Trip Planner</h2>
      <p className="text-[10px] uppercase tracking-widest text-slate-500">Manage your journey</p>
    </div>
    <nav className="flex flex-col gap-1">
      <a className="flex items-center gap-3 py-3 px-4 text-slate-500 hover:bg-slate-200/50 rounded-lg transition-all group" href="#">
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bookmark</span>
        <span className="text-[10px] uppercase tracking-widest font-medium">Saved Items</span>
      </a>
      <a className="flex items-center gap-3 py-3 px-4 bg-white text-blue-700 shadow-sm rounded-lg group" href="#">
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">settings</span>
        <span className="text-[10px] uppercase tracking-widest font-medium">Trip Settings</span>
      </a>
      <a className="flex items-center gap-3 py-3 px-4 text-slate-500 hover:bg-slate-200/50 rounded-lg transition-all group" href="#">
        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">group</span>
        <span className="text-[10px] uppercase tracking-widest font-medium">Collaborators</span>
      </a>
    </nav>
    <div className="mt-auto px-2">
      <button className="w-full bg-gradient-to-b from-primary to-primary-container text-white py-3 px-4 rounded-xl font-medium shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2">
        <span className="material-symbols-outlined text-sm">add</span>
        Create New Trip
      </button>
    </div>
  </aside>
);

export default SideNavBar;
