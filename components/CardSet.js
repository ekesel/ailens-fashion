import React, { useEffect, useState } from "react";
import styles from '../styles/card.module.css';
import MediaCard from './MediaCard';
import TextCard from "./TextCard";
import { motion } from "framer-motion";

const CardSet = ({ data, position }) => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);


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

  const cardVariants = {
    offscreen: {
      y: 300,
    },
    onscreen: {
      y: isMobileView ? 200 : 50,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.8 }}
    >
      <div id={data?.key} className={styles.tabContainer}>
        <motion.div className={styles.container} variants={cardVariants}>
          {position== 'left' && <><div className={styles.left}>
            {domLoaded && <MediaCard type={data?.mediaCardType} images={data?.mediaCardSrc} position={'left'} />}
          </div>
            <div className={styles.right} >
              <TextCard position={'right'}
                textCardTitle={data?.textCardTitle}
                textCardp1={data?.textCardp1}
                textCardp2={data?.textCardp2}
                textCardp3={data?.textCardp3}
              />
            </div></>}
          {position == 'right' && <><div className={styles.left}>
            <TextCard position={'left'}
              textCardTitle={data?.textCardTitle}
              textCardp1={data?.textCardp1}
              textCardp2={data?.textCardp2}
              textCardp3={data?.textCardp3}
            />
          </div>
            <div className={styles.right} >
              {domLoaded && <MediaCard type={data?.mediaCardType} images={data?.mediaCardSrc} position={'right'} />}
            </div></>}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default CardSet