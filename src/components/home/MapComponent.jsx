'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mapLocations } from '@/data/locations';

// Fix for default marker icon in Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MapComponent = () => {
    const center = [7.8731, 80.7718]; // Center of Sri Lanka

    return (
        <div className="h-[600px] w-full rounded-[40px] overflow-hidden shadow-2xl border border-gray-100 relative z-0">
            <MapContainer 
                center={center} 
                zoom={8} 
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {mapLocations.map((location) => (
                    <Marker 
                        key={location.id} 
                        position={location.position}
                        icon={customIcon}
                    >
                        <Popup className="font-outfit">
                            <div className="text-center">
                                <h3 className="font-bold text-gray-900 text-sm">{location.title}</h3>
                                <p className="text-xs text-gray-500">{location.category}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>


        </div>
    );
};

export default MapComponent;
