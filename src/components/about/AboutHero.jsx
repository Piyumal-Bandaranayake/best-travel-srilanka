'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutHero = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
            <Image 
                src="/9arch.jpg" 
                alt="Sri Lanka Landscape" 
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4">
            <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-4"
            >
                About Us
            </motion.h1>
            <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl font-light max-w-2xl mx-auto"
            >
                Crafting unforgettable journeys through the heart of Sri Lanka since 2020.
            </motion.p>
        </div>
    </section>
    );
};

export default AboutHero;
