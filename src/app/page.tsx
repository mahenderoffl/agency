'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WaitlistSection from '@/components/sections/WaitlistSection';
import Footer from '@/components/sections/Footer';
import styles from './page.module.css';

// Dynamic import for 3D scene to avoid SSR issues
const Scene = dynamic(() => import('@/components/3d/Scene'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Small delay to ensure smooth transition
    setTimeout(() => setShowContent(true), 100);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      {/* 3D Background Scene */}
      <Scene />

      {/* Main Content */}
      <main className={`${styles.main} ${showContent ? styles.visible : ''}`}>
        <HeroSection />
        <ServicesSection />
        <WaitlistSection />
        <Footer />
      </main>
    </>
  );
}
