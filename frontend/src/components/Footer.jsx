import { Link } from 'react-router-dom';
import { FaTelegram, FaFacebook, FaInstagram, FaYoutube, FaChartLine } from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-[#0a0e17] border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 text-xl font-bold">
                            <div className="w-8 h-8 bg-trading-green rounded-lg flex items-center justify-center">
                                <FaChartLine className="text-white" />
                            </div>
                            <span className="text-white">Frank<span className="text-trading-green">Fx</span>Trading</span>
                        </Link>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Empowering technical traders globally. Join the movement and master the markets with professional education and consistent signals.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="https://t.me/Frank_fx_signals" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-trading-blue hover:text-white hover:border-trading-blue transition-all">
                                <FaTelegram className="text-xl" />
                            </a>
                            <a href="https://www.youtube.com/@frank.fx.trading" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-trading-blue hover:text-white hover:border-trading-blue transition-all">
                                <FaYoutube className="text-xl" />
                            </a>
                            <a href="https://www.facebook.com/official.frankfxtrading" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-trading-blue hover:text-white hover:border-trading-blue transition-all">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="https://www.instagram.com/official.frankfxtrading" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-trading-green hover:text-white hover:border-trading-green transition-all">
                                <FaInstagram className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><Link to="/courses" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Our Courses</Link></li>
                            <li><Link to="/pdfs" className="text-gray-400 hover:text-trading-green transition-colors text-sm">PDF Store</Link></li>
                            <li><Link to="/vip" className="text-gray-400 hover:text-trading-green transition-colors text-sm">VIP Signals</Link></li>
                            <li><Link to="/dashboard" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Student Portal</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-400 hover:text-trading-green transition-colors text-sm">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Contact Support</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Discord Community</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">Legal</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Refund Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-trading-green transition-colors text-sm">Risk Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} FrankFxTrading. All rights reserved.
                        Trading foreign exchange on margin carries a high level of risk and may not be suitable for all investors.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
