"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const FloatingHeart = ({ delay = 0, size = "text-4xl", position = { top: "10%", left: "10%" } }: { delay?: number; size?: string; position?: React.CSSProperties }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 0 }}
        animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.8, 1.05, 1.05, 0.9],
            y: [-10, -220],
        }}
        transition={{
            // much faster animation for a lively effect
            duration: 1.2,
            repeat: Infinity,
            // add ~5s base delay so these per-heart animations start after a pause
            delay,
            ease: "easeInOut"
        }}
        className="absolute pointer-events-none"
        // force red color via currentColor so the material icon picks it up
        style={{ ...(position as React.CSSProperties), color: '#ee2b4b' }}
    >
        {/* Decorative heart emoji (keep as native emoji per user request) */}
        <span className={size} aria-hidden={true}>❤️</span>
    </motion.div>
);

export default function ValentineProposal() {
    const [isAccepted, setIsAccepted] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [noCount, setNoCount] = useState(0);
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.innerWidth <= 640 : false);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 640);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleYes = () => {
        setIsAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#ee2b4b", "#ffccd5", "#ffffff"],
        });
    };

    const handleNoHover = () => {
        if (cardRef.current) {
            const cardRect = cardRef.current.getBoundingClientRect();
            // Restrict movement within the card but increase distance
            const range = 150;
            const newX = (Math.random() - 0.5) * range * 2;
            const newY = (Math.random() - 0.5) * range * 2;

            setNoButtonPos({ x: newX, y: newY });
            setNoCount(prev => prev + 1);
        }
    };

    const noPhrases = [
        "No",
        "Are you sure?",
        "Really sure?",
        "Think again!",
        "Last chance!",
        "Surely not?",
        "You might regret this!",
        "Give it another thought!",
        "Are you absolutely sure?",
        "This could be a mistake!",
        "Have a heart!",
        "Don't be so cold!",
        "Change of heart?",
        "Wouldn't you reconsider?",
        "Is that your final answer?",
        "You're breaking my heart ;(",
    ];

    return (
        <div ref={containerRef} className="relative flex h-screen w-full flex-col items-center justify-center p-4 overflow-hidden romantic-gradient font-display">
            {/* Floating Decoration Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Deterministic positions so server and client markup match */}
                {/* Render fewer, lighter hearts on mobile for performance */}
                {(() => {
                    const heartCount = isMobile ? 8 : 120;
                    return Array.from({ length: heartCount }).map((_, i) => {
                    const det = (n: number, seed = 13) => {
                        const x = Math.sin(n * 127.1 + seed * 0.01) * 43758.5453;
                        return Math.abs(x - Math.floor(x));
                    };
                    const left = (det(i, 11) * 100).toFixed(4);
                    const top = (det(i + 1, 22) * 100).toFixed(4);
                    const sizes = isMobile ? ["text-sm", "text-base", "text-lg"] : ["text-2xl", "text-3xl", "text-4xl", "text-5xl"];
                    const size = sizes[Math.floor(det(i + 2, 33) * sizes.length)];
                    const delay = Number((det(i + 3, 44) * 1.5).toFixed(2));

                    return (
                        <FloatingHeart
                            key={`heart-${i}`}
                            delay={delay}
                            size={size}
                            position={{ left: `${left}%`, top: `${top}%` }}
                        />
                    );
                    });
                })()}
            </div>

            {/* Navigation */}
            <div className="fixed top-0 w-full max-w-[960px] mx-auto z-10">
                <header className="flex items-center justify-between px-6 py-3">
                    <div className="flex items-center gap-2 text-[#181112]">
                        <div className="size-5 text-primary">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="text-base font-bold leading-tight tracking-tight">Special Moments For Someone Special</h2>
                    </div>
                    <button className="flex size-8 items-center justify-center rounded-full bg-white shadow-sm text-primary">
                        <span className="material-symbols-outlined text-lg">favorite</span>
                    </button>
                </header>
            </div>

            {/* Main Content Container */}
            <main className="relative z-10 w-full max-w-[500px] flex flex-col items-center gap-4">
                <AnimatePresence mode="wait">
                    {!isAccepted ? (
                        <motion.div
                            key="ask"
                            ref={cardRef}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="w-full @container"
                        >
                            <div className="flex flex-col items-center justify-center rounded-xl bg-white shadow-xl p-6 border border-primary/5">
                                {/* Main Illustration/Gif */}
                                <div className="w-full aspect-square max-w-[200px] mb-4 relative">
                                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl"></div>
                                    <div
                                        className="relative w-full h-full bg-center bg-no-repeat bg-contain"
                                        style={{ backgroundImage: 'url("/assets/il_1588xN.7566311702_kx8d (1).avif")' }}
                                    />
                                </div>

                                {/* Proposal Text */}
                                <div className="text-center mb-6">
                                    <h1 className="text-[#181112] tracking-tight text-3xl md:text-4xl font-bold leading-tight mb-2">
                                        Will You Please Be My <span className="text-primary">Valentine?</span>
                                    </h1>
                                    <p className="text-[#896168] text-base">
                                        I've been thinking of asking you this for a while...
                                    </p>
                                </div>

                                {/* Button Group */}
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 relative min-h-[80px]">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleYes}
                                        className="group flex min-w-[180px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-12 px-8 bg-primary text-white text-lg font-bold transition-all shadow-md z-20"
                                    >
                                        <span className="truncate">Yes!</span>
                                        <span className="material-symbols-outlined">favorite</span>
                                    </motion.button>

                                    <motion.button
                                        animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                                        onMouseEnter={handleNoHover}
                                        className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-background-light border border-zinc-200 text-[#181112] text-sm font-medium transition-all hover:bg-zinc-100 whitespace-nowrap"
                                    >
                                        <span className="truncate">{noPhrases[Math.min(noCount, noPhrases.length - 1)]}</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="accepted"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center flex flex-col items-center gap-4"
                        >
                            <div className="w-full aspect-square max-w-[200px] relative">
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                                <div
                                    className="relative w-full h-full bg-center bg-no-repeat bg-contain"
                                    style={{ backgroundImage: 'url("/assets/il_1588xN.7637972537_n050.avif")' }}
                                />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary animate-bounce">
                                Yay!!! ❤️
                            </h1>
                            <p className="text-xl text-[#896168]">
                                I knew you'd say yes! I love you ❤️!
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Message */}
                {!isAccepted && (
                    <div className="flex items-center gap-2 text-primary/60 font-medium">
                        
                        <p className="text-[10px] uppercase tracking-widest">...~WN~~Designed with love~~WN~...</p>
                        
                    </div>
                )}
            </main>

            {/* Decorative Card (Stacked behind effect) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[480px] bg-primary/5 rounded-xl -rotate-2 -z-10 hidden lg:block"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[480px] bg-primary/5 rounded-xl rotate-2 -z-10 hidden lg:block"></div>
        </div>
    );
}
