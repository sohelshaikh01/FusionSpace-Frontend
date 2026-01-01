import { Outlet } from "react-router-dom";
import NavbarTop from "./NavbarTop";
import Loader from "../common/Loader";
import { useAuth } from "../../context/AuthContext";

const AuthLayout = () => {
    const { isLoading } = useAuth();

    if (isLoading) {
        return <Loader fullPage={false} label="Syncing your account details..." />;
    }

    return (
        <div className="min-h-screen bg-[var(--bg-main)] transition-colors duration-300 flex flex-col">
            {/* Sticky Navigation */}
            <NavbarTop />

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-10">
                <div className="w-full h-full flex items-center justify-center">
                    <Outlet />
                </div>
            </main>

            {/* Mobile Bottom Spacing (only if you have a mobile tabbar) */}
            <div className="h-[var(--nav-h)] md:hidden" />
        </div>
    );
};

export default AuthLayout;