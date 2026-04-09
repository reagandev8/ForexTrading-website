import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    if (!userInfo) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-white">Welcome, <span className="text-trading-green uppercase">{userInfo.name}</span></h1>
                <div className="bg-trading-dark border border-gray-700 px-4 py-2 rounded-lg text-gray-400 text-sm">
                    Account: {userInfo.email}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-8 rounded-2xl border border-white/5 transition-all hover:border-trading-green/30">
                    <h2 className="text-2xl font-bold mb-6 text-trading-green">My Courses</h2>
                    {userInfo.purchasedCourses?.length > 0 ? (
                        <ul className="space-y-4">
                            {userInfo.purchasedCourses.map((course, idx) => (
                                <li key={idx} className="bg-white/5 p-3 rounded border border-white/10 hover:bg-white/10 transition-colors">
                                    {course.title || 'Course ' + (idx + 1)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">You haven't enrolled in any courses yet.</p>
                    )}
                </div>

                <div className="glass p-8 rounded-2xl border border-white/5 transition-all hover:border-trading-blue/30">
                    <h2 className="text-2xl font-bold mb-6 text-trading-blue">My PDFs</h2>
                    {userInfo.purchasedPDFs?.length > 0 ? (
                         <ul className="space-y-4">
                            {userInfo.purchasedPDFs.map((pdf, idx) => (
                                <li key={idx} className="bg-white/5 p-3 rounded border border-white/10 hover:bg-white/10 transition-colors">
                                    {pdf.title || 'PDF ' + (idx + 1)}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">No PDFs purchased.</p>
                    )}
                </div>

                <div className="glass p-8 rounded-2xl border border-yellow-500/10 transition-all hover:border-yellow-500/40 relative">
                    <h2 className="text-2xl font-bold mb-6 text-yellow-500 flex items-center">
                        VIP Mentorship
                        {userInfo.isVIP && <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-black animate-pulse">ACTIVE</span>}
                    </h2>
                    
                    {userInfo.isVIP ? (
                        <div>
                            <p className="text-gray-300 font-medium mb-4">You have full access to signals and direct mentorship.</p>
                            <button onClick={() => window.open('https://t.me/FrankFxVIP', '_blank')} className="w-full bg-trading-dark text-yellow-500 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black font-bold py-3 rounded-xl transition-all">
                                Access VIP Channel
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-gray-400 mb-6">Inactive</p>
                            <Link to="/vip" className="block text-center w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black font-extrabold py-3 rounded-xl shadow-lg shadow-yellow-500/20 transition-all transform hover:scale-[1.02]">
                                Upgrade Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
