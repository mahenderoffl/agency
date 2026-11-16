'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './CountdownTimer.module.css';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
    const [isLive, setIsLive] = useState(false);
    const prevTimeLeftRef = useRef<TimeLeft | null>(null);

    useEffect(() => {
        const calculateTimeLeft = (): TimeLeft | null => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference <= 0) {
                setIsLive(true);
                return null;
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        };

        // Initial calculation
        const initialTime = calculateTimeLeft();
        setTimeLeft(initialTime);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                prevTimeLeftRef.current = prev;
                return calculateTimeLeft();
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (isLive) {
        return (
            <motion.div
                className={styles.liveContainer}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.liveBadge}>
                    <span className={styles.liveDot} />
                    We&apos;re Live!
                </div>
            </motion.div>
        );
    }

    if (!timeLeft) {
        return null;
    }

    const prevTimeLeft = prevTimeLeftRef.current;
    const timeUnits = [
        { value: timeLeft.days, label: 'DAYS', prevValue: prevTimeLeft?.days },
        { value: timeLeft.hours, label: 'HOURS', prevValue: prevTimeLeft?.hours },
        { value: timeLeft.minutes, label: 'MINS', prevValue: prevTimeLeft?.minutes },
        { value: timeLeft.seconds, label: 'SECS', prevValue: prevTimeLeft?.seconds },
    ];

    return (
        <div className={styles.container}>
            {timeUnits.map((unit, index) => (
                <div key={unit.label} className={styles.unitWrapper}>
                    <motion.div
                        className={styles.unit}
                        animate={unit.value !== unit.prevValue ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.value}>
                            {String(unit.value).padStart(2, '0')}
                        </div>
                        <div className={styles.label}>{unit.label}</div>
                    </motion.div>
                    {index < timeUnits.length - 1 && (
                        <span className={styles.separator}>:</span>
                    )}
                </div>
            ))}
        </div>
    );
}
