import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";

/*
PIPELINE LOGIC
Phase 1: Pre-Launch (until Feb 3)
Phase 2: Delay Window (Feb 3–4) → System Upgrade Message
Phase 3: Relaunch Countdown (Feb 5–9)
Phase 4: Final Launch (Feb 10 onwards)
*/

const PHASES = {
  PRE_LAUNCH: "pre",
  DELAY: "delay",
  RELAUNCH: "relaunch",
  LIVE: "live",
};

export default function WaveSeedGrowthLanding() {
  const PRE_LAUNCH_DATE = new Date("2026-02-03T00:00:00").getTime();
  const RELAUNCH_DATE = new Date("2026-02-05T00:00:00").getTime();
  const FINAL_LAUNCH_DATE = new Date("2026-02-10T00:00:00").getTime();

  const [phase, setPhase] = useState(PHASES.PRE_LAUNCH);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

interface PhaseMap {
    PRE_LAUNCH: string;
    DELAY: string;
    RELAUNCH: string;
    LIVE: string;
}

type Phase = keyof PhaseMap;

function getPhase(now: number): PhaseMap[keyof PhaseMap] {
    if (now < PRE_LAUNCH_DATE) return PHASES.PRE_LAUNCH;
    if (now >= PRE_LAUNCH_DATE && now < RELAUNCH_DATE) return PHASES.DELAY;
    if (now >= RELAUNCH_DATE && now < FINAL_LAUNCH_DATE) return PHASES.RELAUNCH;
    return PHASES.LIVE;
}

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

function getTimeRemaining(target: number): TimeRemaining | null {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const currentPhase = getPhase(now);
      setPhase(currentPhase);

      if (currentPhase === PHASES.PRE_LAUNCH) {
        setTimeLeft(getTimeRemaining(PRE_LAUNCH_DATE));
      } else if (currentPhase === PHASES.RELAUNCH) {
        setTimeLeft(getTimeRemaining(FINAL_LAUNCH_DATE));
      } else {
        setTimeLeft(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          WaveSeed <span className="text-cyan-400">Growth</span>
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-gray-300">
          AI-Powered Growth Systems built to create predictable revenue for businesses.
        </p>
        <p className="mt-4 text-gray-400">
          Strategy • Traffic • Automation • Booked Calls • Scale
        </p>
      </motion.div>

      {/* PHASE CONTENT */}
      <motion.div className="mt-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {phase === PHASES.PRE_LAUNCH && timeLeft && (
          <div className="flex gap-4">
            {Object.entries(timeLeft).map(([label, value]) => (
              <Card key={label} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-cyan-400">{value}</div>
                  <div className="text-xs uppercase text-gray-400">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {phase === PHASES.DELAY && (
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold text-yellow-400">⚙️ System Upgrade in Progress</h2>
            <p className="mt-4 text-gray-400">
              We’re performing a critical backend upgrade to ensure WaveSeed Growth launches
              with maximum performance, reliability, and automation.
            </p>
            <p className="mt-2 text-gray-500">Relaunch countdown begins on February 5.</p>
          </div>
        )}

        {phase === PHASES.RELAUNCH && timeLeft && (
          <div className="flex gap-4">
            {Object.entries(timeLeft).map(([label, value]) => (
              <Card key={label} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="text-3xl font-bold text-cyan-400">{value}</div>
                  <div className="text-xs uppercase text-gray-400">{label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {phase === PHASES.LIVE && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-400">🚀 We Are Live</h2>
            <p className="mt-4 text-gray-400 max-w-xl">
              WaveSeed Growth is now live. Explore how we help businesses scale using
              AI-powered growth systems, automation, and performance marketing.
            </p>
            <Button
              size="lg"
              className="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-2xl px-10"
              onClick={() => window.location.href = "https://growth.waveseed.app"}
            >
              Visit Main Website
            </Button>
          </div>
        )}
      </motion.div>

      {/* ABOUT SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 max-w-3xl text-center"
      >
        <h3 className="text-xl font-semibold text-cyan-400">About WaveSeed Growth</h3>
        <p className="mt-4 text-gray-400">
          WaveSeed Growth is a next-generation AI growth agency focused on building
          end-to-end systems — not just running ads. We design acquisition engines that
          attract, qualify, follow up, and convert leads automatically.
        </p>
      </motion.div>

      {/* FOOTER */}
      <footer className="absolute bottom-6 text-xs text-gray-600 text-center">
        <p>Temporary launch page • agency.waveseed.app</p>
        <p className="mt-1">Final launch • February 10</p>
      </footer>
    </div>
  );
}
