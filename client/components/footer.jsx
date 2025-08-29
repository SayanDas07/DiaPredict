"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronRight, Sparkles, User, Star } from 'lucide-react';


export const Footer = () => {
    const handleNavigation = (path) => {
        window.open(path, '_blank');
    };

    return (
        <footer className="relative z-10 bg-white/5 backdrop-blur-md border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                    <div className="lg:col-span-2">
                        <motion.div
                            className="flex items-center space-x-2 mb-4"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                                <Activity className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                DiabPredict
                            </h3>
                        </motion.div>
                        <p className="text-white/70 mb-6 max-w-md">
                            Empowering individuals with AI-driven diabetes risk assessment and personalized health insights.
                            Take control of your health journey today.
                        </p>
                        
                    </div>

                 
                    <div className="lg:col-span-1 flex items-center justify-center lg:justify-end">
                        <motion.button
                            onClick={() => handleNavigation('https://sayandas-nine.vercel.app/')}
                            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl overflow-hidden transition-all duration-300"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                    
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                                        "linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6)",
                                        "linear-gradient(225deg, #ec4899, #3b82f6, #8b5cf6)",
                                        "linear-gradient(315deg, #3b82f6, #8b5cf6, #ec4899)"
                                    ]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                            
                 
                            <motion.div
                                className="absolute top-2 right-2"
                                animate={{ 
                                    rotate: [0, 360],
                                    scale: [0.8, 1.2, 0.8]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                            </motion.div>

                            <div className="relative flex items-center space-x-3">
                                <motion.div
                                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <User className="w-5 h-5 text-white" />
                                </motion.div>
                                <div className="text-left">
                                    <p className="text-white font-semibold text-lg group-hover:text-blue-200 transition-colors">
                                        Meet the Creator
                                    </p>
                                    <p className="text-white/60 text-sm group-hover:text-white/80 transition-colors">
                                        Discover the creator portfolio
                                    </p>
                                </div>
                                <motion.div
                                    className="text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all"
                                    whileHover={{ x: 5 }}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </motion.div>
                            </div>
                        </motion.button>
                    </div>

                
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/10 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-white/60 text-sm mb-4 md:mb-0">
                            © 2024 DiabPredict. All rights reserved.
                        </p>
                        <motion.div
                            className="flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Star className="w-4 h-4 text-yellow-400" />
                            <motion.p
                                animate={{
                                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="text-sm bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_100%] font-medium"
                            >
                                Created by Sayan Das
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;