'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, MessageCircle, Search } from 'lucide-react';
import { activities } from '@/data/activities';
import ActivityCard from '@/components/activities/ActivityCard';

export default function ActivitiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [activeFilter, setActiveFilter] = useState('All');

    const filters = [
        { name: 'All', label: 'All Activities' },
        { name: 'Water Sports', label: 'Water Sports' },
        { name: 'Wildlife', label: 'Wildlife' },
        { name: 'Adventure', label: 'Adventure' },
        { name: 'Scenic', label: 'Scenic' }
    ];

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "+94700000000"; // Placeholder number
        const message = `Hi! I would like to book the activity: ${title}.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const filteredActivities = activities.filter(act => {
        const matchesSearch = 
            act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            act.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            act.tag.toLowerCase().includes(searchTerm.toLowerCase());

        if (!matchesSearch) return false;

        if (activeFilter === 'All') return true;
        return act.tag === activeFilter;
    });

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] h-auto flex items-center justify-center text-center text-white px-6 py-20 overflow-hidden">
                <div className="absolute inset-0">
                    <Image 
                        src="/mirissa%20beach.jpg" 
                        alt="Sri Lanka Activities" 
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
                            Explore Our Activities
                        </h1>
                        <p className="text-white/90 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed drop-shadow-md mb-10">
                            From adrenaline-pumping adventures to serene nature escapes, find the perfect activity to make your Sri Lanka trip unforgettable.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative group mb-8">
                            <input 
                                type="text" 
                                placeholder="Search activities, locations..." 
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
                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredActivities.length > 0 ? (
                        filteredActivities.map((act, index) => (
                            <ActivityCard 
                                key={act.id || index}
                                activity={act}
                                onClick={setSelectedActivity}
                                onBook={handleWhatsAppBook}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 text-gray-500">
                            <p className="text-xl font-medium">No activities found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Activity Modal */}
            <AnimatePresence>
                {selectedActivity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedActivity(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative"
                        >
                            <button 
                                onClick={() => setSelectedActivity(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <Image
                                    src={selectedActivity.image}
                                    alt={selectedActivity.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="px-3 py-1 bg-accent-green text-xs font-bold rounded-full mb-2 inline-block text-white uppercase tracking-wider">
                                        {selectedActivity.tag}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                                <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedActivity.title}</h3>
                                <div className="flex items-center gap-2 text-primary-green font-medium mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span>{selectedActivity.location}</span>
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                                    {selectedActivity.description} 
                                    <br /><br />
                                    Book your {selectedActivity.title} experience today with our expert guides!
                                </p>

                                <button 
                                    onClick={() => handleWhatsAppBook(selectedActivity.title)}
                                    className="w-full py-4 bg-primary-green text-white rounded-xl font-bold text-lg shadow-xl shadow-primary-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book This Activity
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
