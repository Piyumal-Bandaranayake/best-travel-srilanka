'use client';

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const InteractiveMap = () => {
    const sriLankaCoords = { lat: 7.8731, lng: 80.7718 };
    const [selectedPlace, setSelectedPlace] = useState(null);

    const locations = [
        {
            key: 'sigiriya',
            position: { lat: 7.9570, lng: 80.7603 },
            title: 'Sigiriya Rock',
            image: '/sigirya.jpg',
            tag: 'Historical'
        },
        {
            key: 'ella',
            position: { lat: 6.8667, lng: 81.0466 },
            title: 'Nine Arch Bridge',
            image: '/9arch.jpg',
            tag: 'Scenic'
        },
        {
            key: 'mirissa',
            position: { lat: 5.9482, lng: 80.4593 },
            title: 'Mirissa Beach',
            image: '/mirissa%20beach.jpg',
            tag: 'Coastal'
        },
        {
            key: 'kandy',
            position: { lat: 7.2906, lng: 80.6337 },
            title: 'Temple of the Tooth',
            image: '/kandy.jpg', // Assuming you have or will add this image
            tag: 'Cultural'
        }
    ];

    const handleWhatsAppBook = (title) => {
        const phoneNumber = "+94700000000";
        const message = `Hi! I would like to book a tour for ${title} via your website map.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

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
                    className="h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative"
                >
                    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
                        <Map
                            defaultCenter={sriLankaCoords}
                            defaultZoom={8}
                            mapId="DEMO_MAP_ID" // You should replace this with a real Map ID from Google Cloud Console for optimizations
                            disableDefaultUI={true}
                            styles={[
                                {
                                    "featureType": "all",
                                    "elementType": "geometry",
                                    "stylers": [{ "color": "#f5f5f5" }]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "geometry",
                                    "stylers": [{ "color": "#e9e9e9" }]
                                },
                                {
                                    "featureType": "water",
                                    "elementType": "labels.text.fill",
                                    "stylers": [{ "color": "#9e9e9e" }]
                                }
                            ]}
                        >
                            {locations.map((loc) => (
                                <AdvancedMarker
                                    key={loc.key}
                                    position={loc.position}
                                    onClick={() => setSelectedPlace(loc)}
                                >
                                    <div className="group relative">
                                        <div className="absolute -inset-2 bg-primary-green/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <Pin background={'#064E3B'} glyphColor={'#FFF'} borderColor={'#064E3B'} />
                                    </div>
                                </AdvancedMarker>
                            ))}

                            {selectedPlace && (
                                <InfoWindow
                                    position={selectedPlace.position}
                                    onCloseClick={() => setSelectedPlace(null)}
                                    pixelOffset={[0, -40]}
                                >
                                    <div className="w-64 p-2 bg-white rounded-2xl">
                                        <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                                             <Image 
                                                src={selectedPlace.image} 
                                                alt={selectedPlace.title}
                                                fill
                                                className="object-cover"
                                                sizes="256px"
                                            />
                                            <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-[10px] font-bold text-primary-green uppercase tracking-wide">
                                                {selectedPlace.tag}
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-gray-900 text-lg mb-1">{selectedPlace.title}</h3>
                                        <div className="flex items-center gap-1 text-gray-500 text-xs font-medium mb-3">
                                            <MapPin className="w-3 h-3 text-primary-green" />
                                            <span>Sri Lanka</span>
                                        </div>
                                        <button 
                                            onClick={() => handleWhatsAppBook(selectedPlace.title)}
                                            className="w-full py-2 bg-primary-green text-white rounded-lg font-bold text-xs shadow-lg shadow-primary-green/20 hover:bg-primary-green/90 transition-all flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle className="w-3 h-3" />
                                            Book Now
                                        </button>
                                    </div>
                                </InfoWindow>
                            )}
                        </Map>
                    </APIProvider>
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveMap;
