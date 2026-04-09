import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
    const { userInfo, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed w-full z-50 glass shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-trading-green to-trading-blue">
                            FrankFxTrading
                        </Link>
                    </div>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
