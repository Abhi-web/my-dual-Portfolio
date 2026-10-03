import React from 'react';
import { Home, Mail, ArrowLeft, FileText } from 'lucide-react';

export const NotFound = ({ onReturnHome }) => {
  const handleReturn = (e) => {
    e.preventDefault();
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.history.pushState({}, '', '/');
      window.location.reload();
    }
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-dark-950 text-dark-100 flex items-center justify-center p-4 relative overflow-hidden"
      role="main"
    >
      {/* Ambient background glow */}
      <div
        className="absolute w-96 h-96 rounded-full bg-brand-500/10 blur-3xl pointer-events-none -top-20 -left-20"
        aria-hidden="true"
      />
      <div
        className="absolute w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none -bottom-20 -right-20"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-lg w-full rounded-2xl glass-card border border-white/10 bg-dark-900/90 p-8 sm:p-10 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-300 font-mono font-extrabold text-3xl shadow-glow-sm mx-auto">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-dark-300 leading-relaxed">
            The page or route you navigated to does not exist or may have moved. You can return directly to Abhishek Kushwaha's verified professional portfolio overview.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReturn}
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-dark-950 bg-gradient-to-r from-brand-400 to-brand-500 hover:from-brand-300 hover:to-brand-400 shadow-glow-sm transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <a
            href="/#contact"
            onClick={handleReturn}
            className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-white glass-pill border border-white/10 hover:bg-dark-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
          >
            <Mail className="w-4 h-4 text-brand-400" />
            <span>Contact Abhishek</span>
          </a>
        </div>

        <div className="pt-4 border-t border-white/10 text-xs font-mono text-dark-400 flex items-center justify-center gap-2">
          <span>Abhishek Kushwaha</span>
          <span>•</span>
          <span>BCA Graduate & Web Developer</span>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
