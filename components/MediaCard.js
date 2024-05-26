import React, { useState, useEffect } from 'react';
import styles from '../styles/card.module.css';
import VideoPlayer from './VideoPlayer';

const MediaCard = ({ type, images, position }) => {
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
  const [currentPerson, setCurrentPerson] = useState(images[0]);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
      const changePerson = () => {
          setFlip(true);
          setTimeout(() => {
              setCurrentPersonIndex((prevIndex) => (prevIndex + 1) % images.length);
              setFlip(false);
          }, 600); // Match the duration of the flip animation
      };

      const intervalId = setInterval(changePerson, 6000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [images, 6000]);

  useEffect(() => {
      setCurrentPerson(images[currentPersonIndex]);
  }, [currentPersonIndex, images]);

  return (
    <div className={position == 'left' ? styles.leftCard : styles.rightCard} >
      {type == 'video' && <div className={styles.mediaWrap}>
        <VideoPlayer videosrc={src} />
      </div>}
      {type == 'image' && <div className={styles.mediaWrap} key={`persondress`}>
            <img src={currentPerson} className={styles.image} />
          </div>
      }
    </div>
  )
}

export default MediaCard