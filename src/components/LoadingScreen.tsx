'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
    onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const duration = 2500; // 2.5 seconds total
        const interval = 50;
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                const next = prev + increment + Math.random() * 2;
                if (next >= 100) {
                    clearInterval(timer);
                    setIsComplete(true);
                    setTimeout(onLoadingComplete, 600);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className={styles.container}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                    <div className={styles.content}>
                        {/* Logo */}
                        <motion.div
                            className={styles.logo}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00E5FF" />
                                        <stop offset="100%" stopColor="#0066FF" />
                                    </linearGradient>
                                </defs>
                                <circle cx="40" cy="40" r="35" stroke="url(#logoGradient)" strokeWidth="3" fill="none" />
                                <path
                                    d="M25 40 Q32.5 25, 40 40 Q47.5 55, 55 40"
                                    stroke="url(#logoGradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                        </motion.div>

                        {/* Brand Name */}
                        <motion.h1
                            className={styles.brandName}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            WaveSeed <span className={styles.highlight}>Growth</span>
                        </motion.h1>

                        {/* Progress Bar */}
                        <motion.div
                            className={styles.progressContainer}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '200px', opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            <div
                                className={styles.progressBar}
                                style={{ width: `${progress}%` }}
                            />
                        </motion.div>

                        {/* Loading Text */}
                        <motion.p
                            className={styles.loadingText}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.5 }}
                        >
                            {Math.round(progress)}%
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
