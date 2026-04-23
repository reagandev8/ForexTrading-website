import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import PayPalButton from '../components/PayPalButton';

const Pdfs = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/products`);
                const pdfProducts = data.filter(item => item.type === 'pdf');
                setPdfs(pdfProducts);
            } catch (error) {
                toast.error('Failed to load PDF Store');
            } finally {
                setLoading(false);
            }
        };
        fetchPdfs();
    }, []);

    // Payment via PayPalButton

    if (loading) return <div className="text-center text-white py-20 text-2xl font-bold animate-pulse">Loading PDFs...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-extrabold text-center mb-12">Digital PDF Store</h1>

            {pdfs.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No PDFs available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pdfs.map((pdf, i) => (
                        <motion.div
                            key={pdf._id}
                            whileHover={{ y: -10 }}
                            className="glass p-5 rounded-xl flex flex-col items-center text-center"
                        >
                            <div className="w-full h-40 bg-gray-800 rounded mb-4 flex items-center justify-center border border-gray-700">
                                <span className="text-gray-500">{pdf.imageUrl ? <img src={pdf.imageUrl} alt={pdf.title} className="max-h-full object-contain" /> : `PDF Cover`}</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{pdf.title}</h3>
                            <p className="text-trading-green font-bold text-lg mt-auto">${pdf.price}</p>
                            {!userInfo ? (
                                <button onClick={() => { toast.info('Please log in to buy PDFs'); navigate('/login'); }} className="mt-4 w-full bg-trading-blue hover:bg-blue-600 text-white font-bold py-2 rounded transition-colors shadow-lg">
                                    Login to Buy
                                </button>
                            ) : (
                                <div className="w-full mt-2">
                                    <PayPalButton product={pdf} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Pdfs;
