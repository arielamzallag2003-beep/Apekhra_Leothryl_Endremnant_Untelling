import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlassPanel({
    children,
    className = '',
    corruption = 0,
    delay = 0
}) {
    const panelRef = useRef(null);
    const [ripple, setRipple] = useState({ x: 50, y: 50, active: false });

    const handleMouseMove = (e) => {
        if (!panelRef.current) return;
        const rect = panelRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setRipple({ x, y, active: true });
    };

    const handleMouseLeave = () => {
        setRipple(prev => ({ ...prev, active: false }));
    };

    const corruptionStyles = corruption > 0 ? {
        filter: `hue-rotate(${corruption * 2}deg)`,
    } : {};

    return (
        <motion.div
            ref={panelRef}
            className={`relative overflow-hidden ${className}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.16, 1, 0.3, 1]
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={corruptionStyles}
        >
            {/* Glass surface */}
            <div
                className="absolute inset-0 rounded-2xl"
                style={{
                    background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.08) 0%,
              rgba(255, 255, 255, 0.02) 50%,
              rgba(255, 255, 255, 0.05) 100%
            )
          `,
                    backdropFilter: 'blur(8px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: `
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2)
          `,
                }}
            />

            {/* Ripple effect */}
            <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                    background: `radial-gradient(
            circle at ${ripple.x}% ${ripple.y}%,
            rgba(0, 212, 170, 0.08) 0%,
            transparent 50%
          )`,
                }}
                animate={{
                    opacity: ripple.active ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Corruption overlay */}
            {corruption > 20 && (
                <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                        background: `
              radial-gradient(
                ellipse at ${30 + Math.sin(Date.now() / 1000) * 20}% ${50 + Math.cos(Date.now() / 1000) * 30}%,
                rgba(107, 26, 74, ${corruption / 300}) 0%,
                transparent 60%
              )
            `,
                    }}
                    animate={{
                        opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            )}

            {/* Luminous inverse shadow (teal glow beneath) */}
            <motion.div
                className="absolute -bottom-2 left-4 right-4 h-4 rounded-full blur-xl"
                style={{
                    background: 'rgba(0, 212, 170, 0.15)',
                }}
                animate={{
                    opacity: ripple.active ? 0.3 : 0.15,
                    scaleX: ripple.active ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <div className="relative z-10 p-8">
                {children}
            </div>
        </motion.div>
    );
}