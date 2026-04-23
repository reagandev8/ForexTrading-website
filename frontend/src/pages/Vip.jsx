import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaStar, FaChartLine, FaShieldAlt, FaHeadset, FaTelegramPlane, FaChevronDown, FaQuoteLeft } from 'react-icons/fa';
import PayPalButton from '../components/PayPalButton';

const faqs = [
    {
        question: "Is this beginner friendly?",
        answer: "Absolutely! We provide clear, step-by-step instructions on how to enter alerts, manage your lot sizes, and secure profits."
    },
    {
        question: "What is your typical win rate?",
        answer: "We average an 85-90% win rate monthly. Quality over quantity is our primary focus to ensure steady account growth."
    },
    {
        question: "How do I receive the signals?",
        answer: "All signals, analysis, and live updates are delivered instantly through our private VIP Telegram channel."
    },
    {
        question: "Can I cancel anytime?",
        answer: "Yes, there are no long-term contracts. You can easily manage your subscription and cancel anytime through your dashboard."
    }
];

const features = [
    { icon: FaChartLine, title: "Daily High-Probability Signals", desc: "3-5 premium setups daily with precise entry, risk, and take-profit targets." },
    { icon: FaTelegramPlane, title: "Private Telegram Access", desc: "Get real-time market updates, trade management tips, and community chat." },
    { icon: FaShieldAlt, title: "Risk Management Guidance", desc: "Learn to properly size your trades and protect your capital to sustain long term profitability." },
    { icon: FaStar, title: "Live Trading Sessions", desc: "Follow along on weekly live webinars where we break down the charts in real-time." },
    { icon: FaHeadset, title: "24/7 Support", desc: "Direct access to our experienced mentors to answer questions and review your trades." }
];

const testimonials = [
    { name: "Alex M.", profit: "+$4,200 This Month", text: "The accuracy is insane. I was struggling for months before joining the VIP team. My account is finally growing steadily." },
    { name: "Sarah K.", profit: "Funded $100k Account", text: "Passed my prop firm challenge using only their signals and risk management advice. Best investment I've made!" },
    { name: "James D.", profit: "+15% in 2 Weeks", text: "Straight to the point setups without the fluff. Highly recommend it to anyone serious about trading." },
];

const Vip = () => {
    const { userInfo } = useContext(UserContext);
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    // Payment via PayPalButton

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="bg-[#0f172a] text-white min-h-screen font-sans selection:bg-yellow-500 selection:text-black">
            {/* 1. HERO SECTION */}
            <section className="relative px-4 py-24 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 font-semibold mb-6 text-sm tracking-widest uppercase"
                    >
                        Premium Mentorship & Signals
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 mb-6 drop-shadow-sm leading-tight"
                    >
                        Join an Elite Forex Trading Community That Wins Consistently
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
                    >
                        Stop trading alone. Get highly accurate daily signals, live market breakdowns, and direct mentorship from 6-figure funded traders.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button
                            onClick={() => {
                                document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black text-lg font-extrabold py-4 px-10 rounded-full transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:shadow-[0_0_30px_rgba(234,179,8,0.6)] hover:-translate-y-1"
                        >
                            Start Winning Today
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* 2. INSTANT SOCIAL PROOF STATS */}
            {/*   <section className="py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-md">
                <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="p-4 flex flex-col items-center justify-center">
                        <div className="text-4xl lg:text-5xl font-black text-yellow-500 mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">5,000+</div>
                        <div className="text-gray-400 font-bold uppercase tracking-wider text-sm flex items-center"><FaStar className="mr-2 text-yellow-500"/> Traders Joined</div>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center">
                        <div className="text-4xl lg:text-5xl font-black text-yellow-500 mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">90%</div>
                        <div className="text-gray-400 font-bold uppercase tracking-wider text-sm flex items-center"><FaChartLine className="mr-2 text-yellow-500"/> Average Win Rate</div>
                    </div>
                    <div className="p-4 flex flex-col items-center justify-center">
                        <div className="text-4xl lg:text-5xl font-black text-yellow-500 mb-2 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">1,000+</div>
                        <div className="text-gray-400 font-bold uppercase tracking-wider text-sm flex items-center"><FaTelegramPlane className="mr-2 text-yellow-500"/> Signals Delivered</div>
                    </div>
                </div>
            </section>
*/}
            {/* 3. FEATURES SECTION */}
            <section className="py-24 px-4 max-w-7xl mx-auto relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need To <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Succeed</span></h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">Our VIP membership includes all the premium tools, education, and alerts to take your trading to the next level.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="bg-[#1e293b]/50 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:border-yellow-500/50 hover:bg-[#1e293b] transition-all group shadow-xl"
                        >
                            <div className="w-14 h-14 bg-yellow-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-colors">
                                <feature.icon className="text-3xl text-yellow-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. RESULTS / PROOF SECTION */}
            <section className="py-24 bg-white/[0.01] px-4 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Real Members. <span className="text-yellow-500">Real Results.</span></h2>
                        <p className="text-gray-400 text-lg">Don't just take our word for it. See what our community is achieving.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {testimonials.map((testi, i) => (
                            <motion.div whileHover={{ scale: 1.02 }} key={i} className="bg-[#1e293b] p-8 rounded-2xl border border-white/5 shadow-2xl relative">
                                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-white/5" />
                                <div className="flex text-yellow-500 text-sm mb-6 space-x-1">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <p className="text-gray-300 italic mb-8 relative z-10 text-lg">"{testi.text}"</p>
                                <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold">
                                            {testi.name.charAt(0)}
                                        </div>
                                        <span className="font-bold text-white">{testi.name}</span>
                                    </div>
                                    <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">{testi.profit}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Placeholder for real screenshots 
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="aspect-[9/16] bg-gradient-to-t from-[#0f172a] to-[#1e293b] rounded-2xl border border-white/10 flex items-center justify-center flex-col p-4 text-center hover:border-yellow-500/30 transition-colors shadow-lg overflow-hidden relative group">
                                <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay group-hover:bg-blue-500/10 transition-colors"></div>
                                <FaChartLine className="text-4xl text-gray-600 mb-3 group-hover:text-yellow-500/50 transition-colors" />
                                <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-300 transition-colors">Client Profit Screenshot</span>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-t from-green-500/20 to-transparent blur-xl rounded-full"></div>
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>

            {/* 4. PRICING SECTION */}
            <section id="pricing-section" className="py-24 px-4 max-w-5xl mx-auto scroll-m-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your <span className="text-yellow-500">Edge</span></h2>
                    <p className="text-gray-400 text-lg">Unlock your trading potential for less than the cost of a blown trade.</p>
                </div>

                <div className="max-w-lg mx-auto">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-[2rem] p-[2px] relative shadow-[0_0_50px_rgba(234,179,8,0.15)]"
                    >
                        <div className="absolute top-0 right-0 p-px w-full h-full bg-gradient-to-b from-yellow-500 to-yellow-600/30 rounded-[2rem] -z-10 pointer-events-none"></div>

                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-2 rounded-full text-sm font-black tracking-widest uppercase shadow-xl border border-yellow-300/50">
                            Most Popular
                        </div>

                        <div className="bg-[#0f172a] rounded-[2rem] p-8 md:p-12 h-full flex flex-col text-center">
                            <div className="mb-8 pt-4 border-b border-white/10 pb-8 relative">
                                <div className="absolute top-0 right-0 -mr-6 -mt-10 bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold flex items-center border border-red-500/20 animate-pulse">
                                    <span className="mr-1">🔥</span> Limited spots available
                                </div>
                                <h3 className="text-2xl font-bold text-gray-300 mb-4">VIP Monthly Pass</h3>
                                <div className="flex items-center justify-center">
                                    <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-600 drop-shadow-sm">$70</span>
                                    <span className="text-xl text-gray-500 ml-2 self-end mb-2 font-medium">/mo</span>
                                </div>
                            </div>

                            <ul className="space-y-6 mb-10 flex-grow text-left">
                                {[
                                    "3-5 High probability signals daily",
                                    "Precise Entry, SL, & TP levels",
                                    "Weekly live webinar & review",
                                    "Exclusive VIP Telegram group",
                                    "Risk & Capital Management plans",
                                    "24/7 Priority Support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="bg-yellow-500/20 p-1 rounded-full mr-4 flex-shrink-0 mt-0.5 border border-yellow-500/30">
                                            <FaCheckCircle className="text-yellow-500 text-sm" />
                                        </div>
                                        <span className="text-gray-300 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {!userInfo ? (
                                <button onClick={() => { toast.info('Please log in to subscribe'); navigate('/login'); }} className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black font-extrabold py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] text-xl hover:scale-[1.02]">
                                    Login to Subscribe
                                </button>
                            ) : (
                                <PayPalButton product={{ _id: 'vip', title: 'VIP Monthly Pass', price: 70 }} />
                            )}

                            <div className="flex items-center justify-center mt-6 text-gray-500 text-sm font-medium">
                                <FaShieldAlt className="mr-2 text-green-500/80 text-lg" /> Secure Checkout & Money-Back Guarantee
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-8 p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center shadow-lg">
                        <h4 className="font-bold text-gray-300 mb-2 flex justify-center items-center"><FaStar className="text-yellow-500 mr-2" /> Unbeatable Value</h4>
                        <p className="text-sm text-gray-400 leading-relaxed">Other programs charge $150+/mo for fewer signals and no live mentorship. We keep prices fair to build a massive community of winners.</p>
                    </div>
                </div>
            </section>

            {/* 6. FAQ SECTION */}
            <section className="py-24 px-4 max-w-4xl mx-auto border-t border-white/5">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked <span className="text-yellow-500">Questions</span></h2>
                    <p className="text-gray-400 text-lg">Everything you need to know before joining.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-[#1e293b]/50 border border-white/10 rounded-2xl overflow-hidden hover:border-yellow-500/30 transition-colors">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full px-8 py-6 text-left flex justify-between items-center bg-white/[0.01] hover:bg-white/[0.03] transition-colors focus:outline-none"
                            >
                                <span className="font-bold text-lg">{faq.question}</span>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openFaq === index ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/5 text-gray-400'}`}>
                                    <FaChevronDown className={`transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                                </div>
                            </button>
                            <AnimatePresence>
                                {openFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="px-8 pb-6 text-gray-400 leading-relaxed text-lg bg-white/[0.01]"
                                    >
                                        <div className="pt-2 border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. FINAL CTA */}
            <section className="py-32 px-4 bg-gradient-to-b from-[#0f172a] to-black text-center relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <h2 className="text-5xl md:text-7xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">Ready to Start Making Consistent Profits?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">Don't miss out on today's setups. Join the VIP group now and get immediate access to our latest signals and analysis.</p>
                    <button
                        onClick={() => {
                            document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black text-2xl font-extrabold py-5 px-14 rounded-full transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] hover:-translate-y-2 inline-block"
                    >
                        Join VIP Now
                    </button>
                </div>
            </section>

        </div>
    );
};

export default Vip;
