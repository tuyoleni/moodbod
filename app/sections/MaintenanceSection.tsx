'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MaintenanceSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        hours: 62,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
                    clearInterval(timer);
                    return prevTime;
                }

                let newSeconds = prevTime.seconds - 1;
                let newMinutes = prevTime.minutes;
                let newHours = prevTime.hours;

                if (newSeconds < 0) {
                    newSeconds = 59;
                    newMinutes -= 1;
                }

                if (newMinutes < 0) {
                    newMinutes = 59;
                    newHours -= 1;
                }

                return {
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: number): string => num.toString().padStart(2, '0');

    return (
        <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900" />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-4xl mx-auto">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12 sm:mb-16"
                >
                    <h1 className="text-[clamp(100px,15vw,180px)] font-black tracking-[-16px] leading-[0.85] flex flex-wrap justify-center">
                        <span>MOOD</span>
                        <span>BOD</span>
                    </h1>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center space-y-6"
                >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                        Under Update
                    </h2>
                    <p className="text-base sm:text-lg mb-8 max-w-md mx-auto text-zinc-400">
                        We're making things better. Our site will be back online in
                    </p>

                    {/* Timer */}
                    <div className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold mb-10 flex items-center justify-center gap-3 sm:gap-4">
                        <motion.div
                            className="flex flex-col items-center bg-zinc-900/50 px-4 py-3 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-white">{formatNumber(timeLeft.hours)}</span>
                            <span className="text-xs text-zinc-500 mt-1 font-sans">HOURS</span>
                        </motion.div>
                        <span className="text-zinc-600 mb-6">:</span>
                        <motion.div
                            className="flex flex-col items-center bg-zinc-900/50 px-4 py-3 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-white">{formatNumber(timeLeft.minutes)}</span>
                            <span className="text-xs text-zinc-500 mt-1 font-sans">MINUTES</span>
                        </motion.div>
                        <span className="text-zinc-600 mb-6">:</span>
                        <motion.div
                            className="flex flex-col items-center bg-zinc-900/50 px-4 py-3 rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <span className="text-white">{formatNumber(timeLeft.seconds)}</span>
                            <span className="text-xs text-zinc-500 mt-1 font-sans">SECONDS</span>
                        </motion.div>
                    </div>

                    {/* Additional Info */}
                    <motion.p
                        className="text-sm sm:text-base text-zinc-500 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        Thank you for your patience. We're working hard to bring you an improved experience.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default MaintenanceSection; 