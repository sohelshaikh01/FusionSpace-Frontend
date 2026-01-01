import React from 'react';

const Loader = ({ fullPage = false, label = "Loading..." }) => {
  // The "Full Page" version centers the loader in the middle of the screen
  const containerClass = fullPage 
    ? "fixed inset-0 z-[9999] bg-white/80 dark:bg-black/80 text-black dark:text-white backdrop-blur-sm flex flex-col items-center justify-center " 
    : "flex flex-col items-center justify-center p-4 gap-[var(--gap)] min-h-screen ";

  return (
    <div className={containerClass}>
      <div className="loader-container flex flex-col items-center gap-4">
        {/* Retro style progress-dot animation */}
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 bg-[var(--accent-primary)] rounded-full animate-bounce"></div>
        </div>
        
        {/* Muted label underneath */}
        {label && (
          <span className="text-sm font-bold tracking-widest uppercase text-[var(--text-muted)] animate-pulse">
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default Loader;