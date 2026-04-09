import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Vip = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubscribe = async () => {
        if (!userInfo) {
            toast.info('Please log in to subscribe to VIP');
            navigate('/login');
            return;
        }

        try {
            const { data } = await axios.post(
                'http://localhost:5000/api/payments/create-checkout-session',
                {
                    orderItems: [{ name: 'VIP Monthly Pass', price: 70, qty: 1 }]
                },
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`
                    }
                }
            );
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            toast.error('Failed to initiate checkout');
        }
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-extrabold text-yellow-500 mb-6 drop-shadow-lg shadow-yellow-500">VIP Mentorship & Signals</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">Join the elite trading group. Get daily signals, live market breakdowns, and direct mentorship.</p>

            <div className="max-w-sm mx-auto glass p-8 rounded-2xl border border-yellow-500/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                <h2 className="text-2xl font-bold mb-4">Monthly Pass</h2>
                <div className="text-5xl font-bold mb-6">$70<span className="text-lg text-gray-400 font-normal">/mo</span></div>
                <ul className="text-left space-y-4 mb-8">
                    <li className="flex items-center"><span className="text-trading-green mr-2">✓</span> 3-5 High probability signals daily</li>
                    <li className="flex items-center"><span className="text-trading-green mr-2">✓</span> Weekly live webinar</li>
                    <li className="flex items-center"><span className="text-trading-green mr-2">✓</span> Exclusive Telegram group</li>
                    <li className="flex items-center"><span className="text-trading-green mr-2">✓</span> 24/7 Support</li>
                    <li className="flex items-center"><span className="text-trading-green mr-2">✓</span> Add anything</li>
                </ul>
                <button onClick={handleSubscribe} className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 hover:from-yellow-500 hover:to-yellow-300 text-black font-extrabold py-3 rounded-lg transition-all scale-100 hover:scale-105">
                    Subscribe Now
                </button>
            </div>
        </div>
    );
};

export default Vip;
