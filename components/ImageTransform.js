import React, { useState, useEffect } from 'react';
import styles from '../styles/imageTransform.module.css';

const ImageTransform = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFadingOut(true);
      setIsFadingIn(false);

      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFadingOut(false);
        setIsFadingIn(true);
      }, 1000); // duration of fade-out animation
    }, 4000); // interval between image changes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.imageContainer}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`image-${index}`}
          className={`${styles.image} ${index === currentImageIndex && isFadingIn ? styles.fadeIn : ''} ${index === currentImageIndex && isFadingOut ? styles.fadeOut : ''}`}
          style={{ opacity: index === currentImageIndex ? 1 : 0 }}
        />
      ))}
    </div>
  );
};

export default ImageTransform;