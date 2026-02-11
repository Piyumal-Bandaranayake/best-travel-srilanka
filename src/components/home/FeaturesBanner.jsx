'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Headphones, 
    ShieldCheck, 
    Sparkles 
} from 'lucide-react';

const features = [
    {
        icon: <Users className="w-8 h-8" />,
        title: "Expert Local Guides",
        description: "Explore Sri Lanka with our knowledgeable and friendly local experts."
    },
    {
        icon: <Headphones className="w-8 h-8" />,
        title: "24/7 Support",
        description: "We are always here for you, ensuring a seamless travel experience."
    },
    {
        icon: <Sparkles className="w-8 h-8" />,
        title: "Tailor-Made Tours",
        description: "Customized itineraries designed to match your unique preferences."
    },
    {
        icon: <ShieldCheck className="w-8 h-8" />,
        title: "Safe & Secure",
        description: "Travel with peace of mind knowing your safety is our top priority."
    }
];

const FeaturesBanner = () => {
    return (
        <section className="py-20 bg-primary-green text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 group"
                        >
                            <div className="w-16 h-16 mx-auto bg-white text-primary-green rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesBanner;
