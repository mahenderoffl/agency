'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '../ui/CountdownTimer';
import Button from '../ui/Button';
import styles from './HeroSection.module.css';

export default function HeroSection() {
    // March 2, 2026 at midnight
    const launchDate = new Date('2026-03-02T00:00:00');

    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                {/* Eyebrow */}
                <motion.div
                    className={styles.eyebrow}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    End-to-End AI Solutions Agency
                </motion.div>

                {/* Main Headline */}
                <motion.h1
                    className={styles.headline}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    We&apos;re Aired <span className={styles.highlight}>Now</span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    className={styles.subheadline}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    March 2, 2026 — The AI Agency Launches
                </motion.p>

                {/* Countdown Timer */}
                <motion.div
                    className={styles.countdown}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    <CountdownTimer targetDate={launchDate} />
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <Button href="https://growth.waveseed.co" size="lg">
                        Explore Our AI Solutions
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className={styles.scrollIndicator}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <span>Scroll to explore</span>
                    <motion.div
                        className={styles.scrollArrow}
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
