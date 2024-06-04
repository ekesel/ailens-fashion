import React, { useState, useEffect } from 'react';
import styles from '../styles/card.module.css';
import VideoPlayer from './VideoPlayer';

import p5dress1 from '../public/images/p5_dress1.png';
import p5dress2 from '../public/images/p5_dress2.png';
import p5dress3 from '../public/images/p5_dress3.png';
import p5dress4 from '../public/images/p5_dress4.png';
import p5dress5 from '../public/images/p5_dress5.png';
import p5dress6 from '../public/images/p5_dress6.png';


// Simple mapping object with modified keys
const mapping = {
  'p5_dress1': p5dress1,
  'p5_dress2': p5dress2,
  'p5_dress3': p5dress3,
  'p5_dress4': p5dress4,
  'p5_dress5': p5dress5,
  'p5_dress6': p5dress6,
};

const MediaCard = ({ type, images, position }) => {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [morph, setMorph] = useState(false);

  useEffect(() => {
    const changePerson = () => {
      setMorph(true);
      setTimeout(() => {
        setCurrentPersonIndex((prevIndex) => (prevIndex + 1) % images.length);
        setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
        setMorph(false);
      }, 1000); // Match the duration of the morph animation
    };
  
    const intervalId = setInterval(changePerson, 4000);
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentPersonIndex]);

  return (
    <div className={position == 'left' ? styles.leftCard : styles.rightCard} >
      {type == 'video' && <div className={styles.mediaWrap}>
        <VideoPlayer videosrc={images} />
      </div>}
      {type == 'image' && <div className={styles.mediaWrap} key={`persondress`}>
        <div className={`${styles.morphContainer} ${morph ? styles.morph : ''}`}>
          <div className={styles.currentImage} style={{ backgroundImage: `url(${mapping[images[currentPersonIndex]].src})` }} key={currentPersonIndex}></div>
          {morph && <div className={styles.nextImage} style={{ backgroundImage: `url(${mapping[images[nextIndex]].src})` }}></div>}
        </div>
      </div>
      }
    </div>
  )
}

export default MediaCard