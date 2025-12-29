import React from 'react';
import { motion } from 'framer-motion';

const RobotMascot = () => {
    return (
        <div className="relative w-64 h-64 flex items-center justify-center grayscale contrast-125">
            <motion.div
                className="relative z-10"
                animate={{
                    y: [-5, 5, -5],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Robot Head Group */}
                <div className="relative">
                    {/* Antenna */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <motion.div
                            className="w-3 h-3 bg-black rounded-full"
                            animate={{ opacity: [1, 0.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <div className="w-[2px] h-8 bg-black"></div>
                    </div>

                    {/* Head Shape */}
                    <div className="w-40 h-32 bg-white border-[3px] border-black rounded-[1rem] relative overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {/* Face Screen */}
                        <div className="w-32 h-20 bg-black rounded-[0.5rem] relative flex items-center justify-center gap-4 overflow-hidden">

                            {/* Matrix Grid Background */}
                            <div className="absolute inset-0 opacity-20"
                                style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '4px 4px' }}
                            />

                            {/* Left Eye */}
                            <motion.div
                                className="w-8 h-8 border-2 border-white bg-transparent rounded-sm flex items-center justify-center"
                                animate={{
                                    scaleY: [1, 0.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    times: [0, 0.95, 1],
                                    repeatDelay: 2
                                }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>

                            {/* Right Eye */}
                            <motion.div
                                className="w-8 h-8 border-2 border-white bg-transparent rounded-sm flex items-center justify-center"
                                animate={{
                                    scaleY: [1, 0.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    times: [0, 0.95, 1],
                                    repeatDelay: 2
                                }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Ear Left */}
                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-4 h-8 bg-white border-[3px] border-black border-r-0 rounded-l-md" />
                    {/* Ear Right */}
                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-4 h-8 bg-white border-[3px] border-black border-l-0 rounded-r-md" />
                </div>

                {/* Neck */}
                <div className="w-12 h-6 bg-black mx-auto -mt-1 relative z-0 flex flex-col justify-evenly py-1">
                    <div className="w-full h-[1px] bg-white/30"></div>
                    <div className="w-full h-[1px] bg-white/30"></div>
                </div>

                {/* Body */}
                <div className="w-28 h-20 bg-white border-[3px] border-black rounded-[1rem] mx-auto relative flex items-center justify-center -mt-1 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {/* Chest Panel */}
                    <div className="w-20 h-10 border-2 border-dashed border-black/20 flex items-center justify-between px-2">
                        <div className="text-[10px] font-mono font-bold tracking-tighter">SYS:ONLINE</div>
                        <div className="w-2 h-2 bg-black animate-pulse rounded-full" />
                    </div>
                </div>

                {/* Arms */}
                <motion.div
                    className="absolute top-40 -left-6 w-6 h-16 bg-white border-[3px] border-black rounded-b-xl origin-top"
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-40 -right-6 w-6 h-16 bg-white border-[3px] border-black rounded-b-xl origin-top"
                    animate={{ rotate: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                />
            </motion.div>
        </div>
    );
};

export default RobotMascot;
