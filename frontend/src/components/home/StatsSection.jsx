import { motion } from 'framer-motion';
import { FaUserTie, FaChartLine, FaHeadset, FaStar } from 'react-icons/fa6';

const StatsSection = () => {
    const stats = [
        { id: 1, value: "5,000+", label: "Traders Trained", icon: <FaUserTie className="text-4xl text-trading-blue" /> },
        { id: 2, value: "90%", label: "Success Rate", icon: <FaChartLine className="text-4xl text-trading-green" /> },
        { id: 3, value: "24/7", label: "Expert Support", icon: <FaHeadset className="text-4xl text-purple-500" /> },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Prop Trader",
            text: "FrankFxTrading changed my perspective on market structure. The VIP signals are incredibly accurate.",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Beginner",
            text: "The beginner courses made everything easy to understand. I'm finally seeing consistent profits.",
            rating: 5
        }
    ];

    return (
        <section className="py-20 relative bg-black/40 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-center mb-4">{stat.icon}</div>
                            <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                            <p className="text-gray-400">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Trusted by Traders Worldwide</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. See what our community has to say about their trading journey with us.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl p-8 relative overflow-hidden"
                        >
                            {/* Decorative quote mark */}
                            <div className="absolute top-4 right-4 text-6xl text-white/5 font-serif">"</div>
                            
                            <div className="flex text-trading-green mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <FaStar key={i} />
                                ))}
                            </div>
                            <p className="text-gray-300 italic mb-6">"{review.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-tr from-trading-blue to-trading-green rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold">{review.name}</h4>
                                    <p className="text-sm text-gray-400">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
