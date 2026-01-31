import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function AxiomWheel({ activeTier, onTierSelect }) {
    const [hoveredTier, setHoveredTier] = useState(null);

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

    return (
        <div className="fixed bottom-12 right-12 z-50 w-[450px] h-[450px] flex items-center justify-center">
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
                    const size = 60 + i * 35; // Increased increment from 18 to 35
                    const isActive = activeTier === i;
                    const isHovered = hoveredTier === i;

                    return (
                        <motion.button
                            key={i}
                            onClick={() => onTierSelect(i)}
                            onMouseEnter={() => setHoveredTier(i)}
                            onMouseLeave={() => setHoveredTier(null)}
                            className="absolute rounded-full border border-white/5 flex items-center justify-center transition-colors hover:border-teal-400/30 cursor-pointer"
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
                                scale: isActive ? 1.05 : 1, // Reduced scale from 1.1 to 1.05
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
    );
}