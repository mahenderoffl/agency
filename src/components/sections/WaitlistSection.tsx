'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import styles from './WaitlistSection.module.css';

export default function WaitlistSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Please enter a valid email address');
            return;
        }

        setStatus('loading');

        try {
            // Submit to Netlify Forms
            const formData = new URLSearchParams();
            formData.append('form-name', 'waitlist');
            formData.append('email', email);

            const response = await fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData.toString(),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                throw new Error('Form submission failed');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <section className={styles.waitlist}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className={styles.title}>
                        Be First to Experience AI-Powered Growth
                    </h2>
                    <p className={styles.subtitle}>
                        Join our waitlist for exclusive launch offers and insights
                    </p>

                    {/* Hidden form for Netlify to detect */}
                    <form name="waitlist" data-netlify="true" hidden>
                        <input type="email" name="email" />
                    </form>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                className={styles.successMessage}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                            >
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00FF88" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M8 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3>You&apos;re on the list!</h3>
                                <p>We&apos;ll notify you when we launch!</p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                className={styles.form}
                                name="waitlist"
                                method="POST"
                                data-netlify="true"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <input type="hidden" name="form-name" value="waitlist" />
                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        placeholder="Enter your email for updates"
                                        className={`${styles.input} ${status === 'error' ? styles.inputError : ''}`}
                                        disabled={status === 'loading'}
                                    />
                                    <Button
                                        type="submit"
                                        size="lg"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? (
                                            <span className={styles.spinner} />
                                        ) : (
                                            'Join the Waitlist'
                                        )}
                                    </Button>
                                </div>

                                {status === 'error' && (
                                    <motion.p
                                        className={styles.errorText}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {errorMessage}
                                    </motion.p>
                                )}
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <p className={styles.privacyNote}>
                        We respect your privacy. Unsubscribe anytime.{' '}
                        <a href="/privacy">View our Privacy Policy.</a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

