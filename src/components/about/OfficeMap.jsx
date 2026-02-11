'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const OfficeMap = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-primary-green font-bold text-lg mb-2">VISIT US</h2>
                    <h3 className="text-4xl font-bold text-gray-900">Our Office Location</h3>
                    <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                        Come say hello! We are conveniently located in the heart of Colombo.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 items-start">
                    {/* Contact Info Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 md:col-span-1"
                    >
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary-green/10 p-3 rounded-full shrink-0">
                                    <MapPin className="w-6 h-6 text-primary-green" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                                    <p className="text-gray-600">
                                        123 Galle Road,<br />
                                        Colombo 03,<br />
                                        Sri Lanka
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-primary-blue/10 p-3 rounded-full shrink-0">
                                    <Phone className="w-6 h-6 text-primary-blue" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                                    <p className="text-gray-600">+94 11 234 5678</p>
                                    <p className="text-gray-600">+94 77 123 4567</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-accent-blue/10 p-3 rounded-full shrink-0">
                                    <Mail className="w-6 h-6 text-accent-blue" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600">hello@besttravelsrilanka.com</p>
                                    <p className="text-gray-600">support@besttravelsrilanka.com</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 p-3 rounded-full shrink-0">
                                    <Clock className="w-6 h-6 text-orange-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-1">Opening Hours</h4>
                                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                                    <p className="text-gray-600">Sat: 9:00 AM - 1:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Google Map Embed */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 h-[500px] rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white p-2"
                    >
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80392131665!2d79.82118600742881!3d6.921373369401764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1707654321098!5m2!1sen!2sus" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, borderRadius: '1.5rem' }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Office Location Map"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OfficeMap;
