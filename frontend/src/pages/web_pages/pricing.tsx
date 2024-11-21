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
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const pricing_features = {
    standard: {
      features: [
        'Basic room and ticket booking',
        'Access to standard promotions',
        'Email support',
      ],
      limited_features: ['Limited reporting', 'Basic analytics'],
    },
    premium: {
      features: [
        'Advanced booking management',
        'Priority access to promotions',
        '24/7 customer support',
      ],
      also_included: [
        'Detailed reporting',
        'Advanced analytics',
        'Customizable booking options',
      ],
    },
    business: {
      features: [
        'Comprehensive booking solutions',
        'Exclusive promotions',
        'Dedicated account manager',
        'Full analytics suite',
        'Custom integrations',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individuals or small groups looking to manage basic bookings with essential support.',
    premium:
      'Perfect for small businesses or agencies needing advanced booking features and detailed analytics.',
    business:
      'Designed for enterprises requiring comprehensive management tools and personalized service.',
  };

  const features_points = [
    {
      name: 'Seamless Integration',
      description:
        'Easily integrate with existing systems and third-party services to streamline your operations and enhance functionality.',
      icon: 'mdiPuzzle',
    },
    {
      name: 'Real-Time Analytics',
      description:
        'Access detailed analytics to track performance and make data-driven decisions that boost your business growth.',
      icon: 'mdiChartBar',
    },
    {
      name: 'Customizable Options',
      description:
        'Tailor the booking experience to meet your specific needs with customizable options and flexible settings.',
      icon: 'mdiCog',
    },
  ];

  const testimonials = [
    {
      text: 'Thanks to ${projectName}, our booking process has become incredibly efficient. The seamless integration with our existing systems is a huge plus.',
      company: 'Adventure Escapes Ltd.',
      user_name: 'Alice Johnson, Operations Manager',
    },
    {
      text: 'The real-time analytics provided by ${projectName} have been invaluable in helping us make informed business decisions. Highly recommend!',
      company: 'Mystery Rooms Co.',
      user_name: 'Bob Smith, CEO',
    },
    {
      text: 'We love the customizable options that ${projectName} offers. It allows us to tailor the booking experience to our specific needs.',
      company: 'Escape Artists Group',
      user_name: 'Catherine Lee, Marketing Director',
    },
    {
      text: 'The customer support team at ${projectName} is fantastic. They are always ready to help and ensure we get the most out of the platform.',
      company: 'Puzzle Masters LLC',
      user_name: 'David Brown, Customer Service Lead',
    },
    {
      text: "Our clients appreciate the smooth booking experience provided by ${projectName}. It's a game-changer for our business.",
      company: 'Challenge Quest Corp.',
      user_name: 'Emma Davis, Sales Manager',
    },
    {
      text: "The flexibility and features of ${projectName} have exceeded our expectations. It's an essential tool for our operations.",
      company: 'Escape Ventures Inc.',
      user_name: 'Frank Wilson, IT Specialist',
    },
  ];

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        "The Standard plan includes basic room and ticket booking features, access to standard promotions, and email support. It's perfect for individuals or small groups.",
    },
    {
      question: 'Can I upgrade my plan later?',
      answer:
        'Yes, you can upgrade your plan at any time through your account settings. The new features will be available immediately after the upgrade.',
    },
    {
      question: 'How does the Premium plan differ from the Business plan?',
      answer:
        'The Premium plan offers advanced booking management and priority support, while the Business plan includes comprehensive solutions, a dedicated account manager, and custom integrations.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 14-day free trial for new users to explore the features of ${projectName}. No credit card is required to start the trial.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize your data security with industry-standard encryption and regular security audits. Your information is safe with ${projectName}.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        '${projectName} accepts major credit cards, PayPal, and other secure payment methods. You can choose your preferred option during checkout.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Flexible Pricing Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore our flexible pricing plans at ${projectName}. Choose the plan that best suits your needs and enjoy premium features and support.`}
        />
      </Head>
      <WebSiteHeader projectName={'BridgePoint '} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BridgePoint '}
          image={['Pricing plans and options']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Discover flexible pricing options tailored to your needs. Whether you're an individual or a business, ${projectName} has the right plan for you.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'BridgePoint '}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'BridgePoint '}
          image={['Feature-rich booking platform']}
          withBg={0}
          features={features_points}
          mainText={`Unlock Powerful Features with ${projectName}`}
          subTitle={`Explore the robust features that make ${projectName} the ideal choice for managing your bookings and enhancing your business.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'BridgePoint '}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <FaqSection
          projectName={'BridgePoint '}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'BridgePoint '} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
