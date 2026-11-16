'use client';

import { motion } from 'framer-motion';
import Button from '../ui/Button';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Final CTA */}
                <motion.div
                    className={styles.ctaSection}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.ctaTitle}>Ready to Transform?</h2>
                    <Button href="https://growth.waveseed.co" size="lg" variant="primary">
                        Visit Our Main Site
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                </motion.div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Bottom Section */}
                <div className={styles.bottom}>
                    {/* Logo & Tagline */}
                    <div className={styles.brand}>
                        <div className={styles.logo}>
                            <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
                                <defs>
                                    <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#00E5FF" />
                                        <stop offset="100%" stopColor="#0066FF" />
                                    </linearGradient>
                                </defs>
                                <circle cx="40" cy="40" r="35" stroke="url(#footerLogoGradient)" strokeWidth="3" fill="none" />
                                <path
                                    d="M25 40 Q32.5 25, 40 40 Q47.5 55, 55 40"
                                    stroke="url(#footerLogoGradient)"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                            <span className={styles.brandName}>WaveSeed Growth</span>
                        </div>
                        <p className={styles.tagline}>Intelligent Solutions. Measurable Results.</p>
                    </div>

                    {/* Social Links */}
                    <div className={styles.social}>
                        <a href="https://www.linkedin.com/company/waveseedco/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="https://x.com/WaveSeedCo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Legal */}
                <div className={styles.legal}>
                    <p>© {currentYear} WaveSeed Growth. All rights reserved.</p>
                    <div className={styles.legalLinks}>
                        <a href="/privacy">Privacy Policy</a>
                        <span>•</span>
                        <a href="/terms">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
