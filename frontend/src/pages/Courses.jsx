import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const Courses = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/products`);
                const courseProducts = data.filter(item => item.type === 'course');
                setCourses(courseProducts);
            } catch (error) {
                toast.error('Failed to load courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleBuy = async (course) => {
        if (!userInfo) {
            toast.info('Please log in to enroll in courses');
            navigate('/login');
            return;
        }

        try {
            const priceVal = parseFloat(course.price);
            const { data } = await axios.post(
                `${API_URL}/api/payments/create-checkout-session`,
                {
                    orderItems: [{ name: course.title, price: priceVal, qty: 1 }]
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
    if (loading) return <div className="text-center text-white py-20 text-2xl font-bold animate-pulse">Loading courses...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4">Premium Trading Courses</h1>
                <p className="text-gray-400">Step-by-step video lessons to master the forex market.</p>
            </motion.div>

            {courses.length === 0 ? (
                <div className="text-center text-gray-500 py-10">No courses available at the moment.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course, idx) => {
                        const bgGradient = idx % 3 === 0 ? 'from-blue-500 to-trading-blue' : idx % 3 === 1 ? 'from-green-500 to-trading-green' : 'from-purple-500 to-purple-800';
                        return (
                            <motion.div
                                key={course._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-2xl overflow-hidden glass hover:scale-105 transition-transform duration-300`}
                            >
                                <div className={`h-48 bg-gradient-to-br ${bgGradient} flex items-center justify-center`}>
                                    <span className="text-white text-xl font-bold opacity-80 capitalize">{course.type}</span>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                                    <div className="flex justify-between items-center mt-6">
                                        <span className="text-2xl font-bold text-trading-green">${course.price}</span>
                                        <button onClick={() => handleBuy(course)} className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors">
                                            Enroll
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Courses;
