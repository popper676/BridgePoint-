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
  PricingDesigns,
  GalleryPortfolioDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

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

  const features_points = [
    {
      name: 'Diverse Coffee Blends',
      description:
        'Choose from a wide range of coffee blends, including single-origin and espresso mixes, to suit every taste preference.',
      icon: 'mdiCoffee',
    },
    {
      name: 'Sustainable Sourcing',
      description:
        'Our coffee is sourced from sustainable farms, ensuring quality and supporting ethical practices in the coffee industry.',
      icon: 'mdiLeaf',
    },
    {
      name: 'Customizable Grind Options',
      description:
        'Select your preferred grind size for the perfect brew, whether you use a French press, espresso machine, or drip coffee maker.',
      icon: 'mdiCog',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Access to basic coffee blends',
        'Monthly newsletter',
        'Standard customer support',
      ],
      limited_features: ['Limited blend selection', 'Basic grind options'],
    },
    premium: {
      features: [
        'Access to premium coffee blends',
        'Bi-weekly newsletter',
        'Priority customer support',
      ],
      also_included: [
        'Exclusive blend releases',
        'Custom grind options',
        'Discount on bulk orders',
      ],
    },
    business: {
      features: [
        'Full access to all coffee blends',
        'Weekly newsletter',
        'Dedicated account manager',
        'Custom branding options',
        'Flexible order quantities',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for individual coffee enthusiasts looking to enjoy a selection of quality blends with basic support.',
    premium:
      'Perfect for small businesses or coffee shops seeking premium blends and additional perks to enhance their offerings.',
    business:
      'Designed for large enterprises or franchises requiring comprehensive access to all blends and personalized service.',
  };

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Assorted coffee beans variety',
    'Espresso shot being poured',
    'Barista crafting latte art',
    'Coffee brewing equipment setup',
    'Freshly roasted coffee beans',
    'Coffee cups on wooden table',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const faqs = [
    {
      question: 'What types of coffee blends are available?',
      answer:
        'We offer a wide range of coffee blends, including single-origin, espresso mixes, and seasonal specials. Each blend is carefully curated to provide a unique flavor profile.',
    },
    {
      question: 'How can I customize my coffee order?',
      answer:
        'You can select your preferred grind size during checkout, whether you use a French press, espresso machine, or drip coffee maker. This ensures the perfect brew every time.',
    },
    {
      question:
        'What is the difference between the Standard and Premium plans?',
      answer:
        'The Standard plan offers access to basic blends and standard support, while the Premium plan includes premium blends, exclusive releases, and priority support.',
    },
    {
      question: 'How do I access customer support?',
      answer:
        'Our customer support team is available via email and live chat. Premium and Business plan members receive priority support for faster response times.',
    },
    {
      question: 'Are there any discounts for bulk orders?',
      answer:
        'Yes, we offer discounts on bulk orders for Premium and Business plan members. Contact our sales team for more information on pricing and availability.',
    },
    {
      question: 'Can I change my subscription plan?',
      answer:
        'Yes, you can upgrade or downgrade your subscription plan at any time through your account settings. Changes will take effect at the start of the next billing cycle.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Products - ${projectName}`}</title>
        <meta
          name='description'
          content={`Discover the range of products offered by ${projectName}. Learn about features, pricing, and more to find the perfect solution for your needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'BridgePoint '} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BridgePoint '}
          image={['Assorted coffee blend varieties']}
          mainText={`Discover Our Premium Coffee Blends`}
          subTitle={`Explore the finest selection of coffee blends curated by ${projectName}. From single-origin to espresso mixes, find your perfect cup today.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Shop Now`}
        />

        <FeaturesSection
          projectName={'BridgePoint '}
          image={['Coffee beans and brewing tools']}
          withBg={0}
          features={features_points}
          mainText={`Unleash the Power of ${projectName} Products`}
          subTitle={`Discover the unique features of our coffee blends and how they enhance your coffee experience with ${projectName}.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'BridgePoint '}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <GalleryPortfolioSection
          projectName={'BridgePoint '}
          images={images}
          mainText={`Explore Our Exquisite Coffee Collection`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
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
