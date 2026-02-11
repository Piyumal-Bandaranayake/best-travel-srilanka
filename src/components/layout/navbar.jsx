'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Home, MapPin, Briefcase, Info, Image as ImageIcon, ChevronRight, Waves, Sparkles, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const handleWhatsAppBook = () => {
        const phoneNumber = "+94700000000";
        const message = "Hi! I'm interested in booking a tour with Best Travel Sri Lanka.";
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const navItems = [
        { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
        { name: 'Destinations', href: '/destinations', icon: <MapPin className="w-4 h-4" /> },
        { name: 'Service', href: '/services', icon: <Briefcase className="w-4 h-4" /> },
        { name: 'About', href: '/about', icon: <Info className="w-4 h-4" /> },
        { name: 'Gallery', href: '/gallery', icon: <ImageIcon className="w-4 h-4" /> },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 font-outfit ${
                scrolled 
                ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-lg py-3' 
                : 'bg-transparent py-6'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" className="flex items-center group">
                    
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`group relative text-sm font-bold transition-all duration-300 flex items-center space-x-1 ${
                                scrolled ? 'text-gray-900' : 'text-white'
                            }`}
                        >
                            <span>{item.name}</span>
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-green transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                    
                    <button 
                        onClick={handleWhatsAppBook}
                        className="px-6 py-3 bg-primary-green text-white rounded-full font-bold text-sm shadow-xl shadow-primary-green/20 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        Book Now
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl mt-4 rounded-2xl mx-2"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="font-semibold">{item.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </Link>
                            ))}
                            <div className="pt-4">
                                <button className="w-full py-4 bg-linear-to-r from-primary-green to-primary-blue text-white rounded-xl font-bold shadow-lg">
                                    Book Your Adventure
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
