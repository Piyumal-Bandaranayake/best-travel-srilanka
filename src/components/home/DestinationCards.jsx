'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';

import Link from 'next/link';
import { destinations } from '@/data/destinations';

const DestinationCards = () => {
    // Show only the first 3 destinations on the home page
    const displayedDestinations = destinations.slice(0, 3);

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "94701000148"; // Booking number
        const message = `Hi! I would like to book a tour for ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="bg-white py-24">
            <div className="max-w-7xl mx-auto px-6">
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
                    {displayedDestinations.map((dest, index) => (
                        <motion.div
                            key={dest.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -12 }}
                            className="group flex flex-col"
                        >
                            <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl mb-6 transform-gpu">
                                <Image 
                                    src={dest.image} 
                                    alt={dest.title}
                                    fill
                                    quality={90}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="absolute top-8 right-8">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-10 text-white">
                                    <span className="inline-block px-4 py-1.5 bg-accent-green/90 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
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
                            <div className="flex flex-col gap-3 px-2">
                                <button 
                                    onClick={() => handleWhatsAppBook(dest.title)}
                                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-[#128C7E]"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link href="/destinations">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="px-8 py-4 bg-white text-[#25D366] border-2 border-[#25D366]/20 rounded-full font-bold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-600/25 active:scale-95 inline-block"
                        >
                            Explore More Destinations
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default DestinationCards;
