import React, { useState, useEffect } from 'react';
import styles from '../styles/imageSlider.module.css'; // Import your CSS module for styling

const ImageSlider = ({ images, onClickFunc, selectedImage, propKey, numberToShow }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 3 : prevIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const getDisplayImages = () => {
    const end = currentIndex + numberToShow;
    return [...images, ...images].slice(currentIndex, end);
  };

  return (
    <div className={styles.container} key={propKey}>
      <div className={styles.arrowButton}>
        <div className={styles.upArrowButton} onClick={handleClickPrev}></div>
      </div>
      <div className={styles.imageContainer}>
        {getDisplayImages().map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={selectedImage === image ? `${styles.image} ${styles.imageActive}` : styles.image}
            onClick={(e) => {
              e.preventDefault();
              onClickFunc(image, propKey);
            }}
          />
        ))}
      </div>
      <div className={styles.arrowButton}>
        <div className={styles.downArrowButton} onClick={handleClickNext}></div>
      </div>
    </div>
  );
};

export default ImageSlider;