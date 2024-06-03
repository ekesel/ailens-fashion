import React, { useEffect, useState } from 'react';
import styles from '../styles/TitleWithBulletPoints.module.css';
import Image from 'next/image'

const TitleWithBulletPoints = ({ title, description, bulletPoints, imageSrcList }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after a short delay
    const timeout = setTimeout(() => {
      setAnimate(true);
    }, 100); // Adjust the delay as needed

    // Cycle through images every 6 seconds
    const interval = setInterval(() => {
      setAnimate(false); // Reset animation
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageSrcList.length);
      setTimeout(() => {
        setAnimate(true); // Trigger animation after changing image
      }, 100); // Adjust the delay as needed
    }, 6000); // 6 seconds

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [currentImageIndex, imageSrcList]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.otherDetails}>
        <div className={styles.left}>
          <Image
            src={imageSrcList[currentImageIndex]}
            alt={title}
            className={styles.image}
            width={500}
            height={700}
            priority
            style={{
              width: '300px',
              height: '300px'
            }}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.list}>
            {bulletPoints.map((point, index) => (
              <div key={index} className={`${styles.checkItem} ${animate ? styles.visible : ''}`}>
                <span className={styles.checkIcon}></span>
                <span className={styles.listItem}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleWithBulletPoints;
