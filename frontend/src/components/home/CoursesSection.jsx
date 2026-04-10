import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaClock, FaStar } from 'react-icons/fa6';

const CoursesSection = () => {
    const courses = [
        {
            id: 1,
            title: "Forex Mastery Bootcamp",
            level: "Beginner to Advanced",
            price: "$199",
            image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800",
            duration: "8 Weeks",
            rating: 4.9
        },
        {
            id: 2,
            title: "Smart Money Concepts",
            level: "Advanced",
            price: "$149",
            image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800",
            duration: "4 Weeks",
            rating: 5.0
        },
        {
            id: 3,
            title: "Price Action Strategies",
            level: "Intermediate",
            price: "$99",
            image: "https://images.unsplash.com/photo-1590283603385-18ff38540843?auto=format&fit=crop&q=80&w=800",
            duration: "6 Weeks",
            rating: 4.8
        }
    ];

    return (
        <section className="py-20 relative bg-black/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Courses</h2>
                        <p className="text-gray-400 max-w-xl">Accelerate your learning curve with our structured, step-by-step trading courses designed for all levels.</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/courses" className="text-trading-green hover:text-emerald-400 font-semibold group flex items-center gap-2">
                            View All Courses 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-trading-blue/50 transition-all group"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10"></div>
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white font-semibold border border-white/10">
                                    {course.price}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs font-medium text-trading-blue mb-3 bg-trading-blue/10 w-fit px-3 py-1 rounded-full">
                                    <FaGraduationCap />
                                    {course.level}
                                </div>
                                
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-trading-green transition-colors">{course.title}</h3>
                                
                                <div className="flex items-center justify-between text-sm text-gray-400 mb-6 pb-6 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <FaClock />
                                        {course.duration}
                                    </div>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <FaStar />
                                        <span className="text-gray-300">{course.rating}</span>
                                    </div>
                                </div>
                                
                                <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-trading-green text-white font-semibold transition-colors">
                                    Enroll Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;
