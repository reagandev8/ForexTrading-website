import { motion } from 'framer-motion';

const MarketSection = () => {
    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Live Market Overview</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">Stay updated with real-time price action on major forex pairs, indices, and commodities.</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/60 border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-4 backdrop-blur-md"
                >
                    {/* Ticker Widget */}
                    <div className="mb-6 rounded-lg overflow-hidden border border-white/5 bg-[#131722]">
                        <iframe 
                            scrolling="no" 
                            allowtransparency="true" 
                            frameBorder="0" 
                            src="https://www.tradingview-widget.com/embed-widget/tickers/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22FX%3AEURUSD%22%2C%22title%22%3A%22EUR%2FUSD%22%7D%2C%7B%22proName%22%3A%22FX%3AGBPUSD%22%2C%22title%22%3A%22GBP%2FUSD%22%7D%2C%7B%22proName%22%3A%22FX%3AUSDJPY%22%2C%22title%22%3A%22USD%2FJPY%22%7D%2C%7B%22proName%22%3A%22OANDA%3AXAUUSD%22%2C%22title%22%3A%22Gold%22%7D%2C%7B%22proName%22%3A%22FX_IDC%3AUSDZAR%22%2C%22title%22%3A%22USD%2FZAR%22%7D%5D%2C%22colorTheme%22%3A%22dark%22%2C%22isTransparent%22%3Atrue%2C%22showSymbolLogo%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A104%2C%22utm_source%22%3A%22localhost%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22tickers%22%2C%22page-uri%22%3A%22localhost%22%7D" 
                            style={{ boxSizing: "border-box", height: "104px", width: "100%" }}
                            title="Market Ticker"
                        ></iframe>
                    </div>

                    {/* Chart Widget Placeholder / Iframe */}
                    <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden border border-white/5 bg-[#131722]">
                        <iframe 
                            src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=FX%3AEURUSD&interval=H1&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=131722&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=FX%3AEURUSD" 
                            width="100%" 
                            height="100%" 
                            frameBorder="0" 
                            allowtransparency="true" 
                            scrolling="no"
                            title="Interactive Chart"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MarketSection;
