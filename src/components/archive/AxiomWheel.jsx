import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, X } from 'lucide-react';

export default function AxiomWheel({ activeTier, onTierSelect }) {
    const [hoveredTier, setHoveredTier] = useState(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Tier names for the interactive tooltips/labels
    const TIER_LABELS = [
        "L'Alpha Insonore",         // 0
        "L'Œil du Seer",            // 1
        "Substrat Premier",         // 2
        "Constantes Axiomales",     // 3
        "Code Système du Réel",      // 4
        "Ancrages de l'Âme",        // 5
        "Prisme des Plans",         // 6
        "Matière Manifeste",        // 7
        "Poids Ontologique",        // 8
        "Domaines Conceptuels",     // 9
        "Trames du Récit",          // 10
        "Échos de l'Ombre"           // 11
    ];

    const handleTierSelect = (index) => {
        onTierSelect(index);
        setIsMobileOpen(false); // Auto-close on mobile
    };

    return (
        <>
            {/* Mobile Toggle Button (Sigil) */}
            <motion.button
                className="fixed bottom-6 right-6 md:hidden z-[60] w-12 h-12 bg-teal-950/80 border border-teal-500/50 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div
                    animate={{ rotate: isMobileOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {isMobileOpen ? (
                        <X className="w-5 h-5 text-teal-200" />
                    ) : (
                        <Disc className="w-6 h-6 text-teal-400 animate-pulse" />
                    )}
                </motion.div>
            </motion.button>

            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[40] md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Main Wheel Container */}
            <div
                className={`fixed z-50 transition-all duration-700 ease-out flex items-center justify-center
                    /* Positioning & Sizing Logic */
                    w-[450px] h-[450px]
                    
                    /* Mobile State */
                    ${isMobileOpen
                        ? 'bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 scale-90 opacity-100 z-[50] pointer-events-auto'
                        : 'bottom-0 right-0 scale-50 opacity-20 pointer-events-none z-0 translate-x-16 translate-y-16'
                    }

                    /* Desktop State (Always standard) */
                    md:bottom-12 md:right-12 md:translate-x-0 md:translate-y-0 md:scale-100 md:opacity-100 md:z-10 md:pointer-events-none 
                `}
            >
                {/* The Axiom-Wheel (12 concentric rings) */}
                <div className="relative w-full h-full flex items-center justify-center">
                    {/* Labels and Tooltip */}
                    <div className="absolute top-0 right-0 text-right pointer-events-none z-50">
                        <motion.div
                            key={hoveredTier !== null ? hoveredTier : activeTier}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-1"
                        >
                            <div className="text-[10px] tracking-[0.4em] text-teal-400 uppercase opacity-50">
                                Depth Level {hoveredTier !== null ? hoveredTier : activeTier}
                            </div>
                            <div className="text-sm text-white font-extralight tracking-widest uppercase">
                                {TIER_LABELS[hoveredTier !== null ? hoveredTier : activeTier]}
                            </div>
                        </motion.div>
                    </div>

                    {/* Rotating Rings */}
                    {[...Array(12)].map((_, i) => {
                        const size = 60 + i * 35;
                        const isActive = activeTier === i;
                        const isHovered = hoveredTier === i;

                        return (
                            <motion.button
                                key={i}
                                onClick={() => handleTierSelect(i)}
                                onMouseEnter={() => setHoveredTier(i)}
                                onMouseLeave={() => setHoveredTier(null)}
                                className="absolute rounded-full border border-white/5 flex items-center justify-center transition-colors hover:border-teal-400/30 cursor-pointer pointer-events-auto"
                                style={{
                                    width: size,
                                    height: size,
                                    zIndex: 20 - i,
                                }}
                                animate={{
                                    borderColor: isActive
                                        ? 'rgba(0, 242, 255, 0.4)'
                                        : isHovered
                                            ? 'rgba(0, 242, 255, 0.2)'
                                            : 'rgba(255, 255, 255, 0.05)',
                                    rotate: [0, (12 - i) * 60],
                                    scale: isActive ? 1.05 : 1,
                                }}
                                transition={{
                                    rotate: {
                                        duration: 30 + i * 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: { duration: 0.3 }
                                }}
                            >
                                {/* Active Point Indicator */}
                                {isActive && (
                                    <motion.div
                                        className="absolute -top-1 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(0,242,255,0.8)]"
                                        layoutId="active-indicator"
                                    />
                                )}
                            </motion.button>
                        );
                    })}

                    {/* Central Core (The Seer's Eye) */}
                    <motion.div
                        className="absolute w-12 h-12 rounded-full flex items-center justify-center border border-teal-400/20 bg-teal-400/[0.02]"
                        animate={{
                            boxShadow: [
                                '0 0 10px rgba(0, 242, 255, 0.05)',
                                '0 0 25px rgba(0, 242, 255, 0.15)',
                                '0 0 10px rgba(0, 242, 255, 0.05)',
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        <div className="w-1 h-1 rounded-full bg-teal-400" />
                    </motion.div>

                    {/* Vertical Depth Axis */}
                    <div className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                    <div className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                </div>
            </div>
        </>
    );
}