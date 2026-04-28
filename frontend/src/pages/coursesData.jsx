import { FaGraduationCap, FaChartLine, FaCrown } from 'react-icons/fa6';

const getMockContent = (title) => {
    const cleanTitle = title.split('. ')[1] || title;
    return [
        { type: 'text', content: `Welcome to the lesson on ${cleanTitle}. In this comprehensive breakdown, we will dive deep into the mechanics of this concept and how financial institutions utilize it to deliver price.` },
        { type: 'image', url: `https://placehold.co/800x400/0d1117/00c896?text=${cleanTitle.replace(/ /g, '+')}` },
        { type: 'text', content: `Understanding the nuances of ${cleanTitle} is critical for your long-term success. Notice in the chart example above how price reacts exactly at the anticipated levels. This is not a coincidence—this is the algorithmic delivery of price in the foreign exchange market.\n\nInstitutional traders do not use retail indicators; they use raw price action, liquidity, and time. By studying this concept, you are aligning your perspective with smart money.` },
        { type: 'text', content: `Key Takeaways:\n• Always wait for higher timeframe confirmation.\n• Identify liquidity pools before execution.\n• Manage your risk strictly; capital preservation is the holy grail.` }
    ];
};

export const levels = [
    {
        id: 'beginner',
        title: 'Beginner Level',
        icon: <FaGraduationCap className="text-3xl text-emerald-400" />,
        description: 'Build a solid foundation. Perfect for complete beginners.',
        bgGradient: 'from-emerald-500/20 to-emerald-900/20',
        border: 'border-emerald-500/30',
        activeBorder: 'border-emerald-500',
        lessons: [
            {
                title: '1. Introduction to Forex Trading',
                desc: 'What is the forex market, who trades it, and how it works.',
                content: [
                    // Section 1
                    { type: 'heading', content: '1. What is Forex?' },
                    { type: 'text', content: 'Forex (Foreign Exchange) is the global marketplace for buying and selling currencies. It is the largest and most liquid financial market in the world, trading over $7.5 trillion per day.\n\nUnlike stocks, forex has no central exchange — it operates over-the-counter (OTC), meaning trades happen directly between participants worldwide.' },
                    { type: 'tip', content: 'Simple example: When you travel from Kenya to the USA and exchange KES for USD at the airport — that is forex.' },

                    // Section 2
                    { type: 'heading', content: '2. Currency Pairs — How Forex Works' },
                    { type: 'text', content: 'Currencies are always traded in pairs. You buy one currency while simultaneously selling another.' },
                    { type: 'image', url: 'https://placehold.co/800x400/0d1117/00c896?text=Major+Currency+Pairs+(EUR/USD,+GBP/USD,+USD/JPY)' },
                    { type: 'text', content: 'Three types of pairs:' },
                    { type: 'table', headers: ['Type', 'Example', 'Description'], rows: [
                        ['Major', 'EUR/USD, GBP/USD', 'Most traded, lowest spreads'],
                        ['Minor', 'EUR/GBP, AUD/NZD', 'No USD, still liquid'],
                        ['Exotic', 'USD/KES, EUR/ZAR', 'One emerging market currency']
                    ]},
                    { type: 'text', content: 'The first currency = Base currency (what you buy)\nThe second currency = Quote currency (what you sell)\n\nIf EUR/USD = 1.0870 → 1 Euro buys 1.0870 US Dollars' },

                    // Section 3
                    { type: 'heading', content: '3. Who Trades Forex?' },
                    { type: 'image', url: 'https://placehold.co/800x400/0d1117/00c896?text=Market+Participant+Hierarchy' },
                    { type: 'text', content: 'From largest to smallest:' },
                    { type: 'list', style: 'ordered', items: [
                        'Central Banks — Set interest rates, control money supply (e.g. Federal Reserve, ECB)',
                        'Commercial Banks — Handle the bulk of forex volume (JP Morgan, Citi, HSBC)',
                        'Hedge Funds & Institutions — Large speculative players',
                        'Corporations — Convert currencies for international business',
                        'Retail Traders — Individual traders like you, accessing the market via brokers'
                    ]},
                    { type: 'tip', content: 'Key insight: Retail traders make up only ~5% of volume. The other 95% is institutions — this is why Smart Money Concepts (SMC) matter.' },

                    // Section 4
                    { type: 'heading', content: '4. Forex Trading Sessions' },
                    { type: 'image', url: 'https://placehold.co/800x400/0d1117/00c896?text=4+Trading+Sessions+%26+Overlap+Times' },
                    { type: 'text', content: 'The forex market is open 24 hours a day, 5 days a week across 4 major sessions:' },
                    { type: 'table', headers: ['Session', 'Opens (EAT)', 'Closes (EAT)', 'Best Pairs'], rows: [
                        ['Sydney', '00:00', '09:00', 'AUD/USD, NZD/USD'],
                        ['Tokyo', '03:00', '12:00', 'USD/JPY, EUR/JPY'],
                        ['London', '11:00', '20:00', 'GBP/USD, EUR/USD'],
                        ['New York', '16:00', '01:00', 'EUR/USD, USD/CAD']
                    ]},
                    { type: 'tip', content: 'Best time to trade: London–New York overlap (16:00–20:00 EAT) — highest volume and best moves.' },

                    // Section 5
                    { type: 'heading', content: '5. Key Forex Terms Every Trader Must Know' },
                    { type: 'image', url: 'https://placehold.co/800x400/0d1117/00c896?text=Bid+/+Ask+Spread+Diagram' },
                    { type: 'list', style: 'unordered', items: [
                        'Pip — The smallest price movement. For EUR/USD, 1 pip = 0.0001',
                        'Bid — The price the broker buys from you (you sell at this price)',
                        'Ask — The price the broker sells to you (you buy at this price)',
                        'Spread — The difference between Bid and Ask. This is how brokers make money.'
                    ]},
                    { type: 'text', content: 'Example: EUR/USD Bid = 1.08700 | Ask = 1.08712 → Spread = 1.2 pips' },

                    // Section 6
                    { type: 'heading', content: '6. Leverage, Margin & Lot Sizes' },
                    { type: 'image', url: 'https://placehold.co/800x400/0d1117/00c896?text=Leverage+%26+Margin+Explained' },
                    { type: 'text', content: 'Lot Size = How much of a currency you trade:' },
                    { type: 'list', style: 'unordered', items: [
                        '1 Standard Lot = 100,000 units',
                        '1 Mini Lot = 10,000 units',
                        '1 Micro Lot = 1,000 units'
                    ]},
                    { type: 'text', content: 'Leverage = Borrowed capital from your broker. Allows you to control large positions with small capital.\n\nExample: With 1:100 leverage, $100 controls $10,000 worth of currency.\n\nMargin = The deposit required to open a leveraged trade.' },
                    { type: 'warning', content: '⚠️ Leverage amplifies both profits AND losses. Never over-leverage.' },

                    // Section 7
                    { type: 'heading', content: '7. How Profit & Loss Works' },
                    { type: 'text', content: 'If you buy EUR/USD at 1.0850 and it rises to 1.0900:\n• You gained 50 pips\n• On a standard lot, each pip = ~$10 → Profit = $500\n\nIf price drops to 1.0800 instead:\n• You lost 50 pips → Loss = $500' },

                    // Section 8
                    { type: 'heading', content: '8. Why Most Retail Traders Lose' },
                    { type: 'list', style: 'unordered', items: [
                        'Trading without a strategy',
                        'Overleveraging accounts',
                        'Ignoring risk management',
                        'Trading against institutional flow',
                        'Emotional trading (revenge trading, FOMO)'
                    ]},
                    { type: 'tip', content: 'The solution: Learning Smart Money Concepts — understanding what institutions do and trading with them, not against them. That\'s what this course teaches.' },

                    // Lesson Summary
                    { type: 'heading', content: '✅ Lesson Summary' },
                    { type: 'table', headers: ['Concept', 'Key Takeaway'], rows: [
                        ['Forex market', '$7.5T/day, OTC, 24/5'],
                        ['Currency pairs', 'Base/Quote, 3 types'],
                        ['Market players', 'Institutions dominate (95%)'],
                        ['Sessions', 'London–NY overlap is best'],
                        ['Pip/Spread', 'How price moves & costs'],
                        ['Leverage', 'Powerful but risky'],
                        ['Why traders lose', 'No edge, no discipline']
                    ]}
                ]
            },
            { title: '2. Pips, Lots, & Leverage', desc: 'Understanding the basic mathematical concepts of trading.' },
            { title: '3. Candlestick Anatomy', desc: 'How to read price action through Japanese candlesticks.' },
            { title: '4. Support & Resistance', desc: 'Identifying basic floor and ceiling levels in the market.' },
            { title: '5. Risk Management 101', desc: 'How to protect your capital and calculate lot sizes.' }
        ].map(l => ({ ...l, content: l.content || getMockContent(l.title) }))
    },
    {
        id: 'intermediate',
        title: 'Intermediate Level',
        icon: <FaChartLine className="text-3xl text-blue-400" />,
        description: 'Understand market movements and transition to smart money concepts.',
        bgGradient: 'from-blue-500/20 to-blue-900/20',
        border: 'border-blue-500/30',
        activeBorder: 'border-blue-500',
        lessons: [
            { title: '1. Advanced Market Structure', desc: 'Identifying higher highs, higher lows, and complex pullbacks.' },
            { title: '2. Break of Structure (BOS)', desc: 'How to confirm trend continuations.' },
            { title: '3. Change of Character (CHoCH)', desc: 'Spotting early signs of trend reversals.' },
            { title: '4. Supply & Demand Zones', desc: 'Drawing high-probability institutional zones.' },
            { title: '5. Liquidity Concepts', desc: 'Understanding where retail stop losses are trapped.' }
        ].map(l => ({ ...l, content: getMockContent(l.title) }))
    },
    {
        id: 'advanced',
        title: 'Advanced Level',
        icon: <FaCrown className="text-3xl text-purple-400" />,
        description: 'Trade like the banks. Master the complete Smart Money Concepts strategy.',
        bgGradient: 'from-purple-500/20 to-purple-900/20',
        border: 'border-purple-500/30',
        activeBorder: 'border-purple-500',
        lessons: [
            { title: '1. Order Blocks & Mitigation', desc: 'Pinpointing exact institutional entry footprints.' },
            { title: '2. Fair Value Gaps (FVG)', desc: 'Trading price imbalances and market inefficiencies.' },
            { title: '3. Inducement (IDM)', desc: 'Avoiding early traps and trading the true move.' },
            { title: '4. Time & Price (Killzones)', desc: 'Trading specific sessions for highest probability.' },
            { title: '5. The Complete Strategy', desc: 'Putting it all together for mechanical execution.' }
        ].map(l => ({ ...l, content: getMockContent(l.title) }))
    }
];
