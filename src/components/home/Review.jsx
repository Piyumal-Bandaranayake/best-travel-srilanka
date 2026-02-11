'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Review = () => {
    const reviews = [
        {
            name: 'Sarah Johnson',
            location: 'United Kingdom',
            rating: 5,
            text: "The most incredible experience of my life! The team took care of every detail, from the airport pickup to the amazing hotels. Sri Lanka is truly a paradise.",
            image: '/avatars/sarah.jpg' // Placeholder, will rely on initials if not found or handled essentially
        },
        {
            name: 'Michael Chen',
            location: 'Singapore',
            rating: 5,
            text: "Professional, friendly, and knowledgeable guides. We saw elephants in the wild, hiked Sigiriya, and relaxed on pristine beaches. Highly recommended!",
            image: '/avatars/michael.jpg'
        },
        {
            name: 'Emma & Tom',
            location: 'Australia',
            rating: 5,
            text: "We booked a 10-day honeymoon tour and it was perfect. The itinerary was well-paced and the personalized touches made it so special. Thank you!",
            image: '/avatars/emma.jpg'
        }
    ];

    return (
        <section className="bg-gray-50 py-24 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Traveler Stories</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
                            Real experiences from travelers who explored Sri Lanka with us.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-100 border border-gray-100 relative group"
                        >
                            <div className="absolute top-8 right-8 text-primary-green/10 group-hover:text-primary-green/20 transition-colors">
                                <Quote className="w-10 h-10 fill-current" />
                            </div>

                            <div className="flex gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>

                            <p className="text-gray-600 font-medium leading-relaxed mb-8 relative z-10">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary-green to-primary-blue flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                                    <p className="text-sm text-gray-400 font-medium">{review.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="px-8 py-4 bg-white text-primary-green border-2 border-primary-green/20 rounded-full font-bold text-sm hover:bg-primary-green hover:text-white transition-all duration-300 shadow-lg hover:shadow-primary-green/25 active:scale-95"
                    >
                        Read More Reviews
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Review;
