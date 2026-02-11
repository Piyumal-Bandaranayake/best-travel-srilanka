'use client';
import Link from 'next/link';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, MessageCircle, Eye } from 'lucide-react';

const ActivityCard = ({ activity, onClick, onBook, buttonText = "View Details", noLink = false, subtitle, hideDescription = false }) => {
    const CardContent = (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group flex flex-col cursor-pointer h-full"
            onClick={onClick}
        >
            <div className="relative h-[450px] rounded-[40px] overflow-hidden shadow-2xl mb-6 bg-gray-100">
                <Image 
                    src={activity.image} 
                    alt={activity.title}
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
                
                    <h3 className="text-3xl font-black mb-2 tracking-tight leading-none">{activity.title}</h3>
                    {subtitle && (
                        <div className="flex items-center gap-2 text-white/70 font-medium mb-4">
                            <MapPin className="w-4 h-4" />
                            {subtitle}
                        </div>
                    )}
                    
                </div>
            </div>
            
            {/* Buttons Footer */}
            <div className="flex flex-col gap-3 px-2 mt-auto">
                <button 
                    onClick={(e) => {
                        if (onBook) {
                            e.preventDefault();
                            e.stopPropagation();
                            onBook(activity);
                        }
                    }}
                    className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm shadow-xl shadow-green-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 hover:bg-[#128C7E]"
                >
                    {buttonText === "Book Safari" ? <MessageCircle className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    {buttonText}
                </button>
            </div>
        </motion.div>
    );

    if (noLink) {
        return <div className="h-full">{CardContent}</div>;
    }

    return (
        <Link href={`/packages/${activity.id}`}>
            {CardContent}
        </Link>
    );
};

export default ActivityCard;
