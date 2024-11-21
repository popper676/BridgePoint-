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
  TestimonialsDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const testimonials = [
    {
      text: '${projectName} has revolutionized our booking process. The ease of use and efficiency have significantly improved our operations.',
      company: 'Escape Adventures Inc.',
      user_name: 'Laura Thompson, Operations Director',
    },
    {
      text: "The analytics provided by ${projectName} are top-notch. We've gained valuable insights that have helped us grow our business.",
      company: 'Mystery Quest Ltd.',
      user_name: 'James Carter, CEO',
    },
    {
      text: 'Our customers love the seamless booking experience. ${projectName} has truly enhanced our service offering.',
      company: 'Puzzle Escape Rooms',
      user_name: 'Samantha Green, Customer Experience Manager',
    },
    {
      text: 'The support team at ${projectName} is exceptional. They are always ready to assist and ensure we get the most out of the platform.',
      company: 'Challenge Rooms Co.',
      user_name: 'Michael Brown, IT Manager',
    },
    {
      text: "Thanks to ${projectName}, we've been able to streamline our operations and focus on delivering great experiences to our clients.",
      company: 'Adventure Seekers Group',
      user_name: 'Emily White, General Manager',
    },
    {
      text: "The flexibility and features of ${projectName} have exceeded our expectations. It's an essential tool for our business.",
      company: 'Escape Innovators',
      user_name: 'David Wilson, Marketing Lead',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Customer Testimonials - ${projectName}`}</title>
        <meta
          name='description'
          content={`Read what our satisfied clients have to say about their experiences with ${projectName}. Discover how we have helped businesses succeed.`}
        />
      </Head>
      <WebSiteHeader projectName={'BridgePoint '} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BridgePoint '}
          image={['Happy clients sharing feedback']}
          mainText={`Hear from Our Happy Clients`}
          subTitle={`Discover how ${projectName} has transformed businesses and enhanced customer experiences. Read testimonials from our satisfied clients.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Read More`}
        />

        <TestimonialsSection
          projectName={'BridgePoint '}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Client Success Stories with ${projectName} `}
        />

        <AboutUsSection
          projectName={'BridgePoint '}
          image={['Team collaboration and innovation']}
          mainText={`The Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to transforming the booking experience with innovative solutions. Learn more about our mission and the team driving our success.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Discover More`}
        />

        <ContactFormSection
          projectName={'BridgePoint '}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer service team ready']}
          mainText={`Connect with ${projectName} Support `}
          subTitle={`Reach out to us anytime for inquiries or support. Our team at ${projectName} is ready to assist you promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'BridgePoint '} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
