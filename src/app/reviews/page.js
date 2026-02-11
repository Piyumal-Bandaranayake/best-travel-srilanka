'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('/api/reviews', { cache: 'no-store' });
                const data = await response.json();
                if (data.success) {
                    setReviews(data.data);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <main className="min-h-screen bg-gray-50 pb-24">
            {/* Header */}
            <section className="bg-primary-green text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/30">
                            Customer Love
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">What Travelers Say</h1>
                        <p className="text-white/90 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
                            Read about the unforgettable journeys and experiences our travelers have had in Sri Lanka.
                        </p>
                    </motion.div>
                </div>
            </section>
            
            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-12 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                        <Link href="/" className="p-3 hover:bg-gray-100 rounded-full transition-colors group">
                            <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-primary-green" />
                        </Link>
                        <div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Reviews</p>
                            <p className="text-2xl font-black text-gray-900">{reviews.length} Stories</p>
                        </div>
                   </div>
                   {/* Optional: Add filter or search here later */}
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 h-80 animate-pulse">
                                <div className="h-4 bg-gray-100 rounded w-1/3 mb-6" />
                                <div className="h-4 bg-gray-100 rounded w-full mb-3" />
                                <div className="h-4 bg-gray-100 rounded w-full mb-3" />
                                <div className="h-4 bg-gray-100 rounded w-2/3 mb-8" />
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full" />
                                    <div>
                                        <div className="h-3 bg-gray-100 rounded w-20 mb-2" />
                                        <div className="h-3 bg-gray-100 rounded w-12" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <motion.div
                                    key={review._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:shadow-gray-200 border border-gray-100 relative group transition-all"
                                >
                                    <div className="absolute top-8 right-8 text-primary-green/10 group-hover:text-primary-green/20 transition-colors">
                                        <Quote className="w-10 h-10 fill-current" />
                                    </div>

                                    <div className="flex gap-1 mb-6">
                                        {[...Array(review.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>

                                    <p className="text-gray-600 font-medium leading-relaxed mb-8 relative z-10 min-h-[80px]">
                                        "{review.feedback}"
                                    </p>

                                    <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-green to-primary-blue flex items-center justify-center text-white font-bold text-lg shadow-lg uppercase">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                                            <p className="text-sm text-gray-400 font-medium">{review.country}</p>
                                        </div>
                                        <div className="ml-auto text-xs text-gray-300 font-medium">
                                            {new Date(review.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20">
                                <p className="text-xl text-gray-500 font-medium">No reviews yet. Be the first to share your experience!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
