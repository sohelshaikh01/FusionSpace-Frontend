import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LeftSidebar = () => {
  const { isUser, isAuthenticated } = useAuth();
  
  const navItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/trending", label: "Trending", icon: "🔥" },
    { path: "/explore", label: "Explore", icon: "🔭" },
    { path: "/communities", label: "Community", icon: "👥" },
  ];

  // Using isUser for the path as per your requirement
  const profilePath = isUser ? isUser._id : "login";

  return (
    <aside 
      className="sidebar md:flex hidden w-[240px] flex-col gap-2 min-h-[400px] 
                 bg-[var(--bg-panel)] rounded-[var(--radius)] p-[var(--panel-pad)] 
                 shadow-[var(--shadow-soft)] border border-black/5 dark:border-white/10" 
      aria-label="Sidebar"
    >
      {navItems.map((item) => (
        <NavLink 
          key={item.path}
          to={item.path} 
          className={({ isActive }) => `
            group px-4 py-3 rounded-xl font-bold flex items-center gap-3 
            transition-all duration-200
            ${isActive 
              ? `text-[var(--accent-primary)] bg-[var(--bg-deep)] dark:bg-white/5 shadow-inner` 
              : `text-[var(--text-soft)] hover:text-[var(--text-strong)] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95`
            }
          `}
        >
          <span className="text-xl grayscale group-hover:grayscale-0 transition-all">
            {item.icon}
          </span>
          <span className="tracking-tight">{item.label}</span>
        </NavLink>
      ))}

      {/* Profile Tab */}
      <NavLink 
        to={`/profile/${profilePath}`} 
        className={({ isActive }) => `
          px-4 py-3 rounded-xl font-bold flex items-center gap-3 
          transition-all duration-200
          ${isActive 
            ? `text-[var(--accent-primary)] bg-[var(--bg-deep)] dark:bg-white/5 shadow-inner` 
            : `text-[var(--text-soft)] hover:text-[var(--text-strong)] hover:bg-black/5 dark:hover:bg-white/5 active:scale-95`
          }
        `}
      >
        <span className="text-xl">👤</span>
        <span className="tracking-tight">Profile</span>
      </NavLink>

      <div className="mt-auto pt-6 border-t border-black/5 dark:border-white/5 text-[var(--text-soft)] text-xs font-bold uppercase tracking-widest opacity-60">
        v1.0 · FusionSpace
      </div>
    </aside>
  );
};

export default LeftSidebar;