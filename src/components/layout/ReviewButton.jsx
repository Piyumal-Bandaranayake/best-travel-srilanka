'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Star, Send } from 'lucide-react';

const ReviewButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        feedback: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, rating }),
            });

            if (response.ok) {
                // Show success state
                setIsSubmitted(true);
                
                // Reset after 3 seconds and close
                setTimeout(() => {
                    setIsOpen(false);
                    setIsSubmitted(false);
                    setRating(0);
                    setFormData({ name: '', country: '', feedback: '' });
                }, 3000);
            } else {
                console.error('Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 left-8 z-40 bg-white text-gray-900 px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all group"
            >
                <div className="w-10 h-10 bg-primary-green/10 rounded-full flex items-center justify-center text-primary-green group-hover:bg-primary-green group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left hidden md:block">
                    <p className="text-xs font-bold text-primary-green uppercase tracking-wider">Feedback</p>
                    <p className="font-bold text-sm">Review Us</p>
                </div>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:justify-start sm:pl-28 md:pl-0 p-4 md:p-0">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 50, scale: 0.95 }}
                            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden md:ml-8 mb-4 md:mb-8"
                        >
                            {/* Header */}
                            <div className="bg-primary-green p-6 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />
                                
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>
                                
                                <h3 className="text-2xl font-black mb-2 relative z-10">We Value Your Opinion</h3>
                                <p className="text-white/90 text-sm relative z-10">Help us improve your travel experience.</p>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {isSubmitted ? (
                                    <div className="text-center py-10">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-600" />
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h4>
                                        <p className="text-gray-500">Your feedback has been submitted successfully.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        {/* Rating Stars */}
                                        <div className="flex flex-col items-center justify-center py-2 mb-4">
                                            <p className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Rate your experience</p>
                                            <div className="flex gap-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        onMouseEnter={() => setHoverRating(star)}
                                                        onMouseLeave={() => setHoverRating(0)}
                                                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                                                    >
                                                        <Star 
                                                            className={`w-8 h-8 ${
                                                                star <= (hoverRating || rating) 
                                                                ? 'fill-yellow-400 text-yellow-400' 
                                                                : 'text-gray-300'
                                                            }`} 
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Name</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none text-sm font-medium text-black"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Country</label>
                                                <input 
                                                    required
                                                    type="text" 
                                                    value={formData.country}
                                                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                                                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none text-sm font-medium text-black"
                                                    placeholder="Your Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Feedback</label>
                                            <textarea 
                                                required
                                                rows={4}
                                                value={formData.feedback}
                                                onChange={(e) => setFormData({...formData, feedback: e.target.value})}
                                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green/10 transition-all outline-none text-sm font-medium resize-none text-black"
                                                placeholder="Tell us what you think..."
                                            />
                                        </div>

                                        <button 
                                            type="submit"
                                            disabled={rating === 0}
                                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-2 ${
                                                rating === 0 
                                                ? 'bg-gray-300 cursor-not-allowed' 
                                                : 'bg-primary-green hover:bg-green-700 hover:shadow-primary-green/25 hover:scale-[1.02] active:scale-[0.98]'
                                            }`}
                                        >
                                            <Send className="w-5 h-5" />
                                            Submit Review
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ReviewButton;
