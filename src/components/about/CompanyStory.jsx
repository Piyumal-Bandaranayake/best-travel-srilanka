'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CompanyStory = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-16 items-center"
            >
                <div className="space-y-8">
                    <motion.div variants={itemVariants}>

                        <h1 className="text-primary-green font-bold text-xl mb-2">OUR STORY</h1>
                        <h3 className="text-4xl font-bold text-gray-900 mb-8">Experience the Real Sri Lanka with Us</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Best Travel Sri Lanka was born from a passion for sharing the island's unique beauty with the world. 
                            We define ourselves not just as a travel agency, but as your local companion, dedicated to showing you 
                            the authentic soul of our country. From the misty mountains of Ella to the pristine beaches of Mirissa, 
                            we curate experiences that linger in your memory forever.
                        </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <span className="text-4xl font-bold text-primary-green block mb-2">5+</span>
                            <span className="text-gray-600 font-medium">Years of Experience</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <span className="text-4xl font-bold text-primary-blue block mb-2">1k+</span>
                            <span className="text-gray-600 font-medium">Happy Travelers</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <span className="text-4xl font-bold text-accent-green block mb-2">100%</span>
                            <span className="text-gray-600 font-medium">Tailor-Made Tours</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                            <span className="text-4xl font-bold text-accent-blue block mb-2">24/7</span>
                            <span className="text-gray-600 font-medium">Support</span>
                        </div>
                    </motion.div>
                </div>

                <motion.div variants={itemVariants} className="relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image 
                            src="/mirissa.jpg"
                            alt="Experiencing Sri Lanka" 
                            width={600}
                            height={800}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-green/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-blue/10 rounded-full blur-3xl -z-10" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default CompanyStory;
