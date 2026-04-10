import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCircleCheck, FaCrown, FaBell } from 'react-icons/fa6';

const VipSection = () => {
    const benefits = [
        "Real-time trading signals (3-5 daily)",
        "Exact Entry, Stop Loss & Take Profit levels",
        "Weekly market breakdown videos",
        "Risk management guidance per trade",
        "Private community chat access",
        "1-on-1 mentorship sessions (Premium)"
    ];

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-trading-blue/20 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12 backdrop-blur-md overflow-hidden relative">
                    {/* Crown decoration decoration */}
                    <FaCrown className="absolute -top-10 -right-10 text-[180px] text-white/5 transform rotate-12 pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-500 font-bold text-sm mb-6 border border-amber-500/20">
                                <FaCrown /> Exclusive VIP Access
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Trade Alongside the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Professionals</span></h2>
                            <p className="text-lg text-gray-300 mb-8">
                                Stop guessing the market direction. Join our VIP Signals group and receive high-probability trade setups directly to your phone. We analyze, you execute.
                            </p>
                            
                            <Link to="/vip" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                                <FaBell className="animate-bounce" />
                                Join VIP Telegram
                            </Link>
                            <p className="text-sm text-gray-400 mt-4">* Cancel anytime. 7-day money-back guarantee.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-black/40 border border-white/10 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">What's Included?</h3>
                            <ul className="space-y-4">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <FaCircleCheck className="text-trading-green text-xl shrink-0 mt-0.5" />
                                        <span className="text-gray-300">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VipSection;
