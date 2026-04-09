import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
            {/* Background decoration */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-trading-blue rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-trading-green rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                >
                    Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-green to-trading-blue">Forex Markets</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-4 max-w-2xl text-xl mx-auto text-gray-300"
                >
                    Join FrankFxTrading to access premium courses, exclusive PDF guides, and real-time trading VIP signals to elevate your trading journey.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 flex justify-center gap-4"
                >
                    <Link to="/courses" className="bg-trading-green hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 inline-block">
                        Start Learning
                    </Link>
                    <Link to="/pdfs" className="bg-transparent border border-trading-blue text-trading-blue hover:bg-trading-blue hover:text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 inline-block">
                        Explore PDFs
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
