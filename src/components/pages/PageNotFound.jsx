import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F2F2] dark:bg-[var(--bg-main)]">
      <h1 className="font-black text-6xl text-[var(--accent-primary)] mb-2">404</h1>
      <h2 className="font-black text-2xl text-[var(--text-strong)] dark:text-white mb-4">Page Not Available</h2>
      <Link 
        to="/" 
        className="px-6 py-3 bg-[var(--accent-focus)] text-white font-black rounded-full shadow-[0_4px_0_#2563eb] hover:translate-y-1 hover:shadow-none transition-all"
      >
        Return to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
