'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
    Send
} from 'lucide-react';
import AdminLogin from '../auth/AdminLogin';

const Footer = () => {
    const pathname = usePathname();
    const currentYear = new Date().getFullYear();

    if (pathname && pathname.startsWith('/admin')) {
        return null;
    }

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'Destinations', href: '/destinations' },
        { name: 'Packages', href: '/packages' },
        { name: 'About', href: '/about' },
       
    ];

    const socialLinks = [
        { icon: <Facebook className="w-4 h-4" />, href: '#' },
        { icon: <Instagram className="w-4 h-4" />, href: '#' },
    ];

    return (
        <footer className="bg-gray-900 text-white font-outfit py-12 overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Top Section: Brand + Links + Newsletter */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-12">
                    
                    {/* Brand */}
                    <div className="flex items-center space-x-3 group">
                       
                        <div className="flex flex-col leading-tight">
                            <span className="text-xl font-black tracking-tight text-white">BEST TRAVEL</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-accent-green">Sri Lanka</span>
                        </div>
                    </div>

                    {/* Quick Access Links - Compact Row */}
                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                        {quickLinks.map((link) => (
                            <Link 
                                key={link.name}
                                href={link.href} 
                                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>


                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 w-full mb-8" />

                {/* Bottom Section: Contact Bar + Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    
                    {/* Compact Contact Info */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-xs font-medium text-gray-400">
                        <a href="https://wa.me/94701000148" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <Phone className="w-3.5 h-3.5 text-primary-green" />
                            <span>+94 70 100 0148</span>
                        </a>
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <Mail className="w-3.5 h-3.5 text-primary-green" />
                            <span>contact.btslanka@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                            <MapPin className="w-3.5 h-3.5 text-primary-green" />
                            <span>Colombo, Sri Lanka</span>
                        </div>
                    </div>

                    {/* Copyright & Socials */}
                    <div className="flex items-center gap-6">
                        <p className="text-xs text-gray-500">© {currentYear} Best Travel Sri Lanka</p>
                        
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.href}
                                    whileHover={{ y: -2 }}
                                    className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-green hover:text-white transition-all"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}

                            <div className="w-px h-4 bg-white/10 mx-1"></div>
                            <AdminLogin />
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
