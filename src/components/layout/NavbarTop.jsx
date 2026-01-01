import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from '../../context';
import Button from "../common/Button";

const NavbarTop = () => {
  const { isAuthenticated, logoutUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const handleCreatePost = () => {
    isAuthenticated ? navigate("/posts/new") : navigate("/login");
  };

  return (
    <header className="navbar sticky top-0 flex items-center justify-between h-[var(--nav-h)] px-4 md:px-8 bg-[var(--glass-bg)] dark:bg-black/40 backdrop-blur-xl border-b border-[var(--glass-border)] dark:border-white/10 z-50 transition-colors">
      
      {/* Brand Logo - Name hidden on mobile */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[#ff8a42] rounded-xl flex items-center justify-center shadow-[0_3px_0_#c75014] text-white font-black italic transition-transform active:scale-90">
          FS
        </div>
        <span className="hidden md:block text-xl font-black text-[var(--text-strong)] tracking-tight group-hover:text-[var(--accent-primary)] transition-colors">
          FusionSpace
        </span>   
      </Link>

      {/* Right Side Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        
        {/* Create Button - Hidden on mobile (covered by Bottom Nav) */}
        <Button
          className="hidden md:flex bg-[var(--accent-primary)] text-white font-black px-4 py-2.5 rounded-xl shadow-[0_4px_0_#c75014] active:translate-y-1 active:shadow-none transition-all uppercase text-xs tracking-widest"
          onClick={handleCreatePost}
        >
          ＋ Create
        </Button>

        {/* Theme Toggle - Simple icon on mobile */}
        <Button
          className="p-2 md:px-3 md:py-2 rounded-xl text-[var(--text-strong)] bg-[var(--bg-deep)] dark:bg-white/5 transition-all border border-black/5 dark:border-white/5 hover:bg-black/5"
          onClick={toggleTheme} style={{ padding: "8px"}}
        >
          {theme === 'light' ? '🌙' : '☀️'}
          <span className="hidden md:inline ml-2 pr-2 text-xs font-bold uppercase tracking-tighter">
            {theme === 'light' ? 'Dark' : 'Light'}
          </span>
        </Button>
        
        {/* Auth Action */}
        {isAuthenticated ? (
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-[var(--text-strong)] bg-[var(--bg-panel)] dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-sm active:translate-y-0.5 transition-all"
          >
            👤 <span className="hidden md:block">Logout</span>
          </button>
        ) : (
          <Link 
            to="/login" 
            className="px-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-white bg-[var(--accent-focus)] shadow-[0_3px_0_#1E5BBF] active:translate-y-0.5 active:shadow-none transition-all"
          >
            Login
          </Link> 
        )}
      </div>
    </header>
  );
};

export default NavbarTop;