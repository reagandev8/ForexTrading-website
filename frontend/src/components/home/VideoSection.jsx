import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa6';

const VideoSection = () => {
    return (
        <section className="py-20 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Watch How We Trade</h2>
                        <p className="text-gray-400 text-lg">Peek behind the curtains and see our daily market analysis routine.</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 group aspect-video bg-black/50 cursor-pointer"
                >
                    {/* Placeholder Background */}
                    <img 
                        src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1600" 
                        alt="Trading Desk" 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-trading-green/90 rounded-full flex items-center justify-center text-white text-3xl md:text-4xl shadow-lg shadow-trading-green/40 transform group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm z-10 relative">
                            {/* Pulse effect */}
                            <div className="absolute inset-0 bg-trading-green rounded-full animate-ping opacity-50"></div>
                            <FaPlay className="ml-2 relative z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default VideoSection;
