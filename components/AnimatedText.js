import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/fashionBanner.module.css'; // Import your CSS file

const AnimatedText = ({ text }) => {
    const [animatedText, setAnimatedText] = useState('');
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        // IntersectionObserver callback function
        const handleIntersect = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            });
        };

        // Create IntersectionObserver
        const observer = new IntersectionObserver(handleIntersect, {
            threshold: 0.5 // Adjust the threshold as needed
        });

        // Observe the referenced element
        if (ref.current) {
            observer.observe(ref.current);
        }

        // Clean up the observer on unmount
        return () => {
            if (observer && ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            // Reset animatedText when text prop changes and isInView is true
            setAnimatedText('');

            let animationTimeouts = [];
            for (let i = 0; i < text.length; i++) {
                // Set a timeout to append characters to the animatedText state
                const timeout = setTimeout(() => {
                    setAnimatedText((prevText) => prevText + text[i]);
                }, i * 50); // Reduce the delay to 50 milliseconds
                animationTimeouts.push(timeout);
            }

            // Clear timeouts on component unmount or when text changes
            return () => {
                animationTimeouts.forEach(clearTimeout);
            };
        }
    }, [text, isInView]);

    return <span ref={ref} className={`${styles.appearAnimation}`}>{animatedText}</span>;
};

export default AnimatedText;
