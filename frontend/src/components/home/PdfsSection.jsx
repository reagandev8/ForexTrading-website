import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFilePdf, FaDownload, FaTags } from 'react-icons/fa6';

const PdfsSection = () => {
    const pdfs = [
        { id: 1, title: "The Candlestick Bible", price: "$19.99", pages: 120 },
        { id: 2, title: "Risk Management 101", price: "$14.99", pages: 55 },
        { id: 3, title: "Psychology of Trading", price: "$24.99", pages: 85 },
        { id: 4, title: "SMC Strategies Cheat Sheet", price: "$9.99", pages: 20 }
    ];

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Digital PDF Resources</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Download our expert-crafted PDF guides to study setups, strategies, and market psychology on the go.</p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pdfs.map((pdf, index) => (
                        <motion.div
                            key={pdf.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="bg-gradient-to-b from-white/10 to-transparent border border-white/10 rounded-2xl p-6 hover:-translate-y-2 transition-transform duration-300 group"
                        >
                            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                <FaFilePdf />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2 leading-tight">{pdf.title}</h3>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                                <div className="flex items-center gap-1">
                                    <FaTags className="text-trading-blue" />
                                    {pdf.price}
                                </div>
                                <div>•</div>
                                <div>{pdf.pages} Pages</div>
                            </div>
                            
                            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium border border-white/5 transition-colors group-hover:border-white/20">
                                <FaDownload />
                                Buy Now
                            </button>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/pdfs" className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-trading-blue text-trading-blue hover:bg-trading-blue hover:text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105">
                        <FaFilePdf /> View All PDFs
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PdfsSection;
