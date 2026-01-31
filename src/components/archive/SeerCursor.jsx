import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function SeerCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    // Optimized spring settings for responsiveness
    const springConfig = { damping: 35, stiffness: 800, mass: 0.1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX - 12);
            mouseY.set(e.clientY - 12);
            if (!isVisible) setIsVisible(true);

            // Detect if hovering over a clickable element
            const target = e.target;
            const isClickable =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.classList.contains('cursor-pointer');

            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isVisible, mouseX, mouseY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="fixed pointer-events-none z-[9999] mix-blend-difference"
            style={{ x, y }}
            animate={{
                scale: isHovering ? 1.5 : 1,
            }}
        >
            {/* Four constraining dots */}
            <div className="relative w-6 h-6">
                {[
                    { x: 0, y: 0 },
                    { x: 20, y: 0 },
                    { x: 0, y: 20 },
                    { x: 20, y: 20 },
                ].map((dot, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        style={{ left: dot.x, top: dot.y }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: isHovering ? 1 : [0.8, 1, 0.8],
                            backgroundColor: isHovering ? '#2dd4bf' : '#ffffff',
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                        }}
                    />
                ))}

                {/* Connecting lines (very faint) */}
                <svg className="absolute inset-0 w-6 h-6" style={{ left: 2, top: 2 }}>
                    <motion.line
                        x1="0" y1="0" x2="20" y2="0"
                        stroke={isHovering ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="0.5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.line
                        x1="0" y1="20" x2="20" y2="20"
                        stroke={isHovering ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="0.5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.line
                        x1="0" y1="0" x2="0" y2="20"
                        stroke={isHovering ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="0.5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.25 }}
                    />
                    <motion.line
                        x1="20" y1="0" x2="20" y2="20"
                        stroke={isHovering ? "rgba(45,212,191,0.4)" : "rgba(255,255,255,0.1)"}
                        strokeWidth="0.5"
                        animate={{ opacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.75 }}
                    />
                </svg>
            </div>
        </motion.div>
    );
}
