import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  PricingDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'BridgePoint ';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },

    {
      href: '/testimonials',
      label: 'testimonials',
    },
  ];

  const features_points = [
    {
      name: 'Seamless Booking',
      description:
        'Effortlessly book rooms and tickets with our intuitive interface. Enjoy a smooth and hassle-free booking process tailored to your needs.',
      icon: 'mdiCalendarCheck',
    },
    {
      name: 'Real-Time Promotions',
      description:
        'Stay updated with the latest offers and promotions. Redeem exclusive deals instantly to make the most of your escape experience.',
      icon: 'mdiTagHeart',
    },
    {
      name: 'Comprehensive Reports',
      description:
        'Gain insights with detailed reports on sales trends and customer behavior. Make informed decisions to boost your business performance.',
      icon: 'mdiChartLine',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has transformed our booking process. It's intuitive and efficient, making our operations smoother than ever.",
      company: 'Escape Ventures Inc.',
      user_name: 'John Doe, Operations Manager',
    },
    {
      text: "The real-time promotions feature is a game-changer. We've seen a significant increase in bookings since implementing ${projectName}.",
      company: 'Adventure Seekers Ltd.',
      user_name: 'Jane Smith, Marketing Director',
    },
    {
      text: "I love how easy it is to manage bookings and payments with ${projectName}. It's a must-have tool for any escape room business.",
      company: 'Mystery Rooms Co.',
      user_name: 'Emily Johnson, CEO',
    },
    {
      text: 'The comprehensive reports provide valuable insights into our sales trends. ${projectName} helps us make data-driven decisions effortlessly.',
      company: 'Puzzle Masters LLC',
      user_name: 'Michael Brown, Financial Analyst',
    },
    {
      text: 'Our customers appreciate the seamless booking experience. ${projectName} has definitely improved our customer satisfaction rates.',
      company: 'Escape Artists Group',
      user_name: 'Sarah Davis, Customer Service Lead',
    },
    {
      text: 'The support team at ${projectName} is fantastic. They helped us set up everything quickly and efficiently. Highly recommend!',
      company: 'Challenge Quest Corp.',
      user_name: 'David Wilson, IT Specialist',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Basic room booking',
        'Access to promotions',
        'Customer support',
      ],
      limited_features: ['Limited reporting', 'Basic analytics'],
    },
    premium: {
      features: [
        'Advanced room and ticket booking',
        'Priority access to promotions',
        'Enhanced customer support',
      ],
      also_included: [
        'Detailed reporting',
        'Advanced analytics',
        'Customizable booking options',
      ],
    },
    business: {
      features: [
        'Comprehensive booking management',
        'Exclusive promotions',
        'Dedicated account manager',
        'Full analytics suite',
        'Custom integrations',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals or small groups looking to book rooms and access basic promotions.',
    premium:
      'Perfect for small startups or agencies needing advanced booking features and detailed analytics.',
    business:
      'Designed for enterprises requiring comprehensive management tools and dedicated support.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Escape Land Management System - Book Your Adventure`}</title>
        <meta
          name='description'
          content={`Discover and book your perfect escape with our comprehensive room and ticket booking system. Explore features, read testimonials, and find the best pricing options for your adventure.`}
        />
      </Head>
      <WebSiteHeader projectName={'BridgePoint '} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BridgePoint '}
          image={['Scenic escape land view']}
          mainText={`Discover Your Perfect Escape Adventure`}
          subTitle={`Explore the ultimate toolkit for booking rooms and tickets with ${projectName}. Enjoy seamless experiences and exclusive offers.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Book Now`}
        />

        <FeaturesSection
          projectName={'BridgePoint '}
          image={['Coffee blends and categories']}
          withBg={1}
          features={features_points}
          mainText={`Explore Key Features of ${projectName}`}
          subTitle={`Discover how ${projectName} enhances your booking experience with powerful features designed for convenience and efficiency.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'BridgePoint '}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <PricingSection
          projectName={'BridgePoint '}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'BridgePoint '}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact us for assistance']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is here to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'BridgePoint '} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
