'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
    Users, 
    Wind, 
    Car,
    CheckCircle,
    MessageCircle
} from 'lucide-react';
import { vehicles } from '@/data/vehicles';

const VehicleSelector = ({ onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (vehicle) => {
        setSelectedId(vehicle.id);
        if (onSelect) {
            onSelect(vehicle);
        }
    };

    const handleBook = (e, vehicle) => {
        e.stopPropagation();
        const phoneNumber = "94701000148"; // Replace with actual business number
        const message = `Hi! I am interested in booking the ${vehicle.model} (${vehicle.type}). Please provide more details.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <section className="py-8 font-sans">
            <div className="mb-8">
                <h3 className="text-3xl font-black text-gray-900">Choose Your Vehicle</h3>
                <p className="text-gray-500 mt-2">Select the perfect ride for your journey.</p>
            </div>

            <div className="flex flex-col gap-4">
                {vehicles.map((vehicle) => {
                    const isSelected = selectedId === vehicle.id;

                    return (
                        <motion.div
                            key={vehicle.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            onClick={() => handleSelect(vehicle)}
                            className={`
                                relative flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden cursor-pointer
                                transition-all duration-300 border-2
                                ${isSelected 
                                    ? 'border-green-600 shadow-xl ring-2 ring-green-600/10' 
                                    : 'border-gray-100 shadow-md hover:shadow-lg hover:border-green-200'
                                }
                            `}
                        >
                            {/* Selection Checkmark */}
                            {isSelected && (
                                <div className="absolute top-4 right-4 z-20 text-green-600 bg-green-50 rounded-full p-1">
                                    <CheckCircle className="w-6 h-6 fill-current" />
                                </div>
                            )}

                            {/* Left Side: Image */}
                            <div className="md:w-1/3 relative h-48 md:h-auto min-h-[180px] bg-gray-50">
                                {vehicle.image && !vehicle.image.includes('placeholder') ? (
                                    <Image 
                                        src={vehicle.image} 
                                        alt={vehicle.type} 
                                        fill 
                                        className="object-contain p-4"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <Car className="w-16 h-16 mb-2 text-gray-300" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">No Image</span>
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Content */}
                            <div className="flex-1 p-5 md:p-6 flex flex-col justify-center">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                                            {vehicle.model}
                                        </h4>
                                        <p className="text-gray-500 text-sm font-medium">{vehicle.type}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg md:text-xl font-bold text-gray-900">{vehicle.pricePerKm}</div>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div className="flex items-center gap-6 mt-4 text-gray-600 mb-6">
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <Users className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium">{vehicle.capacity || (vehicle.specs?.seats ? vehicle.specs.seats + ' Seats' : '')}</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                        <Wind className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-medium">Air Conditioned</span>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={(e) => handleBook(e, vehicle)}
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Book This Vehicle
                                </button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default VehicleSelector;
