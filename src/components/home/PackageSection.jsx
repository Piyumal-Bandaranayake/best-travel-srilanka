'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Package } from 'lucide-react';
import ActivityCard from '@/components/packages/ActivityCard';
import { packages } from '@/data/packages';

const PackageSection = () => {
    // Show only the first 3 packages
    const displayedPackages = packages.slice(0, 3);

    return (
        <section className="bg-gray-50 py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-full bg-primary-green/5 flex items-center justify-center border border-primary-green/20">
                            <Package className="w-6 h-6 text-primary-green" />
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Our Packages</h2>
                            <p className="text-gray-500 font-medium">Curated experiences for every traveler.</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {displayedPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="h-full"
                        >
                            <ActivityCard 
                                activity={pkg}
                                buttonText="View Package"
                            />
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link href="/packages">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="px-8 py-4 bg-white text-[#25D366] border-2 border-[#25D366]/20 rounded-full font-bold text-sm hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-lg hover:shadow-green-600/25 active:scale-95 inline-block"
                        >
                            Explore More Packages
                        </motion.button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PackageSection;
