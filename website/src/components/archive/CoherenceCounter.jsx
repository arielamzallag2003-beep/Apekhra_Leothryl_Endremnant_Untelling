import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CoherenceCounter() {
    const [coherence, setCoherence] = useState(99.8);
    const [digits, setDigits] = useState(['9', '9', '.', '8']);

    useEffect(() => {
        const interval = setInterval(() => {
            const newCoherence = 99.7 + Math.random() * 0.2;
            setCoherence(newCoherence);
            setDigits(newCoherence.toFixed(1).split(''));
        }, 2000 + Math.random() * 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-8 right-8 z-50 flex flex-col items-end">
            <div className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2 font-light">
                Coherence
            </div>
            <div className="flex items-baseline gap-[2px]">
                <AnimatePresence mode="popLayout">
                    {digits.map((digit, i) => (
                        <motion.span
                            key={`${i}-${digit}`}
                            initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="text-white/80 font-extralight text-2xl tabular-nums"
                            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                        >
                            {digit}
                        </motion.span>
                    ))}
                </AnimatePresence>
                <span className="text-white/40 text-lg font-extralight ml-1">%</span>
            </div>
            <motion.div
                className="h-[1px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent mt-3"
                animate={{
                    width: [60, 80, 60],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-[2px] bg-teal-400/40"
                        animate={{
                            height: [8, 16, 8],
                            opacity: [0.2, 0.6, 0.2]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}