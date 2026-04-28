import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaCirclePlay, FaChevronRight } from 'react-icons/fa6';
import { levels } from './coursesData';

const Courses = () => {
    const [activeLevel, setActiveLevel] = useState(null);

    const toggleLevel = (id) => {
        if (activeLevel === id) {
            setActiveLevel(null);
        } else {
            setActiveLevel(id);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#0a0e17]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                        Trading <span className="text-transparent bg-clip-text bg-gradient-to-r from-trading-green to-trading-blue">Curriculum</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Follow our structured learning path. From understanding the basics to mastering advanced Smart Money Concepts. Select a level below to explore the lessons.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {levels.map((level, idx) => {
                        const isActive = activeLevel === level.id;
                        return (
                            <motion.div
                                key={level.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isActive ? level.activeBorder : level.border} bg-black/40 backdrop-blur-md`}
                            >
                                <button
                                    onClick={() => toggleLevel(level.id)}
                                    className={`w-full flex items-center justify-between p-6 md:p-8 bg-gradient-to-r ${level.bgGradient} hover:opacity-90 transition-opacity`}
                                >
                                    <div className="flex items-center gap-6 text-left">
                                        <div className="w-16 h-16 rounded-xl bg-black/50 flex items-center justify-center border border-white/10 flex-shrink-0 shadow-xl">
                                            {level.icon}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-2">{level.title}</h2>
                                            <p className="text-gray-300 text-sm md:text-base">{level.description}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isActive ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="hidden sm:flex w-10 h-10 rounded-full bg-white/10 items-center justify-center flex-shrink-0 ml-4"
                                    >
                                        <FaChevronDown className="text-white" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:p-8 bg-[#0d1117] border-t border-white/5 space-y-4">
                                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                                    <FaCirclePlay className="text-trading-green" />
                                                    Curriculum Lessons:
                                                </h3>
                                                {level.lessons.map((lesson, lIdx) => (
                                                    <Link
                                                        key={lIdx}
                                                        to={`/courses/${level.id}/${lIdx}`}
                                                        className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex gap-4 items-center"
                                                    >
                                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:border-trading-green transition-colors text-sm font-bold">
                                                            {lIdx + 1}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className="text-white font-bold mb-1 group-hover:text-trading-green transition-colors">{lesson.title.split('. ')[1]}</h4>
                                                            <p className="text-gray-400 text-sm">{lesson.desc}</p>
                                                        </div>
                                                        <FaChevronRight className="text-gray-600 group-hover:text-trading-green transition-colors flex-shrink-0" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
};

export default Courses;
