import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa6';

const NewsletterSection = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-trading-blue/10 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-br from-[#1a2332] to-[#111827] border border-white/10 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden"
                >
                    {/* Glow effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-trading-green/20 rounded-full blur-[80px] pointer-events-none"></div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Level Up Your Trading Insights</h2>
                    <p className="text-lg text-gray-400 mb-8 relative z-10">Get free weekly Forex tips, market breakdowns, and exclusive offers directly in your inbox.</p>
                    
                    <form className="max-w-md mx-auto relative z-10 flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            placeholder="Enter your email address" 
                            required
                            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-trading-green focus:ring-1 focus:ring-trading-green transition-all placeholder:text-gray-500"
                        />
                        <button 
                            type="submit" 
                            className="bg-trading-green hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                        >
                            Subscribe <FaPaperPlane />
                        </button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4 relative z-10">No spam. Unsubscribe at any time.</p>
                </motion.div>
            </div>
        </section>
    );
};

export default NewsletterSection;
