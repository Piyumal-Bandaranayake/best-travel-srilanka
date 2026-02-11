'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, MapPin, Calendar, Award } from 'lucide-react';
import { guides } from '@/data/guides';

const Team = () => {
    // Since there's only one guide, we'll take the first one
    const guide = guides[0];

    if (!guide) return null;

    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-primary-green font-bold text-lg mb-2 uppercase tracking-wide">Your Travel Companion</h2>
                <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">Meet Your Expert Guide</h3>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100"
            >
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-[500px] md:h-auto min-h-[500px] bg-gray-100 group overflow-hidden">
                        <Image 
                            src={guide.image} 
                            alt={guide.name} 
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent md:hidden" />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-10 md:p-16 flex flex-col justify-center bg-white relative">
                        {/* Decorative quote mark */}
                        <div className="absolute top-10 right-10 text-9xl font-serif text-primary-green/5 leading-none select-none">
                            &rdquo;
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-primary-green/10 text-primary-green rounded-full text-sm font-bold uppercase tracking-wider">
                                    {guide.role}
                                </span>
                                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-sm font-bold text-gray-700">5.0 Rating</span>
                                </div>
                            </div>

                            <h4 className="text-4xl font-black text-gray-900 mb-6 leading-tight">
                                {guide.name}
                            </h4>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {guide.bio}
                            </p>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-blue/10 flex items-center justify-center shrink-0">
                                        <Award className="w-6 h-6 text-primary-blue" />
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-gray-900">Certified Professional</h5>
                                        <p className="text-gray-500 text-sm">Licensed by Sri Lanka Tourism Board</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-accent-green/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-6 h-6 text-accent-green" />
                                    </div>
                                    <div>
                                        <h5 className="text-lg font-bold text-gray-900">10+ Years Experience</h5>
                                        <p className="text-gray-500 text-sm">Guiding happy travelers since 2015</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Specialized In</p>
                                <div className="flex flex-wrap gap-3">
                                    {guide.specialties.map((spec, i) => (
                                        <span key={i} className="px-5 py-2 bg-gray-50 text-gray-700 text-sm font-bold rounded-xl border border-gray-100 hover:bg-white hover:shadow-md transition-all">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Team;
