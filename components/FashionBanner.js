import React, { useState, useEffect } from 'react';
import styles from '../styles/fashionBanner.module.css';
import AnimatedTextCharacter from './AnimatedTextCharacter';
import AnimatedText from './AnimatedText';
import RippleButton from './RippleButton';
import Image from 'next/image'


const DressImage = ({ imageUrl, className }) => {

    return (
        <Image
            src={imageUrl}
            alt="dress_image"
            priority
            className={className}
            width={500}
            height={700}
            style={{
                width: '420px',
                height: '420px',
                objectFit: 'cover'
            }}
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
                    {/* <div className={styles.metrics}>
                        <div className={styles.height}>
                            <AnimatedTextCharacter text={currentPerson?.height} staggerRate={0.2} delayRate={0.23} />
                        </div>
                        <div className={styles.weight}>
                            <AnimatedTextCharacter text={currentPerson?.weight} staggerRate={0.2} delayRate={0.23} />
                        </div>
                    </div> */}
                    <div className={styles.person}>
                        <Image
                            src={currentPerson?.image}
                            alt="person_image"
                            priority
                            className={`${styles.personImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}
                            width={500}
                            height={700}
                            style={{
                                width: '270px',
                                height: '270px'
                            }}
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
