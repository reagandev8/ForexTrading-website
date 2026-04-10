import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaBookOpen } from 'react-icons/fa6';

const HeroSection = () => {
    return (
        <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center pt-20">
            {/* Background decoration */}
            <div className="absolute top-20 -left-10 w-96 h-96 bg-trading-blue rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse"></div>
            <div className="absolute top-40 -right-10 w-96 h-96 bg-trading-green rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-trading-green text-sm font-medium mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-trading-green animate-ping"></span>
                    Premium Trading Education
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white"
                >
                    Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-green to-trading-blue">Forex Markets</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-4 max-w-2xl text-xl mx-auto text-gray-300 leading-relaxed"
                >
                    Unlock your trading potential with our premium courses, exclusive PDF guides, and highly accurate VIP signals tailored for success.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                >
                    <Link to="/courses" className="group flex items-center justify-center gap-2 bg-gradient-to-r from-trading-green to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-1">
                        Start Learning
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/pdfs" className="group flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all transform hover:-translate-y-1">
                        <FaBookOpen />
                        Explore PDFs
                    </Link>
                </motion.div>
                
                {/* Scroll indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="absolute bottom-[-10vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                >
                    <span className="text-gray-500 text-sm mb-2">Scroll Down</span>
                    <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ y: [0, 48, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-full h-1/2 bg-trading-green rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
            
        </section>
    );
};

export default HeroSection;
