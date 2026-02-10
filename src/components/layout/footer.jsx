'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    Facebook, 
    Instagram, 
    Twitter, 
    Linkedin, 
    Mail, 
    Phone, 
    MapPin, 
    Waves, 
    ArrowUpRight,
    Send
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Explore',
            links: [
                { name: 'Home', href: '/' },
                { name: 'Destinations', href: '/destinations' },
                { name: 'Tours', href: '/tours' },
                { name: 'Gallery', href: '/gallery' },
            ]
        },
        {
            title: 'Support',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'FAQs', href: '/faqs' },
                { name: 'Contact', href: '/contact' },
                { name: 'Privacy Policy', href: '/privacy' },
            ]
        }
    ];

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: '#' },
        { icon: <Instagram className="w-5 h-5" />, href: '#' },
        { icon: <Twitter className="w-5 h-5" />, href: '#' },
        { icon: <Linkedin className="w-5 h-5" />, href: '#' },
    ];

    return (
        <footer className="bg-gray-900 text-white font-outfit pt-24 pb-12 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="w-12 h-12 bg-primary-green rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-green/20 transform group-hover:rotate-6 transition-all duration-500">
                                <Waves className="text-white w-7 h-7" />
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-2xl font-black tracking-tight text-white">BEST TRAVEL</span>
                                <span className="text-xs font-bold tracking-widest uppercase text-accent-green">Sri Lanka</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 font-medium leading-relaxed max-w-sm text-lg">
                            We curate the most authentic and breathtaking travel experiences in the heart of the Indian Ocean.
                        </p>
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary-green hover:border-primary-green transition-all"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-8">
                            <h4 className="text-xl font-black tracking-tight flex items-center gap-2">
                                <span className="w-8 h-1 bg-primary-green rounded-full" />
                                {section.title}
                            </h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            href={link.href} 
                                            className="text-gray-400 hover:text-white hover:translate-x-2 transition-all flex items-center group text-lg font-medium"
                                        >
                                            <ArrowUpRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all text-primary-green" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Section */}
                    <div className="space-y-8">
                        <h4 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <span className="w-8 h-1 bg-primary-green rounded-full" />
                            Newsletter
                        </h4>
                        <div className="space-y-6">
                            <p className="text-gray-400 font-medium text-lg">
                                Subscribe to get our latest travel guides and exclusive offers.
                            </p>
                            <div className="relative group">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:bg-white/10 transition-all font-medium"
                                />
                                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary-green text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary-green/20">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-white/5 mb-10">
                    <div className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green border border-primary-green/20 transition-all group-hover:bg-primary-green group-hover:text-white">
                            <Phone className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Call Us</p>
                            <p className="font-bold text-lg text-white">+94 11 234 5678</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green border border-primary-green/20 transition-all group-hover:bg-primary-green group-hover:text-white">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Us</p>
                            <p className="font-bold text-lg text-white">hello@besttravel.lk</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green border border-primary-green/20 transition-all group-hover:bg-primary-green group-hover:text-white">
                            <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Location</p>
                            <p className="font-bold text-lg text-white">Colombo, Sri Lanka</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-500 font-medium">
                    <p>© {currentYear} Best Travel Sri Lanka. All rights reserved.</p>
                    <div className="flex items-center space-x-8">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
            
            {/* Aesthetic Glow Effect */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-primary-green/10 blur-[150px] -z-10 rounded-full" />
        </footer>
    );
};

export default Footer;
