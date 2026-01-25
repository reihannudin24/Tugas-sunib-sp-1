import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/products');
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo & Brand */}
                    <div className="flex items-center">
                        <Link to="/products" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-xl">TokoOnline</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/products"
                            className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
                        >
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/products/add"
                                    className="text-white/90 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
                                >
                                    Add Product
                                </Link>
                                <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-white/20">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">
                                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-white font-medium">{user?.username}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="text-white/90 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-md"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-indigo-700/95 backdrop-blur-lg border-t border-white/10">
                    <div className="px-4 py-3 space-y-2">
                        <Link
                            to="/products"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            Products
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link
                                    to="/products/add"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Add Product
                                </Link>
                                <div className="pt-3 mt-3 border-t border-white/10">
                                    <div className="flex items-center space-x-2 px-3 py-2">
                                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                            <span className="text-white font-semibold text-sm">
                                                {user?.username?.charAt(0).toUpperCase() || 'U'}
                                            </span>
                                        </div>
                                        <span className="text-white font-medium">{user?.username}</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="w-full text-left text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="block bg-white text-indigo-600 px-3 py-2 rounded-lg font-semibold text-center"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
