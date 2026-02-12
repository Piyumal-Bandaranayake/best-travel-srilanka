'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import the MapComponent with SSR disabled
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="h-[600px] w-full rounded-[40px] bg-gray-100 animate-pulse flex items-center justify-center text-gray-400">
            Loading Map...
        </div>
    )
});

const InteractiveMap = () => {
    return (
        <section className="bg-white py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Explore Our Routes</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
                            Visualise your journey across the island's most iconic locations.
                        </p>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <MapComponent />
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveMap;
