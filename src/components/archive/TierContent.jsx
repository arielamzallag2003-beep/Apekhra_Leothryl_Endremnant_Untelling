import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loreService } from '@/lib/loreService';
import UnweavingText from './UnweavingText';

export default function TierContent({ activeTier, onTransitionStart }) {
    const articles = loreService.getArticlesByTier(activeTier);
    const [selectedArticleIndex, setSelectedArticleIndex] = React.useState(0);

    // Reset article index when tier changes
    React.useEffect(() => {
        setSelectedArticleIndex(0);
    }, [activeTier]);

    const activeArticle = articles[selectedArticleIndex] || {
        path: "none",
        title: "No Signal",
        content: "The archive for this depth level appears unwritten or erased.",
        subtitle: "Aetheric Void"
    };

    return (
        <div className="relative z-20 w-full max-w-4xl mx-auto pt-32 px-12 pb-64">
            <AnimatePresence mode="wait">
                <motion.section
                    key={activeTier}
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
                    transition={{
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                    className="relative"
                >
                    {/* Tier Number Indicator (Large Watermark) */}
                    <div className="absolute -left-20 -top-20 text-[20rem] font-black text-white/[0.02] select-none pointer-events-none">
                        {activeTier}
                    </div>

                    <div className="relative space-y-12">
                        {/* Header Section */}
                        <div className="space-y-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-teal-400 text-sm tracking-[0.4em] uppercase font-light"
                            >
                                {activeArticle.subtitle || `Tier ${activeTier} Documentation`}
                            </motion.div>

                            <motion.h2
                                initial={{ x: -30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-6xl text-white font-extralight tracking-tight"
                            >
                                {activeArticle.title}
                            </motion.h2>

                            <div className="w-24 h-[1px] bg-gradient-to-r from-teal-400 to-transparent" />
                        </div>

                        {/* Article Selection (if multiple) */}
                        {articles.length > 1 && (
                            <div className="flex flex-wrap gap-4 mt-8">
                                {articles.map((article, idx) => (
                                    <button
                                        key={article.path}
                                        onClick={() => setSelectedArticleIndex(idx)}
                                        className={`px-4 py-1.5 text-[10px] tracking-widest uppercase border transition-all cursor-pointer ${idx === selectedArticleIndex
                                            ? 'bg-teal-400/10 border-teal-400/40 text-teal-300'
                                            : 'bg-white/[0.02] border-white/5 text-white/40 hover:text-white/70 hover:border-white/20'
                                            }`}
                                    >
                                        {article.title}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Text Body with 'Unweaving' animation effect */}
                        <div className="relative pt-8">
                            <UnweavingText content={activeArticle.content} key={activeArticle.path} />
                        </div>

                        {/* Interactive Widgets according to Tier */}

                        {/* Interactive Widgets according to Tier */}
                        {/* Thematic Status Widgets */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="pt-16 grid grid-cols-2 gap-12 border-t border-white/[0.03]"
                        >
                            {/* Ontological Status */}
                            <div className="relative group">
                                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-500/50 via-teal-500/10 to-transparent" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-1 h-1 rounded-full bg-teal-400/40 shadow-[0_0_8px_rgba(45,212,191,0.3)]" />
                                        <span className="text-[10px] text-teal-400/60 tracking-[0.3em] uppercase font-light">
                                            Ontological Status
                                        </span>
                                    </div>
                                    <div className="text-sm text-white/60 font-extralight tracking-wide leading-relaxed italic border-l border-white/[0.05] pl-4 ml-[2px]">
                                        "Stability verified by the Seer's Presence."
                                    </div>
                                </div>
                            </div>

                            {/* Local Resonance */}
                            <div className="relative group">
                                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-teal-500/50 via-teal-500/10 to-transparent" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <motion.span
                                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                            className="w-1 h-1 rounded-full bg-teal-400/40 shadow-[0_0_8px_rgba(45,212,191,0.3)]"
                                        />
                                        <span className="text-[10px] text-teal-400/60 tracking-[0.3em] uppercase font-light">
                                            Local Resonance
                                        </span>
                                    </div>
                                    <div className="text-sm text-white/60 font-extralight tracking-wide leading-relaxed italic border-l border-white/[0.05] pl-4 ml-[2px]">
                                        "Aetheric signals show minimal drift."
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Fraying/Unweaving edges effect */}
                    <div className="absolute -bottom-20 left-0 right-0 h-40 pointer-events-none">
                        <div className="w-full h-full bg-gradient-to-t from-[#0a0a12] via-transparent to-transparent" />
                    </div>
                </motion.section>
            </AnimatePresence>
        </div>
    );
}