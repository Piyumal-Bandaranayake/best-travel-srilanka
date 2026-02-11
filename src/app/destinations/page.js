'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle, Search } from 'lucide-react';
import { destinations } from '@/data/destinations';

export default function DestinationsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDest, setSelectedDest] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = [
        { name: 'All', label: 'All Locations' },
        { name: 'Beach Side', label: 'Beach Side' },
        { name: 'Up Country', label: 'Up Country' },
        { name: 'Down South', label: 'Down South' },
        { name: 'Wild Parks', label: 'Wild Parks' },
        { name: 'Heritage', label: 'Ancient Heritage' }
    ];

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "+94700000000"; // Placeholder number
        const message = `Hi! I would like to book a tour for ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredDestinations = destinations.filter(dest => {
        const matchesSearch = 
            dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dest.tag.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (activeFilter === 'All') return true;
        if (activeFilter === 'Beach Side') return dest.tag === 'Coastal';
        if (activeFilter === 'Up Country') return dest.location.includes('Kandy') || dest.location.includes('Ella') || dest.location.includes('Highlands');
        if (activeFilter === 'Down South') return dest.location.includes('Galle') || dest.location.includes('Mirissa') || dest.location.includes('Southern');
        if (activeFilter === 'Wild Parks') return dest.tag === 'Wildlife';
        if (activeFilter === 'Heritage') return dest.tag === 'Historical' || dest.tag === 'Heritage' || dest.tag === 'Cultural';
        
        return true;
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

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative group mb-8">
                            <input 
                                type="text" 
                                placeholder="Search destinations, locations..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-4 pl-12 pr-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all font-medium"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70" />
                        </div>

                        {/* Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {filters.map((filter) => (
                                <button
                                    key={filter.name}
                                    onClick={() => setActiveFilter(filter.name)}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 backdrop-blur-md border ${
                                        activeFilter === filter.name 
                                        ? 'bg-primary-green text-white border-primary-green shadow-lg shadow-primary-green/25 scale-105' 
                                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                    }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-24">
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
                                    className="w-full py-4 bg-primary-green text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book Now
                                </button>
                            </div>
                        </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl font-medium">No destinations found matching your search.</p>
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

                                <button 
                                    onClick={() => handleWhatsAppBook(selectedDest.title)}
                                    className="w-full py-4 bg-primary-green text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book Your Tour Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
