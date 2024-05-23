import React, { useState, useEffect } from 'react';
import styles from '../styles/imageSelector.module.css';
import ImageSlider from './ImageSlider';
import AnimatedTextCharacter from './AnimatedTextCharacter';

const ImageSelector = ({ selector }) => {
    const [selectedPerson, setSelectedPerson] = useState(selector?.person_images?.[0]);
    const [selectedDress, setSelectedDress] = useState(selector?.dress_images?.[0]);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [animatingFromLeft, setAnimatingFromLeft] = useState(false);
    const [animatingFromRight, setAnimatingFromRight] = useState(false);

    const selectEntity = (image, key) => {
        if (key === 'person') {
            setAnimatingFromLeft(true);
            setSelectedPerson(image);
        }
        if (key === 'dress') {
            setAnimatingFromRight(true);
            setSelectedDress(image);
        }
    };

    // check mobile view
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        setIsMobileView(mediaQuery.matches);
        const handleResize = () => setIsMobileView(mediaQuery.matches);
        mediaQuery.addListener(handleResize);
        return () => mediaQuery.removeListener(handleResize);
    }, []);

    useEffect(() => {
        const key = `${selectedPerson}_${selectedDress}`;
        if (key) {
            setSelectedCombo(selector?.selected_image?.[key]);
        }
    }, [selectedPerson, selectedDress]);

    useEffect(() => {
        if (animatingFromLeft) {
            setTimeout(() => setAnimatingFromLeft(false), 1000); // Match animation duration
        }
        if (animatingFromRight) {
            setTimeout(() => setAnimatingFromRight(false), 1000); // Match animation duration
        }
    }, [animatingFromLeft, animatingFromRight]);

    const handleMouseMove = (e) => {
        const imageElement = e.currentTarget;
        const rect = imageElement.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;

        const tiltX = deltaY * 10; // Adjust the multiplier as needed for the desired tilt effect
        const tiltY = deltaX * -10; // Adjust the multiplier as needed for the desired tilt effect

        imageElement.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseLeave = (e) => {
        const imageElement = e.currentTarget;
        imageElement.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <ImageSlider propKey="person" images={selector?.person_images} onClickFunc={selectEntity} selectedImage={selectedPerson} numberToShow={isMobileView ? 1 : 3} />
                    </div>
                    <div className={styles.center}>
                        <img
                            key="selected_combo"
                            src={selectedCombo}
                            alt={`Image ${selectedCombo}`}
                            className={`${styles.image} ${animatingFromLeft ? styles.animateInLeft : ''} ${animatingFromRight ? styles.animateInRight : ''}`}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                        <span className={styles.textImage}>
                            <AnimatedTextCharacter text="Explore Your Style: Try on Any Dress with Just a Click! :)" staggerRate={0.2} delayRate={0.23} />
                        </span>
                    </div>
                    <div className={styles.right}>
                        <ImageSlider propKey="dress" images={selector?.dress_images} onClickFunc={selectEntity} selectedImage={selectedDress} numberToShow={isMobileView ? 1 : 3} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageSelector;
