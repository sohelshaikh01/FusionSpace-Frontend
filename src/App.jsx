import { Outlet } from "react-router-dom";
import NavbarTop from "./components/layout/NavbarTop";
import NavbarBottom from "./components/layout/NavbarBottom"; 
import LeftSidebar from "./components/layout/LeftSidebar"; 
import Loader from "./components/common/Loader";

import { useAuth } from "./context/AuthContext";

const AppLayout = () => {
  const { isLoading } = useAuth();

  if (isLoading) return <Loader fullPage label="Loading your space..." />;

  return (
    // Removed "dark" from className
    <div className="app-container bg-[var(--bg-main)] transition-colors duration-300">
      <NavbarTop />
      
      <div className="page flex gap-[var(--gap)] p-6  min-h-screen items-stretch mx-auto" role="main"> 
        <LeftSidebar />
        
        <section className="main flex flex-col gap-[var(--gap)] flex-1"> 
          <div className="w-full">
            <Outlet />
          </div>
        </section>
      </div>

      <NavbarBottom /> 
    </div>
  );
};

export default AppLayout;