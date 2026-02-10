'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/tigger.jpg',
        '/mirissa%20beach.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(timer);
    }, [slides.length]);

    const handleWhatsAppBook = () => {
        const phoneNumber = "+94700000000"; // Placeholder number
        const message = "Hi! I'm interested in booking a tour with Best Travel Sri Lanka.";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="relative font-outfit">
            {/* Full-width Full-height Hero Section */}
            <div className="relative h-screen min-h-[700px] w-full overflow-hidden">
                {/* Background Slideshow Layer */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-110"
                        style={{ backgroundImage: `url("${slides[currentSlide]}")` }}
                    >
                        {/* Dark Overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>
                </AnimatePresence>

                {/* Hero Content - Centered */}
                <div className="relative h-full flex flex-col justify-center items-center text-center px-6 text-white max-w-5xl mx-auto z-10">
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
                    >
                        Discover Your <br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-green to-accent-blue italic">
                            Next Adventure
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl text-white/90 max-w-2xl font-light leading-relaxed mb-12"
                    >
                        Experience the raw, untamed beauty of Sri Lanka. From ancient highlands 
                        to pristine shores, we craft journeys that stay with you forever.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <button 
                            onClick={handleWhatsAppBook}
                            className="px-10 py-5 bg-white text-primary-green rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-6 h-6" />
                            Book Now
                        </button>
                    </motion.div>
                </div>

                {/* Bottom Gradient Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-10" />
            </div>
        </section>
    );
};

export default Hero;
