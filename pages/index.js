import Head from 'next/head';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SubHeading from '../components/SubHeading';
import CardSet from '../components/CardSet';
import Card from '../components/Card';
import data from '../data.json';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import FashionBanner from '../components/FashionBanner';
import ImageSelector from '../components/ImageSelector';

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
        phone={data?.header?.phone}
        location={data?.header?.location}
        socialMedia={data?.header?.socialMedia}
      />
      <NavBar />
      <FashionBanner banner={data?.banner} />
      <SubHeading subHeadingSubTitle={data?.subHeadingSubTitle} subHeadingTitle={data?.subHeadingTitle} idKey={data?.subHeadingKey} />
      <CardSet data={data?.cardset1} position={isMobileView ? 'right' : data?.cardset1?.mediaCardPosition} productLink={data?.productLink} />
      <CardSet data={data?.cardset2} position={isMobileView ? 'right' : data?.cardset2?.mediaCardPosition} productLink={data?.productLink} />
      <CardSet data={data?.cardset3} position={isMobileView ? 'right' : data?.cardset3?.mediaCardPosition} productLink={data?.productLink} />
      <CardSet data={data?.cardset4} position={isMobileView ? 'right' : data?.cardset4?.mediaCardPosition} productLink={data?.productLink} />
      <ImageSelector selector={data?.selector} />
      <Footer contactData={data?.contact} socialMedia={data?.header?.socialMedia} />
    </div>
  );
}
