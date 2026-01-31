import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AxiomWheel from '../components/archive/AxiomWheel';
import TierContent from '../components/archive/TierContent';

export default function Archive() {
    const [activeTier, setActiveTier] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTierSelect = useCallback((tier) => {
        if (tier === activeTier || isTransitioning) return;

        setIsTransitioning(true);

        // Small delay to allow exit animation
        setTimeout(() => {
            setActiveTier(tier);
            setIsTransitioning(false);
        }, 400);
    }, [activeTier, isTransitioning]);

    return (
        <div className="min-h-screen relative">
            {/* Header */}
            <motion.header
                className="fixed top-0 left-0 right-0 z-40 p-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(0, 212, 170, 0.05) 100%)',
                            border: '1px solid rgba(0, 212, 170, 0.3)',
                        }}
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(0, 212, 170, 0.1)',
                                '0 0 30px rgba(0, 212, 170, 0.2)',
                                '0 0 20px rgba(0, 212, 170, 0.1)',
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <span className="text-teal-400 text-sm">◎</span>
                    </motion.div>
                    <div>
                        <h1 className="text-white/90 text-sm font-extralight tracking-[0.2em] uppercase">
                            Metaphysical Archive
                        </h1>
                        <p className="text-white/30 text-[10px] tracking-[0.15em] mt-0.5">
                            Post-Reality Documentation System
                        </p>
                    </div>
                </div>
            </motion.header>

            {/* Depth indicator line (left side) */}
            <motion.div
                className="fixed left-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
            >
                <div className="text-[9px] tracking-[0.3em] text-white/20 uppercase -rotate-90 mb-8 whitespace-nowrap">
                    Depth Level
                </div>
                <div className="relative h-64 w-[1px] bg-white/10">
                    <motion.div
                        className="absolute top-0 left-0 w-full bg-gradient-to-b from-teal-400/80 to-teal-400/20"
                        animate={{
                            height: `${((activeTier + 1) / 12) * 100}%`,
                        }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {/* Tier markers */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border"
                            style={{
                                top: `${(i / 11) * 100}%`,
                                borderColor: i <= activeTier ? 'rgba(0, 212, 170, 0.6)' : 'rgba(255, 255, 255, 0.2)',
                                backgroundColor: i === activeTier ? 'rgba(0, 212, 170, 0.8)' : 'transparent',
                            }}
                            animate={{
                                scale: i === activeTier ? [1, 1.3, 1] : 1,
                            }}
                            transition={{
                                duration: 2,
                                repeat: i === activeTier ? Infinity : 0,
                            }}
                        />
                    ))}
                </div>
                <div className="text-[10px] text-teal-400/60 mt-4">
                    {activeTier}/11
                </div>
            </motion.div>

            {/* Main content area */}
            <TierContent
                activeTier={activeTier}
                onTransitionStart={() => setIsTransitioning(true)}
            />

            {/* Axiom Wheel Navigation */}
            <AxiomWheel
                activeTier={activeTier}
                onTierSelect={handleTierSelect}
            />

            {/* Bottom status bar */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 z-30 p-4 flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <div className="flex items-center gap-6 text-[9px] tracking-[0.2em] text-white/20 uppercase">
                    <span>Archive Status: Active</span>
                    <span className="w-1 h-1 rounded-full bg-teal-400/50" />
                    <span>Observer: Authenticated</span>
                    <span className="w-1 h-1 rounded-full bg-teal-400/50" />
                    <span className="text-teal-400/50">Navigate via Axiom Wheel →</span>
                </div>
            </motion.div>

            {/* Transition overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        className="fixed inset-0 z-50 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 10, 18, 0.8) 100%)',
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}