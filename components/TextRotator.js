import React, { useState, useEffect } from 'react';
import AnimatedTextCharacter from './AnimatedTextCharacter'; // Adjust the import according to your actual component

const TextRotator = ({ texts, staggerRate, delayRate, interval }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState(texts[0]);

    useEffect(() => {
        const changeText = () => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        };

        const intervalId = setInterval(changeText, interval);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [texts, interval]);

    useEffect(() => {
        setCurrentText(texts[currentTextIndex]);
    }, [currentTextIndex, texts]);

    return (
        <AnimatedTextCharacter text={currentText} staggerRate={staggerRate} delayRate={delayRate} key={currentTextIndex} />
    );
};

export default TextRotator;
