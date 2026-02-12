'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '@/data/galleryData';
import { X } from 'lucide-react';

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const getSpanClass = (index) => {
        // Pattern: 2 rows cycle
        // Row 1: Item 1 (Span 2), Item 2 (Span 1)
        // Row 2: Item 3 (Span 1), Item 4 (Span 1), Item 5 (Span 1)
        const cycleIndex = index % 5;
        if (cycleIndex === 0) return 'md:col-span-2 row-span-2 md:row-span-1 aspect-[16/10]';
        if (cycleIndex === 1) return 'md:col-span-1 aspect-[4/5]';
        return 'md:col-span-1 aspect-[4/5]';
    };

    return (
        <div className="min-h-screen bg-white font-outfit pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-16">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/Bentota.jpg" 
                        alt="Gallery Hero" 
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
                
                <div className="relative z-10 text-center text-white px-4">
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                    >
                        Our Gallery
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-gray-200"
                    >
                        Moments captured in time
                    </motion.p>
                </div>
            </section>

            {/* Gallery Content */}
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Collection</h2>
                        <h3 className="text-3xl text-gray-900 font-medium">All Albums</h3>
                    </div>
                    <div className="hidden md:block text-gray-500 text-sm">
                        {galleryImages.length} photos
                    </div>
                </div>

                {/* Grid */}
                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8"
                >
                    <AnimatePresence>
                        {galleryImages.slice(0, visibleCount).map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className={`relative group cursor-pointer overflow-hidden bg-gray-100 ${getSpanClass(index)}`}
                                onClick={() => setSelectedImage(image)}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-gray-900 font-medium text-sm tracking-wide uppercase">{image.category}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Load More */}
                {visibleCount < galleryImages.length && (
                    <div className="flex justify-center mt-16">
                        <button 
                            onClick={handleLoadMore}
                            className="group relative px-8 py-3 bg-gray-900 text-white text-sm font-medium tracking-widest hover:bg-gray-800 transition-colors"
                        >
                            LOAD MORE
                            <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gray-900 transition-all group-hover:w-full"></span>
                        </button>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={40} strokeWidth={1} />
                        </button>
                        
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-6xl w-full h-[85vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            
                            <div className="absolute bottom-0 left-0 p-8 text-white text-left w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <h3 className="text-3xl font-light mb-2">{selectedImage.location}</h3>
                                <p className="text-gray-300 font-light tracking-wide">{selectedImage.alt}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
