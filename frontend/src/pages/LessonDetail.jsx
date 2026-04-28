import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCirclePlay, FaArrowLeft, FaChevronRight, FaChevronLeft, FaGraduationCap, FaChartLine, FaCrown } from 'react-icons/fa6';
import { levels } from './coursesData';

const LessonDetail = () => {
    const { levelId, lessonIndex } = useParams();
    const navigate = useNavigate();
    const idx = parseInt(lessonIndex, 10);

    // Find the level and lesson
    const level = levels.find(l => l.id === levelId);
    if (!level || isNaN(idx) || idx < 0 || idx >= level.lessons.length) {
        return (
            <div className="min-h-screen pt-24 pb-20 bg-[#0a0e17] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Lesson Not Found</h1>
                    <p className="text-gray-400 mb-8">The lesson you're looking for doesn't exist.</p>
                    <Link to="/courses" className="bg-gradient-to-r from-trading-green to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-emerald-500/20 transition-all">
                        ← Back to Curriculum
                    </Link>
                </div>
            </div>
        );
    }

    const lesson = level.lessons[idx];
    const cleanTitle = lesson.title.split('. ')[1] || lesson.title;

    // Determine level color scheme
    const colorMap = {
        beginner: { accent: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-600', hoverGradient: 'hover:from-emerald-400 hover:to-emerald-500', shadow: 'shadow-emerald-500/20', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', tag: 'Beginner' },
        intermediate: { accent: 'text-blue-400', gradient: 'from-blue-500 to-blue-600', hoverGradient: 'hover:from-blue-400 hover:to-blue-500', shadow: 'shadow-blue-500/20', border: 'border-blue-500/30', bg: 'bg-blue-500/10', tag: 'Intermediate' },
        advanced: { accent: 'text-purple-400', gradient: 'from-purple-500 to-purple-600', hoverGradient: 'hover:from-purple-400 hover:to-purple-500', shadow: 'shadow-purple-500/20', border: 'border-purple-500/30', bg: 'bg-purple-500/10', tag: 'Advanced' },
    };
    const colors = colorMap[levelId] || colorMap.beginner;

    const iconMap = {
        beginner: <FaGraduationCap className={`text-lg ${colors.accent}`} />,
        intermediate: <FaChartLine className={`text-lg ${colors.accent}`} />,
        advanced: <FaCrown className={`text-lg ${colors.accent}`} />,
    };

    const prevLesson = idx > 0 ? idx - 1 : null;
    const nextLesson = idx < level.lessons.length - 1 ? idx + 1 : null;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#0a0e17]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                        <Link to="/courses" className="hover:text-trading-green transition-colors">Curriculum</Link>
                        <span>/</span>
                        <span className={colors.accent}>{level.title}</span>
                        <span>/</span>
                        <span className="text-gray-300">{cleanTitle}</span>
                    </nav>
                </motion.div>

                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => navigate('/courses')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Curriculum</span>
                    </button>
                </motion.div>

                {/* Lesson Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`rounded-2xl border ${colors.border} bg-black/40 backdrop-blur-md p-8 md:p-10 mb-10`}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${colors.bg} border ${colors.border}`}>
                            {iconMap[levelId]}
                            <span className={`text-sm font-semibold ${colors.accent}`}>{colors.tag}</span>
                        </div>
                        <span className="text-gray-500 text-sm">Lesson {idx + 1} of {level.lessons.length}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 flex items-center gap-4">
                        <FaCirclePlay className={`${colors.accent} flex-shrink-0`} />
                        {cleanTitle}
                    </h1>
                    <p className="text-gray-400 text-lg">{lesson.desc}</p>
                </motion.div>

                {/* Lesson Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8 mb-12"
                >
                    {lesson.content.map((block, i) => {
                        const animProps = {
                            initial: { opacity: 0, y: 15 },
                            animate: { opacity: 1, y: 0 },
                            transition: { delay: 0.25 + i * 0.05 }
                        };

                        if (block.type === 'heading') {
                            return (
                                <motion.div key={i} {...animProps}>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                                        <span className={`w-1.5 h-8 rounded-full bg-gradient-to-b ${colors.gradient}`}></span>
                                        {block.content}
                                    </h2>
                                </motion.div>
                            );
                        }

                        if (block.type === 'text') {
                            return (
                                <motion.div key={i} {...animProps} className="bg-[#0d1117] border border-white/5 rounded-xl p-6 md:p-8">
                                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                                        {block.content}
                                    </p>
                                </motion.div>
                            );
                        }

                        if (block.type === 'image') {
                            return (
                                <motion.div key={i} {...animProps} className="rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                                    <img src={block.url} alt="Chart Example" className="w-full h-auto object-cover" />
                                </motion.div>
                            );
                        }

                        if (block.type === 'table') {
                            return (
                                <motion.div key={i} {...animProps} className="rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="bg-white/5 border-b border-white/10">
                                                    {block.headers.map((h, hi) => (
                                                        <th key={hi} className={`px-5 py-4 text-sm font-bold uppercase tracking-wider ${colors.accent}`}>{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {block.rows.map((row, ri) => (
                                                    <tr key={ri} className={`border-b border-white/5 ${ri % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-white/5 transition-colors`}>
                                                        {row.map((cell, ci) => (
                                                            <td key={ci} className={`px-5 py-3.5 text-gray-300 ${ci === 0 ? 'font-semibold text-white' : ''}`}>{cell}</td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </motion.div>
                            );
                        }

                        if (block.type === 'list') {
                            const ListTag = block.style === 'ordered' ? 'ol' : 'ul';
                            return (
                                <motion.div key={i} {...animProps} className="bg-[#0d1117] border border-white/5 rounded-xl p-6 md:p-8">
                                    <ListTag className={`space-y-3 ${block.style === 'ordered' ? 'list-none' : 'list-none'}`}>
                                        {block.items.map((item, li) => (
                                            <li key={li} className="flex items-start gap-3 text-gray-300 text-lg leading-relaxed">
                                                {block.style === 'ordered' ? (
                                                    <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-sm font-bold mt-0.5`}>{li + 1}</span>
                                                ) : (
                                                    <span className={`flex-shrink-0 w-2 h-2 rounded-full bg-gradient-to-br ${colors.gradient} mt-2.5`}></span>
                                                )}
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ListTag>
                                </motion.div>
                            );
                        }

                        if (block.type === 'tip') {
                            return (
                                <motion.div key={i} {...animProps} className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6 md:p-8 flex gap-4 items-start">
                                    <span className="text-2xl flex-shrink-0">💡</span>
                                    <p className="text-emerald-200 text-lg leading-relaxed">{block.content}</p>
                                </motion.div>
                            );
                        }

                        if (block.type === 'warning') {
                            return (
                                <motion.div key={i} {...animProps} className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 md:p-8 flex gap-4 items-start">
                                    <span className="text-2xl flex-shrink-0">🚨</span>
                                    <p className="text-red-200 text-lg leading-relaxed font-semibold">{block.content}</p>
                                </motion.div>
                            );
                        }

                        return null;
                    })}
                </motion.div>

                {/* Navigation Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`rounded-2xl border ${colors.border} bg-black/40 backdrop-blur-md p-6 md:p-8`}
                >
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {prevLesson !== null ? (
                            <Link
                                to={`/courses/${levelId}/${prevLesson}`}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group order-2 sm:order-1"
                            >
                                <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                                <div className="text-left">
                                    <div className="text-xs text-gray-500">Previous Lesson</div>
                                    <div className="font-semibold">{level.lessons[prevLesson].title.split('. ')[1]}</div>
                                </div>
                            </Link>
                        ) : (
                            <div className="order-2 sm:order-1"></div>
                        )}

                        <Link
                            to="/courses"
                            className={`bg-gradient-to-r ${colors.gradient} ${colors.hoverGradient} text-white px-8 py-3 rounded-xl font-bold shadow-lg ${colors.shadow} transition-all transform hover:-translate-y-1 order-1 sm:order-2`}
                        >
                            All Lessons
                        </Link>

                        {nextLesson !== null ? (
                            <Link
                                to={`/courses/${levelId}/${nextLesson}`}
                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group order-3"
                            >
                                <div className="text-right">
                                    <div className="text-xs text-gray-500">Next Lesson</div>
                                    <div className="font-semibold">{level.lessons[nextLesson].title.split('. ')[1]}</div>
                                </div>
                                <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        ) : (
                            <div className="order-3"></div>
                        )}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default LessonDetail;
