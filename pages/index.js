import Head from 'next/head';
import Header from '../components/Header';
import data from '../data.json';
import Footer from '../components/Footer';
import FashionBanner from '../components/FashionBanner';
import WhySection from '../components/WhySection';
import WhatDo from '../components/WhatDo';
import EthicalAI from '../components/EthicalAI';


export default function Home() {

  return (
    <div>
      <Head>
        <title>{data?.page_title}</title>
        <link rel="icon" href={data?.favicon_path} />
        <meta
          name="description"
          content="Discover cutting-edge AI and AR technology solutions for fashion and retail. Our virtual try-on and fitting room tech enhances customer experience, reduces returns, and boosts sales for clothing retailers and fashion brands worldwide. Embrace the future of shopping with innovative fashion tech and personalized e-commerce solutions."
          key="desc"
        />
        <meta name="keywords" content="AI startup, technology company, clothing virtual try-on solution, virtual fitting room, AR try-on technology, fashion tech, retail technology, e-commerce, Augmented Reality ( AR ) , machine learning, 3D modeling, computer vision, virtual try-on, real-time rendering, size recommendation, fit prediction, clothing retailers, fashion brands, e-commerce platforms, apparel industry, garment industry, enhance customer experience, reduce returns, increase conversions, personalized shopping, improve online shopping, boost sales, innovative retail solutions, cutting-edge technology, virtual try-on for clothing, AR fitting room, AI-powered shopping, fashion tech solutions, retail innovation, next-gen retail, future of shopping, digital transformation, retail tech trends, global, international, USA, Europe, Asia, B2B (business-to-business), enterprise solutions, startup innovation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header title={data?.header?.title}
        email={data?.header?.email}
        location={data?.header?.location}
        socialMedia={data?.header?.socialMedia}
      />
      <FashionBanner personDetails={data?.personDetails} interval={6000} />
      <WhatDo data={data?.cardset1} />
      <WhySection title={data?.why_vton?.title}
        description={data?.why_vton?.description}
        bulletPoints={data?.why_vton?.bulletPoints}
        imageSrcList={data?.why_vton?.imageList} />
      <EthicalAI data={data?.ethical_ai} />
      <Footer contactData={data?.contact} socialMedia={data?.header?.socialMedia} />
    </div>
  );
}
