import Head from 'next/head';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SubHeading from '../components/SubHeading';
import Card from '../components/Card';
import data from '../data.json';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import FashionBanner from '../components/FashionBanner';

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
      <FashionBanner personDetails={data?.personDetails} interval={6000} />
      <SubHeading subHeadingSubTitle={data?.about_us_subtitle} subHeadingTitle={data?.about_us_title} idKey={"about_us_page"} />
      <Card data={data?.aboutCard1} key={data?.aboutCard1?.key} />
      <Card data={data?.aboutCard2} key={data?.aboutCard2?.key} />
      <Card data={data?.aboutCard3} key={data?.aboutCard3?.key} />
      <Footer contactData={data?.contact} socialMedia={data?.header?.socialMedia} />
    </div>
  );
}
