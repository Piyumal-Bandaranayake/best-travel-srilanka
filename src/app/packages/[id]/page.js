'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { notFound } from 'next/navigation';
import { packages } from '@/data/packages'; // Adjust path if necessary
import { MapPin, MessageCircle } from 'lucide-react';
import VehicleSelector from '@/components/packages/VehicleSelector';
import SafariCard from '@/components/packages/SafariCard';
import BeachActivityCard from '@/components/packages/BeachActivityCard';
import HotelRestaurantCard from '@/components/packages/HotelRestaurantCard';

export default function PackageDetailsPage({ params }) {
    // In Next.js 13+ app directory (and recent 15+), params is a promise in some contexts or an object. 
    // Assuming standard usage for now but using React.use() if async is required in strictly new builds would be ideal.
    // However, simplest compatible way:
    const { id } = React.use(params);
    const pkg = packages.find(p => p.id === parseInt(id));

    if (!pkg) {
        notFound();
    }

    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleWhatsAppBook = () => {
        const phoneNumber = "+94700000000";
        let message = `Hi! I would like to book the package: ${pkg.title}.`;
        
        if (selectedVehicle) {
            message += `\nI am interested in the ${selectedVehicle.model} (${selectedVehicle.type}).`;
        }
        
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Hero Image Section */}
            <section className="relative h-[60vh] w-full">
                <Image 
                    src={pkg.image} 
                    alt={pkg.title} 
                    fill 
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {pkg.tag && (
                            <span className="inline-block px-4 py-1.5 bg-green-500 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                {pkg.tag}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-6xl font-black mb-4">{pkg.title}</h1>
                        {pkg.location && (
                             <div className="flex items-center gap-2 text-xl font-medium text-white/90">
                                <MapPin className="w-6 h-6 text-green-400" />
                                <span>{pkg.location}</span>
                            </div>
                        )}
                       
                    </motion.div>
                </div>
            </section>

            <div className={`max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 ${(pkg.showSafariList || pkg.showBeachList || pkg.showHotelList) ? '' : 'lg:grid-cols-3'} gap-12`}>
                {/* Main Content */}
                <div className={`${(pkg.showSafariList || pkg.showBeachList || pkg.showHotelList) ? 'w-full' : 'lg:col-span-2'}`}>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Description</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {pkg.description || "No description available for this package."}
                    </p>

                    {pkg.showVehicleSelector && (
                        <div className="mt-10">
                            <VehicleSelector onSelect={setSelectedVehicle} />
                        </div>
                    )}

                    {pkg.showSafariList && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">Popular National Parks</h3>
                            <SafariCard />
                        </div>
                    )}

                    {pkg.showBeachList && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">Popular Beach Activities</h3>
                            <BeachActivityCard />
                        </div>
                    )}

                    {pkg.showHotelList && (
                        <div className="mt-10">
                            <h3 className="text-2xl font-bold mb-6 text-gray-900">Recommended Stays & Dining</h3>
                            <HotelRestaurantCard />
                        </div>
                    )}
                    
                    {/* Add more details here if available in data, e.g., itinerary, inclusions */}
                </div>

                {/* Sidebar / Booking Card - Only show if NOT safari, beach, or hotel list */}
                {(!pkg.showSafariList && !pkg.showBeachList && !pkg.showHotelList) && (
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 text-gray-900">Book This Tour</h3>
                            <p className="text-gray-500 mb-8 text-sm">
                                Interested in this package? Contact us directly via WhatsApp to customize and book.
                            </p>
                            <button 
                                onClick={handleWhatsAppBook}
                                className="w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold text-lg shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Book {pkg.title}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
