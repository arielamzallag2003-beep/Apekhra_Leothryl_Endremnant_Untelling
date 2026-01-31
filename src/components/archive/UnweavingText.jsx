import React from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const UnweavingParagraph = ({ children, index }) => {
    return (
        <motion.p
            className="text-white/80 font-extralight leading-relaxed mb-6 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1]
            }}
            style={{
                maskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)',
            }}
        >
            {children}
            {/* Unweaving threads at edge */}
            <span className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-[1px] bg-gradient-to-b from-white/30 to-transparent"
                        style={{
                            left: `${i * 12}%`,
                            top: `${10 + i * 10}%`,
                            height: `${20 + Math.random() * 30}%`,
                        }}
                        animate={{
                            opacity: [0.3, 0.6, 0],
                            y: [0, 10, 20],
                            x: [0, 5, 15],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: 'easeOut',
                        }}
                    />
                ))}
            </span>
        </motion.p>
    );
};

const UnweavingHeader = ({ children, level, className = "" }) => {
    const sizes = {
        1: 'text-3xl mb-8',
        2: 'text-2xl mb-6',
        3: 'text-xl mb-4',
    };

    const headerContent = (isGlow = false) => (
        <span
            className={`font-extralight tracking-wide ${isGlow ? 'text-teal-400/30' : 'text-transparent relative z-10'}`}
            style={!isGlow ? { WebkitTextStroke: '1px rgba(255, 255, 255, 0.6)' } : {}}
        >
            {children}
        </span>
    );

    const renderHeader = (Tag) => (
        <motion.div
            className={`relative ${sizes[level] || sizes[3]} ${className}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="relative">
                <Tag className="contents">
                    {headerContent(false)}
                </Tag>
                <motion.div
                    className="absolute inset-0 blur-sm"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Tag className="contents">
                        {headerContent(true)}
                    </Tag>
                </motion.div>
            </div>
            <motion.div
                className="h-[1px] mt-3"
                style={{
                    background: 'linear-gradient(to right, rgba(0, 212, 170, 0.5) 0%, rgba(255, 255, 255, 0.2) 60%, transparent 100%)',
                }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
        </motion.div>
    );

    if (level === 1) return renderHeader('h1');
    if (level === 2) return renderHeader('h2');
    return renderHeader('h3');
};

export default function UnweavingText({ content, isReconstructing = false }) {
    let paragraphIndex = 0;

    return (
        <motion.div
            className="unweaving-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                filter: 'blur(10px)',
                x: -50,
            }}
            transition={{ duration: 0.5 }}
        >
            <ReactMarkdown
                components={{
                    h1: ({ children }) => <UnweavingHeader level={1} className="mt-8">{children}</UnweavingHeader>,
                    h2: ({ children }) => <UnweavingHeader level={2} className="mt-6">{children}</UnweavingHeader>,
                    h3: ({ children }) => <UnweavingHeader level={3} className="mt-4">{children}</UnweavingHeader>,
                    hr: () => (
                        <div className="py-4 my-2">
                            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                    ),
                    p: ({ children }) => {
                        const idx = paragraphIndex++;
                        return <UnweavingParagraph index={idx}>{children}</UnweavingParagraph>;
                    },
                    ul: ({ children }) => (
                        <motion.ul
                            className="space-y-2 mb-6 ml-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {children}
                        </motion.ul>
                    ),
                    li: ({ children }) => (
                        <motion.li
                            className="text-white/70 font-extralight flex items-start gap-3"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-teal-400/60 mt-1">◇</span>
                            <span>{children}</span>
                        </motion.li>
                    ),
                    blockquote: ({ children }) => (
                        <motion.blockquote
                            className="border-l-2 border-teal-400/30 pl-6 my-6 italic text-white/60"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {children}
                        </motion.blockquote>
                    ),
                    em: ({ children }) => (
                        <em className="text-teal-300/80 not-italic font-light">{children}</em>
                    ),
                    strong: ({ children }) => (
                        <strong className="text-white font-normal">{children}</strong>
                    ),
                    code: ({ children }) => (
                        <code className="px-2 py-1 bg-white/5 rounded text-teal-300/90 text-sm font-mono">
                            {children}
                        </code>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </motion.div>
    );
}