import React, { useState, useEffect } from 'react';
import styles from '../styles/imageSlider.module.css'; // Import your CSS module for styling

const ImageSlider = ({ images, onClickFunc, selectedImage, propKey }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 3 : prevIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        handleClickNext();
      }, 2000); // duration of shrinkIn animation
    }, 6000); // interval between image changes

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={styles.container} key={propKey}>
      <button className={styles.arrowButton} onClick={handleClickPrev}>&#10548;</button>
      <div className={styles.imageContainer}>
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={selectedImage === image ? `${styles.image} ${styles.imageActive}` : styles.image}
            onClick={(e)=> {
                e.preventDefault();
                onClickFunc(image, propKey);
            }}
          />
        ))}
      </div>
      <button className={styles.arrowButton} onClick={handleClickNext}>&#10549;</button>
    </div>
  );
};

export default ImageSlider;