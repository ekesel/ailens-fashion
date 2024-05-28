import React, { useState, useEffect } from 'react';
import styles from '../styles/fashionBanner.module.css'; // Import your CSS file

const AnimatedText = ({ text }) => {
    const [animatedText, setAnimatedText] = useState('');

    useEffect(() => {
        // Reset animatedText when text prop changes
        setAnimatedText('');

        let animationTimeout;
        for (let i = 0; i < text.length; i++) {
            // Set a timeout to append characters to the animatedText state
            animationTimeout = setTimeout(() => {
                setAnimatedText((prevText) => prevText + text[i]);
            }, i * 50); // Reduce the delay to 50 milliseconds
        }

        // Clear timeout on component unmount
        return () => clearTimeout(animationTimeout);
    }, [text]);

    return <span className={`${styles.appearAnimation}`}>{animatedText}</span>;
};

export default AnimatedText;