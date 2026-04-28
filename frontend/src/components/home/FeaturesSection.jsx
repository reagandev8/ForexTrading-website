import { motion } from 'framer-motion';
import { FaUsers, FaChartPie, FaHeadset } from 'react-icons/fa6';

const FeaturesSection = () => {
    const features = [
        {
            icon: <FaUsers />,
            title: "Community Support",
            description: "Join thousands of like-minded traders. Share setups, discuss market conditions, and grow together."
        },
        {
            icon: <FaChartPie />,
            title: "Risk Management",
            description: "Master the most crucial aspect of trading. We'll teach you how to protect your capital and live to trade another day."
        },
        {
            icon: <FaHeadset />,
            title: "Dedicated Mentorship",
            description: "Get your questions answered. Our expert mentors are available to help you overcome your trading hurdles."
        }
    ];

    return (
        <section className="py-24 relative bg-black/40 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose FrankFxTrading?</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">We don't just provide signals; we build independent, profitable traders. Here is what sets us apart from the rest.</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-trading-blue/50 transition-all group"
                        >
                            <div className="w-14 h-14 bg-trading-blue/20 text-trading-blue rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-trading-blue group-hover:text-white transition-all">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 line-clamp-3">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
