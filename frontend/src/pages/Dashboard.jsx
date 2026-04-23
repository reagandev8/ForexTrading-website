import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
             // In development/strict mode, this might run twice. Using a simple flag or letting it run is fine.
            try {
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const [profileRes, ordersRes] = await Promise.all([
                    axios.get(`${API_URL}/api/users/profile`, config),
                    axios.get(`${API_URL}/api/orders/myorders`, config)
                ]);
                setProfile(profileRes.data);
                
                // Update user context with freshly populated data
                const updatedUser = { ...profileRes.data, token: userInfo.token };
                setUserInfo(updatedUser);
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));

                setOrders(ordersRes.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, [navigate, userInfo?.token]);

    const handleDownload = async (productId) => {
        try {
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get(`${API_URL}/api/download/${productId}`, config);
            if (data.fileUrl) {
                window.open(data.fileUrl, '_blank');
            } else {
                toast.info('File not available for download yet.');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to access file');
        }
    };

    if (!profile) return <div className="text-center text-white py-20 text-2xl font-bold animate-pulse">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-extrabold text-white">Welcome, <span className="text-trading-green uppercase">{profile.name}</span></h1>
                <div className="bg-trading-dark border border-gray-700 px-4 py-2 rounded-lg text-gray-400 text-sm">
                    Account: {profile.email}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                <div className="glass p-8 rounded-2xl border border-white/5 transition-all hover:border-trading-green/30">
                    <h2 className="text-2xl font-bold mb-6 text-trading-green">My Courses</h2>
                    {profile.purchasedCourses?.length > 0 ? (
                        <ul className="space-y-4">
                            {profile.purchasedCourses.map((course, idx) => (
                                <li key={idx} className="bg-white/5 p-4 rounded border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <span className="font-bold">{course.title || 'Course ' + (idx + 1)}</span>
                                    <button onClick={() => handleDownload(course._id)} className="bg-trading-green text-black text-xs px-3 py-1 rounded font-bold hover:bg-green-500">
                                        Access
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500 italic">You haven't enrolled in any courses yet.</p>
                    )}
                </div>

                <div className="glass p-8 rounded-2xl border border-white/5 transition-all hover:border-trading-blue/30">
                    <h2 className="text-2xl font-bold mb-6 text-trading-blue">My PDFs</h2>
                    {profile.purchasedPDFs?.length > 0 ? (
                         <ul className="space-y-4">
                            {profile.purchasedPDFs.map((pdf, idx) => (
                                <li key={idx} className="bg-white/5 p-4 rounded border border-white/10 flex justify-between items-center hover:bg-white/10 transition-colors">
                                    <span className="font-bold">{pdf.title || 'PDF ' + (idx + 1)}</span>
                                    <button onClick={() => handleDownload(pdf._id)} className="bg-trading-blue text-white text-xs px-3 py-1 rounded font-bold hover:bg-blue-600">
                                        Download
                                    </button>
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
                        {profile.isVIP && <span className="ml-2 text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-black animate-pulse">ACTIVE</span>}
                    </h2>
                    
                    {profile.isVIP ? (
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

            <div className="glass p-8 rounded-2xl border border-white/5 mt-8">
                <h2 className="text-2xl font-bold mb-6 text-white">Order History</h2>
                {orders.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-gray-300">
                            <thead className="bg-white/5 text-gray-400">
                                <tr>
                                    <th className="p-4 rounded-tl-lg">ID</th>
                                    <th className="p-4">DATE</th>
                                    <th className="p-4">TOTAL</th>
                                    <th className="p-4">METHOD</th>
                                    <th className="p-4 rounded-tr-lg">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-mono text-sm">{order._id}</td>
                                        <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-bold text-trading-green">${order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">{order.paymentMethod}</td>
                                        <td className="p-4">
                                            {order.isPaid ? (
                                                <span className="text-trading-green bg-trading-green/20 px-2 py-1 rounded text-xs">PAID</span>
                                            ) : (
                                                <span className="text-red-500 bg-red-500/20 px-2 py-1 rounded text-xs">UNPAID</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
