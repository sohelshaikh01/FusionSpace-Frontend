import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome, AiOutlineCompass } from "react-icons/ai";
import { HiTrendingUp, HiUsers } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from '../../context';

const NavbarBottom = () => {
    const { isUser } = useAuth();

    const navItems = [
        { path: "/", label: "Home", icon: AiFillHome },
        // { path: "/trending", label: "Trending", icon: HiTrendingUp },
        { path: "/explore", label: "Explore", icon: AiOutlineCompass },
        { path: "/posts/new", label: "Create", icon: FiPlus },
        { path: "/communities", label: "Community", icon: HiUsers },
        { path: isUser ? '/profile/' + isUser._id : "login", label: "Profile", icon: CgProfile },
    ];

    return (
        <div className="fixed bottom-5 left-6 right-6 flex items-center justify-around p-2 bg-[var(--glass-bg)] dark:bg-black/80 backdrop-blur-xl rounded-full max-w-md mx-auto shadow-[var(--shadow-soft)] border border-[var(--glass-border)] dark:border-white/10 z-50 md:hidden">
            {navItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200
                            
                            /* Colors for Active vs Normal */
                            ${isActive 
                                ? "bg-[var(--bg-deep)] dark:bg-white/10 text-[var(--accent-primary)]" 
                                : "text-[var(--text-soft)] dark:text-gray-400 hover:bg-black/5 dark:hover:bg-white/5"}
                        `}
                    >
                        <Icon size={24} />
                    </NavLink>
                );
            })}
        </div>
    );
};

export default NavbarBottom;