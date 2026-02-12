'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';
import { packages } from '@/data/packages';
import ActivityCard from '@/components/packages/ActivityCard';

export default function ActivitiesPage() {




    const handleWhatsAppBook = (title) => {
        const phoneNumber = "94701000148"; // Booking number
        const message = `Hi! I would like to book the activity: ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };



    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] h-auto flex items-center justify-center text-center text-white px-6 py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image 
                        src="/packages.jpg" 
                        alt="Sri Lanka Packages" 
                        fill 
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto pt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white mb-6 border border-white/30">
                            Unforgettable Experiences
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
                            Explore Our Packages
                        </h1>
                        <p className="text-white/90 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md mb-10">
                            From adrenaline-pumping adventures to serene nature escapes, find the perfect package to make your Sri Lanka trip unforgettable.
                        </p>




                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {packages.length > 0 ? (
                        packages.map((act, index) => (
                            <ActivityCard 
                                key={act.id || index}
                                activity={act}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl font-medium">No packages found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>


        </main>
    );
}
