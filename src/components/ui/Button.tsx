'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    onClick?: () => void;
    type?: 'button' | 'submit';
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    onClick,
    type = 'button',
    disabled = false,
    fullWidth = false,
    className = '',
}: ButtonProps) {
    const combinedClassName = `${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

    const content = (
        <motion.span
            className={styles.content}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {children}
        </motion.span>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                className={combinedClassName}
                whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0, 102, 255, 0.4)' }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
            whileHover={{ y: -2, boxShadow: '0 10px 40px rgba(0, 102, 255, 0.4)' }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2 }}
        >
            {content}
        </motion.button>
    );
}
