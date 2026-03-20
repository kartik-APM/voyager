const Footer = () => (
  <footer className="bg-white border-t border-slate-100 py-12 mt-auto">
    <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="font-serif text-slate-800 text-xl font-bold">Voyager</span>
        <p className="text-xs font-light text-slate-400">© 2024 Editorial Voyager. All rights reserved.</p>
      </div>
      <div className="flex gap-8 text-xs font-light text-slate-400">
        <a className="hover:text-slate-600 transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-slate-600 transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-slate-600 transition-colors" href="#">Support</a>
        <a className="hover:text-slate-600 transition-colors" href="#">Contact</a>
      </div>
      <div className="flex gap-4">
        <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-all">public</span>
        <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-all">share</span>
        <span className="material-symbols-outlined text-slate-400 cursor-pointer hover:text-primary transition-all">smartphone</span>
      </div>
    </div>
  </footer>
);

export default Footer;
