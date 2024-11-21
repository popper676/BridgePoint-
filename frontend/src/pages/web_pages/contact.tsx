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
  ContactFormDesigns,
  FaqDesigns,
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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

  const faqs = [
    {
      question: 'How do I create an account?',
      answer:
        "To create an account, click on the 'Sign Up' button on the homepage and fill in your details. You'll receive a confirmation email to activate your account.",
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        '${projectName} accepts major credit cards, PayPal, and other secure payment methods. You can choose your preferred option during checkout.',
    },
    {
      question: 'Can I change my subscription plan?',
      answer:
        'Yes, you can upgrade or downgrade your subscription plan at any time through your account settings. Changes will take effect at the start of the next billing cycle.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can reach our customer support team via the contact form on this page or by emailing support@projectname.com. We aim to respond within 24 hours.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, we offer a 14-day free trial for new users to explore the features of ${projectName}. No credit card is required to start the trial.',
    },
    {
      question: 'How secure is my data?',
      answer:
        'We prioritize your data security with industry-standard encryption and regular security audits. Your information is safe with ${projectName}.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - ${projectName}`}</title>
        <meta
          name='description'
          content={`Get in touch with ${projectName} for inquiries, support, or feedback. We're here to assist you with any questions you may have.`}
        />
      </Head>
      <WebSiteHeader projectName={'BridgePoint '} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BridgePoint '}
          image={['Customer service team ready']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to ${projectName} and let us assist you in your journey.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'BridgePoint '}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <AboutUsSection
          projectName={'BridgePoint '}
          image={['Team collaboration and innovation']}
          mainText={`Discover the Story Behind ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about delivering exceptional experiences through our innovative booking solutions. Learn more about our mission and values.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'BridgePoint '}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Email communication illustration']}
          mainText={`Reach Out to ${projectName} `}
          subTitle={`Contact us anytime for inquiries or support. Our team at ${projectName} is ready to respond promptly to your needs.`}
        />
      </main>
      <WebSiteFooter projectName={'BridgePoint '} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
