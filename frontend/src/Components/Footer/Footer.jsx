// components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-orange-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm text-gray-600">
            <div className="space-x-4">
            <Link to="/" className="hover:text-orange-500">Home</Link>
            <Link to="/todos" className="hover:text-orange-500">Todos</Link>
            <Link to="/account" className="hover:text-orange-500">Account</Link>
            <Link to="/about" className="hover:text-orange-500">About</Link>
            </div>
            <div>Built by <span className="text-orange-500 font-semibold">Shihab</span></div>
        </div>
        </footer>
    );
};

export default Footer;



  