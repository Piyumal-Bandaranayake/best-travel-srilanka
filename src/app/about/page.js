'use client';

import React from 'react';
import AboutHero from '@/components/about/AboutHero';
import CompanyStory from '@/components/about/CompanyStory';
import WhyChooseUs from '@/components/about/WhyChooseUs';
import Team from '@/components/about/Team';
import CTA from '@/components/about/CTA';
import OfficeMap from '@/components/about/OfficeMap';

const AboutPage = () => {
    return (
        <main className="font-outfit bg-gray-50 min-h-screen">
            <AboutHero />
            <CompanyStory />
            <WhyChooseUs />
            <Team />
            <OfficeMap />
            <CTA />
        </main>
    );
};

export default AboutPage;
