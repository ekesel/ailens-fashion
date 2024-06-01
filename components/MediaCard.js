import React, { useState, useEffect } from 'react';
import styles from '../styles/card.module.css';
import VideoPlayer from './VideoPlayer';

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
  
    const intervalId = setInterval(changePerson, 6000);
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [currentPersonIndex]);

  return (
    <div className={position == 'left' ? styles.leftCard : styles.rightCard} >
      {type == 'video' && <div className={styles.mediaWrap}>
        <VideoPlayer videosrc={images} />
      </div>}
      {type == 'image' && <div className={styles.mediaWrap} key={`persondress`}>
        <div className={`${styles.morphContainer} ${morph ? styles.morph : ''}`}>
          <div className={styles.currentImage} style={{ backgroundImage: `url(${images[currentPersonIndex]})` }}></div>
          {morph && <div className={styles.nextImage} style={{ backgroundImage: `url(${images[nextIndex]})` }}></div>}
        </div>
      </div>
      }
    </div>
  )
}

export default MediaCard