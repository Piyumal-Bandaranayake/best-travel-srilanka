'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, MessageCircle, Utensils, BedDouble } from 'lucide-react';
import Image from 'next/image';
import { hotelPackages } from '@/data/hotelPackages';
import ActivityCard from './ActivityCard';

const HotelRestaurantCard = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleBook = (item) => {
        const phoneNumber = "94701000148";
        const message = `Hi! I am interested in inquiring about: ${item.title} (${item.type}).`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {hotelPackages.map((item) => (
                    <div key={item.id} className="h-full">
                        <ActivityCard 
                            activity={item} 
                            noLink={true}
                            buttonText="View Details"
                            onBook={() => setSelectedItem(item)}
                            onClick={() => setSelectedItem(item)}
                            subtitle={item.location}
                            hideDescription={true}
                        />
                    </div>
                ))}
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row"
                        >
                            <button 
                                onClick={() => setSelectedItem(null)}
                                className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-colors"
                            >
                                <X className="w-6 h-6 text-white md:text-gray-800" />
                            </button>

                            {/* Image Section */}
                            <div className="relative w-full md:w-1/2 h-64 md:h-auto">
                                <Image 
                                    src={selectedItem.image} 
                                    alt={selectedItem.title}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent md:hidden" />
                                <div className="absolute bottom-4 left-4 text-white md:hidden">
                                     <h3 className="text-2xl font-bold">{selectedItem.title}</h3>
                                     <div className="flex items-center gap-1 text-sm text-white/80">
                                        <MapPin className="w-4 h-4" />
                                        {selectedItem.location}
                                     </div>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:w-1/2 overflow-y-auto">
                                <div className="hidden md:block mb-6">
                                    <h3 className="text-3xl font-black text-gray-900 mb-2">{selectedItem.title}</h3>
                                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                                        <MapPin className="w-5 h-5 text-orange-500" />
                                        {selectedItem.location}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        {selectedItem.type === 'Dining' ? 
                                            <Utensils className="w-5 h-5 text-gray-400 mb-2" /> : 
                                            <BedDouble className="w-5 h-5 text-gray-400 mb-2" />
                                        }
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Category</p>
                                        <p className="font-semibold text-gray-900">{selectedItem.type}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <DollarSign className="w-5 h-5 text-gray-400 mb-2" />
                                        <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Price Range</p>
                                        <p className="font-semibold text-gray-900">{selectedItem.price}</p>
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold text-gray-900 mb-3">Description</h4>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {selectedItem.description}
                                </p>

                                <button 
                                    onClick={() => handleBook(selectedItem)}
                                    className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-lg shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Inquire via WhatsApp
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default HotelRestaurantCard;
