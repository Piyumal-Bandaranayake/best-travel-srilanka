'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin } from 'lucide-react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        '/tigger.jpg',
        '/mirissa%20beach.jpg'
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handleWhatsAppBook = () => {
        const phoneNumber = "94701000148";
        const message = "Hi! I'm interested in booking a tour with Best Travel Sri Lanka.";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-gray-900">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <motion.div
                    key={slide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={slide}
                        alt="Hero Background"
                        fill
                        priority={index === 0}
                        className="object-cover object-center"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            ))}

            {/* Hero Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 text-white max-w-5xl mx-auto z-20 pt-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-1.5 bg-accent-green/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-accent-green mb-6 border border-accent-green/30"
                >
                    Explore the Pearl of the Indian Ocean
                </motion.span>
                
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
                >
                    Discover Your <br />
                    <span className="text-white italic opacity-90">Next Adventure</span>
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-white/80 max-w-2xl font-medium leading-relaxed mb-12"
                >
                    Experience the raw, untamed beauty of Sri Lanka. From ancient highlands 
                    to pristine shores, we craft journeys that stay with you forever.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button 
                        onClick={handleWhatsAppBook}
                        className="px-12 py-5 bg-white text-primary-green rounded-full font-black text-lg shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 relative z-30 pointer-events-auto"
                    >
                        <MessageCircle className="w-6 h-6 fill-primary-green/10" />
                        Book Now
                    </button>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
