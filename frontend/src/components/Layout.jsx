import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Gavel, Menu, X, BookOpen, MessageSquare, Award, User, LogOut } from 'lucide-react';

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const checkAuth = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        else setUser(null);
    };

    useEffect(() => {
        checkAuth();
        window.addEventListener('authChange', checkAuth);
        return () => window.removeEventListener('authChange', checkAuth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    const navItems = [
        { path: '/', label: 'Home', icon: null },
        { path: '/quiz', label: 'Start Quiz', icon: null },
        { path: '/notes', label: 'Legal Notes', icon: BookOpen },
        { path: '/leaderboard', label: 'Leaderboard', icon: Award },
        { path: '/feedback', label: 'Feedback', icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="container-custom h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                            <Gavel size={18} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-900 leading-none">Jurisprudentia<span className="text-blue-600">.</span></span>
                            <span className="text-[10px] text-slate-400 font-medium">Created by: Althaf S N</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 ${isActive(item.path) ? 'text-blue-600' : 'text-slate-500'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {user ? (
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
                                <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <User size={16} /> {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-secondary text-sm px-3 py-1.5 flex items-center gap-2 text-red-600 border-red-100 hover:bg-red-50"
                                    title="Logout"
                                >
                                    <LogOut size={14} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" className="btn btn-primary text-sm px-5 py-2">
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-slate-500 hover:text-slate-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isMenuOpen && (
                    <div className="md:hidden absolute w-full bg-white border-b border-slate-100 shadow-xl p-4 flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`p-3 rounded-lg flex items-center gap-3 ${isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.icon && <item.icon size={18} />}
                                {item.label}
                            </Link>
                        ))}

                        {user ? (
                            <div className="mt-2 pt-2 border-t border-slate-100">
                                <div className="p-3 font-bold text-slate-900 flex items-center gap-2">
                                    <User size={18} /> {user.username}
                                </div>
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="w-full text-left p-3 text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2"
                                >
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" className="btn btn-primary w-full text-center mt-2" onClick={() => setIsMenuOpen(false)}>
                                Sign In
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="flex-grow bg-slate-50/50">
                <div className="container-custom py-8 fade-in">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
                <div className="container-custom">
                    <p>&copy; {new Date().getFullYear()} Jurisprudentia. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-slate-600 transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
