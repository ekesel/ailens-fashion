import React, { useState, useEffect } from 'react';
import styles from '../styles/imageTransform.module.css';

const ImageTransform = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isShrinkingIn, setIsShrinkingIn] = useState(false);
    const [isShrinkingOut, setIsShrinkingOut] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setIsShrinkingIn(true);
        setTimeout(() => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
          setIsShrinkingIn(false);
          setIsShrinkingOut(true);
        }, 1000); // duration of shrinkIn animation
  
        setTimeout(() => {
          setIsShrinkingOut(false);
        }, 2000); // duration of shrinkOut animation
      }, 4000); // interval between image changes
  
      return () => clearInterval(interval);
    }, [images.length]);
  
    return (
      <div className={styles.imageContainer}>
        <img
          src={images[currentImageIndex]}
          alt="current"
          className={`${styles.image} ${isShrinkingIn ? styles.shrinkIn : ''} ${isShrinkingOut ? styles.shrinkOut : ''}`}
        />
      </div>
    );
  };
  
  export default ImageTransform;