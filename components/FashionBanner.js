import React, { useState, useEffect } from 'react';
import styles from '../styles/fashionBanner.module.css';
import AnimatedTextCharacter from './AnimatedTextCharacter';

const FashionBanner = ({ personDetails, interval }) => {
    const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
    const [currentPerson, setCurrentPerson] = useState(personDetails[0]);
    const [flip, setFlip] = useState(false);

    useEffect(() => {
        const changePerson = () => {
            setFlip(true);
            setTimeout(() => {
                setCurrentPersonIndex((prevIndex) => (prevIndex + 1) % personDetails.length);
                setFlip(false);
            }, 600); // Match the duration of the flip animation
        };

        const intervalId = setInterval(changePerson, interval);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [personDetails, interval]);

    useEffect(() => {
        setCurrentPerson(personDetails[currentPersonIndex]);
    }, [currentPersonIndex, personDetails]);

    return (
        <div className={styles.container}>
            <div className={styles.personRow}>
                <div className={styles.height}>
                    <AnimatedTextCharacter text={currentPerson?.height} staggerRate={0.2} delayRate={0.23} />
                </div>
                <div className={styles.person}>
                    <img 
                        src={currentPerson?.image} 
                        className={`${styles.personImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}
                    />
                </div>
                <div className={styles.weight}>
                    <AnimatedTextCharacter text={currentPerson?.weight} staggerRate={0.2} delayRate={0.23} />
                </div>
            </div>
            <div className={styles.dresses}>
                {currentPerson?.dresses.map((dress, index) => (
                    <div className={styles.dress} key={`dress_${index}`}>
                        <img 
                            src={dress} 
                            className={`${styles.dressImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FashionBanner;
