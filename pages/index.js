import Head from 'next/head';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import CardSet from '../components/CardSet';
import data from '../data.json';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import FashionBanner from '../components/FashionBanner';
import VirtualTryOn from '../components/VirtualTryOn';
import TitleWithBulletPoints from '../components/TitleWithBulletPoints';


export default function Home() {
  const [isMobileView, setIsMobileView] = useState(false)

  // check mobile view
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      setIsMobileView(true)
    }
    else
      setIsMobileView(false)
  }, [])

  return (
    <div>
      <Head>
        <title>{data?.page_title}</title>
        <link rel="icon" href={data?.favicon_path} />
      </Head>
      <Header title={data?.header?.title}
        email={data?.header?.email}
        location={data?.header?.location}
        socialMedia={data?.header?.socialMedia}
      />
      <NavBar />
      <FashionBanner personDetails={data?.personDetails} interval={6000} />
      <CardSet data={data?.cardset1} position={data?.cardset1?.mediaCardPosition} />
      {/* <VirtualTryOn personDetails={data?.personDetails} selectedImage={data?.selected_image} /> */}
      <TitleWithBulletPoints 
        title={data?.why_vton?.title}
        description={data?.why_vton?.description}
        bulletPoints={data?.why_vton?.bulletPoints}
        imageSrcList={data?.why_vton?.imageList}
      />
      <Footer contactData={data?.contact} socialMedia={data?.header?.socialMedia} />
    </div>
  );
}
