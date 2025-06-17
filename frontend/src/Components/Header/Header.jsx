import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../axios";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
            useEffect(() => {
            (async () => {
                try {
                const response = await api.get("/users/me", {
                    withCredentials: true,
                });
                setIsLoggedIn(true)
                } catch (error) {
                console.error("❌ Request failed:", error.message);
                if (error.response) {
                    console.log("❌ Error response:", error.response.data);
                }
                }
            })();
            }, [isLoggedIn]);

        return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold text-orange-500 font-playfair">
            <Link to="/">Tasky Town</Link>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-6 text-orange-600 font-medium">
            <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-400 "}>Home</NavLink>
            <NavLink to="/todos" className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-400"}>Todos</NavLink>
            <NavLink to="/account" className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : "text-gray-700  hover:text-orange-400"}>Account</NavLink>
            <NavLink to="/about"className={({ isActive }) => isActive ? "text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-400"}>About</NavLink>

            {/* Auth Buttons */}
            {isLoggedIn ? ( 
                <Link
            to="/logout"
            className="text-sm bg-transparent border border-orange-400 px-4 py-1 rounded hover:bg-orange-100 transition"
            >
            Log Out
            </Link>
            ) : 

            (<><Link
            to="/login"
            className="text-sm bg-transparent border border-orange-400 px-4 py-1 rounded hover:bg-orange-100 transition"
            >
            Log In
            </Link>
            <Link
            to="/register"
            className="text-sm bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
            >
            Get Started
            </Link></>)}
        </div>
        </nav>
    );
};

export { Header };
