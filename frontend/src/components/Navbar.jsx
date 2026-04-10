import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { userInfo, logout } = useContext(UserContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="fixed w-full z-50 glass shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-trading-green to-trading-blue">
                            FrankFxTrading
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <Link to="/" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors">Home</Link>
                            <Link to="/courses" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors">Courses</Link>
                            <Link to="/pdfs" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors">PDF Store</Link>
                            <Link to="/vip" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors font-bold text-yellow-500">VIP</Link>
                            
                            {userInfo ? (
                                <>
                                    <Link to="/dashboard" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors">Dashboard</Link>
                                    {userInfo.role === 'admin' && (
                                        <Link to="/admin" className="text-trading-light hover:text-trading-green px-3 py-2 rounded-md transition-colors text-purple-400 font-bold">Admin</Link>
                                    )}
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-red-600/20 hover:bg-red-600/40 text-red-500 border border-red-500/50 px-4 py-2 rounded-md transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="bg-trading-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors shadow-lg shadow-blue-500/30">Login</Link>
                            )}
                        </div>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-trading-light hover:text-white hover:bg-trading-dark/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-trading-green transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out origin-top ${isOpen ? 'scale-y-100 opacity-100 h-auto block' : 'scale-y-0 opacity-0 h-0 hidden'} glass border-t border-gray-800 absolute w-full`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-trading-dark/95 backdrop-blur-md shadow-xl">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-trading-light hover:text-trading-green hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors">Home</Link>
                    <Link to="/courses" onClick={() => setIsOpen(false)} className="text-trading-light hover:text-trading-green hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors">Courses</Link>
                    <Link to="/pdfs" onClick={() => setIsOpen(false)} className="text-trading-light hover:text-trading-green hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors">PDF Store</Link>
                    <Link to="/vip" onClick={() => setIsOpen(false)} className="text-yellow-500 hover:text-yellow-400 hover:bg-white/5 block px-3 py-2 rounded-md text-base font-bold transition-colors">VIP</Link>
                    
                    {userInfo ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-trading-light hover:text-trading-green hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium transition-colors">Dashboard</Link>
                            {userInfo.role === 'admin' && (
                                <Link to="/admin" onClick={() => setIsOpen(false)} className="text-purple-400 hover:text-purple-300 hover:bg-white/5 block px-3 py-2 rounded-md text-base font-bold transition-colors">Admin</Link>
                            )}
                            <button 
                                onClick={handleLogout}
                                className="w-full text-center bg-red-600/20 hover:bg-red-600/40 text-red-500 border border-red-500/50 block px-3 py-2 rounded-md text-base font-medium mt-4 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/login" onClick={() => setIsOpen(false)} className="bg-trading-blue hover:bg-blue-600 text-white block px-3 py-2 rounded-md text-base font-medium mt-4 text-center border border-trading-blue/50 transition-colors shadow-lg shadow-blue-500/30">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
