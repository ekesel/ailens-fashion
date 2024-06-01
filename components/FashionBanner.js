import React, { useState, useEffect } from 'react';
import styles from '../styles/fashionBanner.module.css';
import AnimatedTextCharacter from './AnimatedTextCharacter';
import AnimatedText from './AnimatedText';
import RippleButton from './RippleButton';


const DressImage = ({ imageUrl, className }) => {
    const [objectFit, setObjectFit] = useState('cover'); // Default object-fit value

    useEffect(() => {
        // Fetch image metadata asynchronously on the client-side
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const newObjectFit = aspectRatio < 0.5 ? 'contain' : 'cover';
            setObjectFit(newObjectFit);
        };
    }, [imageUrl]);

    return (
        <img
            src={imageUrl}
            style={{ objectFit }}
            className={className}
        />
    );
};

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
            <div className={styles.headLines}>
                <div className={styles.firstRow}>
                    <AnimatedText text={currentPerson?.firstLine} />
                </div>
                <div className={styles.secondRow}>
                    <AnimatedText text={currentPerson?.secondLine} />
                </div>
                <div className={styles.tryNow}>
                    <RippleButton
                        initialText="Try Now!"
                        newText="Coming Soon!"
                        onClick={() => { }}
                    />
                </div>
            </div>
            <div className={styles.imageSection}>
                <div className={styles.personRow}>
                    <div className={styles.metrics}>
                        <div className={styles.height}>
                            <AnimatedTextCharacter text={currentPerson?.height} staggerRate={0.2} delayRate={0.23} />
                        </div>
                        <div className={styles.weight}>
                            <AnimatedTextCharacter text={currentPerson?.weight} staggerRate={0.2} delayRate={0.23} />
                        </div>
                    </div>
                    <div className={styles.person}>
                        <img
                            src={currentPerson?.image}
                            className={`${styles.personImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}
                        />
                    </div>
                </div>
                <div className={styles.dresses}>
                    {currentPerson?.dresses.map((dress, index) => (
                        <div className={styles.dress} key={`dress_${index}`}>
                            <DressImage imageUrl={dress} className={`${styles.dressImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FashionBanner;
