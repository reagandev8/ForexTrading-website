import { useState, useRef } from "react";

const concepts = [
    {
        title: "Order Blocks",
        tag: "Structure", tagColor: "#00c896", tagBg: "#00c89620", ac: "#00c896",
        desc: "The Order Block (OB) represents the final institutional footprint before a significant market displacement. It is the last bearish candle prior to a strong bullish impulse (or vice versa) that breaks market structure. Institutions accumulate massive positions here. When price eventually returns to this unmitigated zone, it typically triggers remaining limit orders, causing a sharp, high-probability continuation in the original direction."
    },
    {
        title: "Fair Value Gap",
        tag: "Imbalance", tagColor: "#3b9eff", tagBg: "#3b9eff20", ac: "#3b9eff",
        desc: "A Fair Value Gap (FVG) or Imbalance occurs during a rapid price displacement where a 3-candle sequence leaves a gap between the first candle's high and the third candle's low. This gap represents inefficient pricing and a lack of liquidity. Algorithms are magnetically drawn back to these voids to 'fill' the gap and restore market equilibrium before continuing the overarching trend."
    },
    {
        title: "Break of Structure",
        tag: "Structure", tagColor: "#f59e0b", tagBg: "#f59e0b20", ac: "#f59e0b",
        desc: "A Break of Structure (BOS) occurs when price successfully closes beyond a significant prior swing high (in an uptrend) or swing low (in a downtrend). It confirms the continuation of the current institutional trend. Unlike a simple wick sweep, a true BOS requires a solid body closure, signaling that smart money is aggressively pushing price into new territories."
    },
    {
        title: "Change of Character",
        tag: "Reversal", tagColor: "#e879f9", tagBg: "#e879f920", ac: "#e879f9",
        desc: "The Change of Character (CHoCH) is the earliest indication of a potential trend reversal. While a BOS signals continuation, a CHoCH occurs when price breaks the last valid structural point in the opposite direction. It highlights a shift in institutional order flow—from accumulation to distribution (or vice versa)—allowing traders to catch massive reversals at their inception."
    },
    {
        title: "Liquidity Sweep",
        tag: "Liquidity", tagColor: "#f87171", tagBg: "#f8717120", ac: "#f87171",
        desc: "Retail traders often place their stop losses directly above equal highs or below equal lows. Institutions view these areas as highly liquid pools. A Liquidity Sweep (or Stop Run) happens when price intentionally spikes through these obvious levels to absorb the clustered stop-loss orders. Once this liquidity is grabbed, smart money rapidly reverses the price to execute their true directional bias."
    },
    {
        title: "Premium & Discount",
        tag: "Zones", tagColor: "#00c896", tagBg: "#00c89620", ac: "#00c896",
        desc: "The Premium & Discount paradigm divides a price leg into two halves using the 50% Equilibrium (EQ) level. Institutions heavily rely on this: they sell in Premium (expensive) zones and buy in Discount (cheap) zones. Retail traders often get trapped chasing breakouts at the extremes. Waiting for price to pull back into deep Discount before going long drastically increases trade expectancy."
    },
    {
        title: "Inducement",
        tag: "Manipulation", tagColor: "#fb923c", tagBg: "#fb923c20", ac: "#fb923c",
        desc: "Inducement (IDM) is a short-term structural pullback designed to trick impatient traders into entering the market prematurely. It acts as a decoy. Retail buys the 'early' support, while smart money is simply building liquidity. True institutional entries only happen after this IDM level is swept, grabbing the accumulated stop losses to fuel the actual, sustained move."
    },
    {
        title: "Mitigation Block",
        tag: "Advanced", tagColor: "#a78bfa", tagBg: "#a78bfa20", ac: "#a78bfa",
        desc: "A Mitigation Block forms when a previous Order Block is invalidated (price cuts straight through it without respecting it). Instead of reversing, price later returns to this 'failed' zone to mitigate the loss of the trapped institutional orders. It essentially acts like a sophisticated flip zone (support turning into resistance), providing high-conviction, counter-trend entry setups."
    },
];

export default function SMCCarousel() {
    const [active, setActive] = useState(0);
    const trackRef = useRef(null);
    const GAP = 16;

    const scrollTo = (i) => {
        if (!trackRef.current) return;
        const card = trackRef.current.children[i];
        if (card) {
            trackRef.current.scrollTo({ left: card.offsetLeft - trackRef.current.offsetLeft - 24, behavior: "smooth" });
        }
    };

    const go = (dir) => {
        const next = active + dir;
        if (next < 0 || next >= concepts.length) return;
        setActive(next);
        scrollTo(next);
    };

    return (
        <section className="smc-carousel-section" style={{ background: "transparent", padding: "60px 0 32px", overflow: "hidden" }}>
            <div style={{ textAlign: "center", marginBottom: 32, padding: "0 20px" }}>
                <span style={{ display: "inline-block", padding: "6px 16px", borderRadius: 30, background: "#00c89615", border: "1px solid #00c89640", color: "#00c896", fontSize: 13, fontWeight: 600, marginBottom: 16, letterSpacing: "0.5px" }}>
                    Smart Money Concepts
                </span>
                <h2 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                    Master Every <span style={{ color: "#00c896" }}>SMC Concept</span>
                </h2>
                <p style={{ color: "#9ca3af", fontSize: "clamp(14px, 2vw, 16px)", marginTop: 12, maxWidth: 500, marginInline: "auto" }}>.</p>
            </div>

            <div style={{ position: "relative", maxWidth: "1000px", margin: "0 auto" }}>
                <button
                    onClick={() => go(-1)}
                    disabled={active === 0}
                    className="hidden sm:flex items-center justify-center absolute z-10"
                    style={{ left: -20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(17, 24, 39, 0.9)", backdropFilter: "blur(4px)", border: "1px solid #374151", color: active === 0 ? "#4b5563" : "#fff", fontSize: 24, cursor: active === 0 ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                >
                    ‹
                </button>

                <div
                    ref={trackRef}
                    onScroll={(e) => {
                        if (!trackRef.current) return;
                        const scrollLeft = e.target.scrollLeft;
                        const containerWidth = e.target.offsetWidth;
                        const centerPosition = scrollLeft + containerWidth / 2;

                        let closestIndex = active;
                        let minDistance = Infinity;

                        Array.from(trackRef.current.children).forEach((child, index) => {
                            const childCenter = child.offsetLeft - e.target.offsetLeft + child.offsetWidth / 2;
                            const distance = Math.abs(childCenter - centerPosition);
                            if (distance < minDistance) {
                                minDistance = distance;
                                closestIndex = index;
                            }
                        });

                        if (closestIndex !== active) {
                            setActive(closestIndex);
                        }
                    }}
                    style={{
                        display: "flex",
                        gap: GAP,
                        overflowX: "auto",
                        scrollSnapType: "x mandatory",
                        scrollbarWidth: "none",
                        padding: "10px 24px 30px",
                        WebkitOverflowScrolling: "touch",
                        scrollBehavior: "smooth"
                    }}
                    className="no-scrollbar"
                >
                    {concepts.map((c, i) => (
                        <div
                            key={i}
                            onClick={() => { setActive(i); scrollTo(i); }}
                            style={{
                                width: "280px",
                                maxWidth: "80vw",
                                scrollSnapAlign: "center",
                                background: i === active ? "#111827" : "#0d1117",
                                border: `1px solid ${i === active ? c.ac : "#1f2937"}`,
                                borderRadius: 16,
                                padding: "20px 16px",
                                cursor: "pointer",
                                flexShrink: 0,
                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                transform: i === active ? "scale(1) translateY(-4px)" : "scale(0.95) translateY(0)",
                                opacity: i === active ? 1 : 0.6,
                                boxShadow: i === active ? `0 20px 40px -15px ${c.ac}30` : "none"
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                <span style={{ display: "inline-block", padding: "4px 10px", borderRadius: 20, background: c.tagBg, color: c.tagColor, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px" }}>{c.tag}</span>
                            </div>
                            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
                            <div style={{ color: "#9ca3af", fontSize: 13, lineHeight: 1.5, marginBottom: 0, minHeight: 160 }}>{c.desc}</div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => go(1)}
                    disabled={active === concepts.length - 1}
                    className="hidden sm:flex items-center justify-center absolute z-10"
                    style={{ right: -20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(17, 24, 39, 0.9)", backdropFilter: "blur(4px)", border: "1px solid #374151", color: active === concepts.length - 1 ? "#4b5563" : "#fff", fontSize: 24, cursor: active === concepts.length - 1 ? "not-allowed" : "pointer", transition: "all 0.2s" }}
                >
                    ›
                </button>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
                {concepts.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => { setActive(i); scrollTo(i); }}
                        style={{
                            height: 6,
                            width: i === active ? 32 : 8,
                            borderRadius: 6,
                            background: i === active ? c.ac : "#374151",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                            padding: 0
                        }}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}} />
        </section>
    );
}