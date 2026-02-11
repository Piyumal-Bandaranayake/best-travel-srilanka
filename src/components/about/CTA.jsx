'use client';

import React from 'react';
import Image from 'next/image';

const CTA = () => {
    return (
        <section className="py-20 bg-primary-green relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                    <Image 
                    src="/sigirya.jpg" 
                    alt="Background pattern" 
                    fill
                    className="object-cover"
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Adventure?</h2>
                <p className="text-white/80 text-xl mb-10">
                    Let us guide you through the wonders of Sri Lanka. Contact us today to plan your dream vacation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-primary-green font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                        Contact Us Now
                    </button>

                </div>
            </div>
        </section>
    );
};

export default CTA;
