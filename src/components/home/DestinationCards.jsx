'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';

const DestinationCards = () => {
    const destinations = [
        {
            title: 'Sigiriya Rock',
            location: 'Matale District',
            image: '/sigirya.jpg',
            tag: 'Historical'
        },
        {
            title: 'Nine Arch Bridge',
            location: 'Ella, Highlands',
            image: '/9arch.jpg',
            tag: 'Scenic'
        },
        {
            title: 'Mirissa Beach',
            location: 'Southern Province',
            image: '/mirissa%20beach.jpg',
            tag: 'Coastal'
        }
    ];

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "+94700000000"; // Placeholder number
        const message = `Hi! I would like to book a tour for ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-24 bg-white">
            <div className="flex items-center justify-between mb-16">
                <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full bg-primary-green/5 flex items-center justify-center border border-primary-green/20">
                        <ArrowUpRight className="w-6 h-6 text-primary-green" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight">Top Destinations</h2>
                        <p className="text-gray-500 font-medium">Explore the heart and soul of the island.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {destinations.map((dest, index) => (
                    <motion.div
                        key={dest.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        whileHover={{ y: -12 }}
                        className="group flex flex-col"
                    >
                        <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl mb-6">
                            <img 
                                src={dest.image} 
                                alt={dest.title}
                                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <div className="absolute top-8 right-8">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <ArrowUpRight className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="absolute bottom-10 left-10 text-white">
                                <span className="inline-block px-4 py-1.5 bg-accent-green/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-accent-green mb-4">
                                    {dest.tag}
                                </span>
                                <h3 className="text-3xl font-black mb-2 tracking-tight">{dest.title}</h3>
                                <div className="flex items-center gap-2 text-white/70 font-medium">
                                    <MapPin className="w-4 h-4 text-accent-green" />
                                    <span>{dest.location}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Buttons Footer - Matching current UI style */}
                        <div className="flex items-center gap-3 px-2">
                            <button 
                                onClick={() => handleWhatsAppBook(dest.title)}
                                className="flex-1 py-4 bg-primary-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Book Now
                            </button>
                            <button className="flex-1 py-4 bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all">
                                Explore More
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DestinationCards;
