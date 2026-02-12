'use client';

import React, { useState } from 'react';
import ActivityCard from './ActivityCard';
import { beachPackages } from '@/data/beachPackages';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, DollarSign, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const BeachActivityCard = () => {
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleBook = (activity) => {
        const phoneNumber = "94701000148";
        const message = `Hi! I am interested in booking the Beach Activity: ${activity.title} (${activity.location}).`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {beachPackages.map((activity) => (
                    <div key={activity.id} className="h-full">
                        <ActivityCard 
                            activity={activity} 
                            noLink={true}
                            buttonText="View Details"
                            onBook={() => setSelectedActivity(activity)}
                            onClick={() => setSelectedActivity(activity)}
                            subtitle={activity.location}
                            hideDescription={true}
                        />
                    </div>
                ))}
            </div>

            {/* Activity Details Modal */}
            <AnimatePresence>
                {selectedActivity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedActivity(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button 
                                onClick={() => setSelectedActivity(null)}
                                className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                            >
                                <X className="w-6 h-6 text-white md:text-gray-800" />
                            </button>

                            {/* Image Section */}
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <Image 
                                    src={selectedActivity.image} 
                                    alt={selectedActivity.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden" />
                                <div className="absolute bottom-4 left-4 text-white md:hidden">
                                     <h3 className="text-2xl font-bold">{selectedActivity.title}</h3>
                                     <div className="flex items-center gap-1 text-sm text-white/80">
                                        <MapPin className="w-4 h-4" />
                                        {selectedActivity.location}
                                     </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:w-1/2 overflow-y-auto">
                                <div className="hidden md:block mb-6">
                                    <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedActivity.title}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <MapPin className="w-5 h-5 text-blue-500" />
                                        {selectedActivity.location}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <Clock className="w-5 h-5 text-gray-400 mb-2" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Duration</p>
                                        <p className="font-semibold text-gray-900">{selectedActivity.duration}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <DollarSign className="w-5 h-5 text-gray-400 mb-2" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Price</p>
                                        <p className="font-semibold text-gray-900">{selectedActivity.price}</p>
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 mb-3">About this Activity</h4>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {selectedActivity.description}
                                </p>

                                <button 
                                    onClick={() => handleBook(selectedActivity)}
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-lg shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book Now via WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BeachActivityCard;
