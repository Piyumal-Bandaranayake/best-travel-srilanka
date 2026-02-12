'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle, Search } from 'lucide-react';
import { destinations } from '@/data/destinations';

export default function DestinationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDest, setSelectedDest] = useState(null);

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "94701000148"; // Booking number
        const message = `Hi! I would like to book a tour for ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredDestinations = destinations.filter(dest => {
        if (!searchTerm) return true;
        const lowerTerm = searchTerm.toLowerCase();
        return (
            dest.title.toLowerCase().includes(lowerTerm) ||
            dest.location.toLowerCase().includes(lowerTerm) ||
            dest.tag.toLowerCase().includes(lowerTerm)
        );
    });

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] h-auto flex items-center justify-center text-center text-white px-6 py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image 
                        src="/sigirya.jpg" 
                        alt="Sri Lanka Destinations" 
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
                            Your Next Adventure Awaits
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8">
                            Explore Our Destinations
                        </h1>
                        <p className="text-white/90 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md mb-10">
                            From ancient ruins to golden beaches, discover the diverse landscapes and hidden gems that make Sri Lanka truly unique.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
                {/* Search Bar - Clean Layout */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <div className="relative group">
                        <input 
                            type="text" 
                            placeholder="Search destinations, locations..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-5 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-primary-green/30 focus:shadow-xl focus:shadow-primary-green/5 transition-all duration-300 font-medium text-lg"
                        />
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-primary-green transition-colors" />
                    </div>
                </div>

                {/* Destinations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredDestinations.length > 0 ? (
                        filteredDestinations.map((dest, index) => (
                        <motion.div
                            key={dest.id || index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -12 }}
                            className="group flex flex-col cursor-pointer"
                            onClick={() => setSelectedDest(dest)}
                        >
                            <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl mb-6 bg-gray-100">
                                <Image 
                                    src={dest.image} 
                                    alt={dest.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="absolute top-8 right-8">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                                        <ArrowUpRight className="w-6 h-6" />
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-10 text-white right-10">
                                    <span className="inline-block px-4 py-1.5 bg-accent-green/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-accent-green mb-4">
                                        {dest.tag}
                                    </span>
                                    <h3 className="text-3xl font-black mb-2 tracking-tight leading-none">{dest.title}</h3>
                                    <div className="flex items-center gap-2 text-white/70 font-medium mb-4">
                                        <MapPin className="w-4 h-4 text-accent-green" />
                                        <span>{dest.location}</span>
                                    </div>
                                    <p className="text-xs text-white/80 line-clamp-2 md:line-clamp-3 font-medium leading-relaxed">
                                        {dest.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Buttons Footer */}
                            <div className="flex flex-col gap-3 px-2">
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleWhatsAppBook(dest.title);
                                    }}
                                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-[#128C7E]"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl font-medium">No destinations found matching "{searchTerm}".</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Destination Modal */}
            <AnimatePresence>
                {selectedDest && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedDest(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setSelectedDest(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <Image
                                    src={selectedDest.image}
                                    alt={selectedDest.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="px-3 py-1 bg-accent-green text-xs font-bold rounded-full mb-2 inline-block text-white uppercase tracking-wider">
                                        {selectedDest.tag}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedDest.title}</h3>
                                <div className="flex items-center gap-2 text-primary-green font-medium mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span>{selectedDest.location}</span>
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {selectedDest.description} 
                                    <br /><br />
                                    Experience the magic of {selectedDest.title} with our expert guides. 
                                    We handle all the logistics so you can focus on creating memories.
                                </p>

                                <Link href="/packages" className="w-full">
                                    <button 
                                        className="w-full py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-[#128C7E]"
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                        Pick Your Package
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
