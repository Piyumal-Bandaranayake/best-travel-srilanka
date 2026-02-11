'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Heart, CheckCircle } from 'lucide-react';

const WhyChooseUs = () => {
    return (
        <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-primary-green font-bold text-lg mb-2">WHY CHOOSE US</h2>
                <h3 className="text-4xl font-bold text-gray-900">We Make Your Travel Dream Reality</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { icon: <Globe className="w-8 h-8 text-white" />, title: "Local Expertise", desc: "Our team consists of locals who know every corner of the island.", color: "bg-primary-green" },
                    { icon: <Heart className="w-8 h-8 text-white" />, title: "Personalized Care", desc: "We treat every traveler like family, ensuring a safe and comfortable journey.", color: "bg-primary-blue" },
                    { icon: <CheckCircle className="w-8 h-8 text-white" />, title: "Best Value", desc: "Transparent pricing with no hidden costs. You get the best value for your money.", color: "bg-accent-green" }
                ].map((item, index) => (
                    <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
                    >
                        <div className={`${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                            {item.icon}
                        </div>
                        <h4 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
        </section>
    );
};

export default WhyChooseUs;
