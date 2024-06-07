import React, { useState, useEffect } from 'react';
import styles from '../styles/fashionBanner.module.css';
import AnimatedTextWord from './AnimatedTextWord';
import RippleButton from './RippleButton';
import Image from 'next/image';
// Static imports for person images
import person1 from '../public/images/person1.png';
import person2 from '../public/images/person2.png';
import person3 from '../public/images/person3.png';
import person4 from '../public/images/person4.png';

// Static imports for dress images
import dressp1_1 from '../public/images/p1_dress1.png';
import dressp1_2 from '../public/images/p1_dress2.png';
import dressp1_3 from '../public/images/p1_dress3.png';
import dressp1_4 from '../public/images/p1_dress4.png';

import dressp2_1 from '../public/images/p2_dress1.png';
import dressp2_2 from '../public/images/p2_dress2.png';
import dressp2_3 from '../public/images/p2_dress3.png';
import dressp2_4 from '../public/images/p2_dress4.png';

import dressp3_1 from '../public/images/p3_dress1.png';
import dressp3_2 from '../public/images/p3_dress2.png';
import dressp3_3 from '../public/images/p3_dress3.png';
import dressp3_4 from '../public/images/p3_dress4.png';

import dressp4_1 from '../public/images/p4_dress1.png';
import dressp4_2 from '../public/images/p4_dress2.png';
import dressp4_3 from '../public/images/p4_dress3.png';
import dressp4_4 from '../public/images/p4_dress4.png';

// Simple mapping object with modified keys
const mapping = {
    'person1': person1,
    'person2': person2,
    'person3': person3,
    'person4': person4,
    'p1_dress1': dressp1_1,
    'p1_dress2': dressp1_2,
    'p1_dress3': dressp1_3,
    'p1_dress4': dressp1_4,
    'p2_dress1': dressp2_1,
    'p2_dress2': dressp2_2,
    'p2_dress3': dressp2_3,
    'p2_dress4': dressp2_4,
    'p3_dress1': dressp3_1,
    'p3_dress2': dressp3_2,
    'p3_dress3': dressp3_3,
    'p3_dress4': dressp3_4,
    'p4_dress1': dressp4_1,
    'p4_dress2': dressp4_2,
    'p4_dress3': dressp4_3,
    'p4_dress4': dressp4_4,
};



const DressImage = ({ imageUrl, className, isMobileView }) => {

    return (
        <Image
            src={mapping[imageUrl]}
            alt="dress_image"
            className={className}
            width={500}
            height={700}
            priority
            style={{
                width: isMobileView ? "200px" : "400px",
                height: isMobileView ? "200px" : "400px",
                objectFit: 'cover'
            }}
        />
    );
};

const FashionBanner = ({ personDetails, interval }) => {
    const [currentPersonIndex, setCurrentPersonIndex] = useState(0);
    const [currentPerson, setCurrentPerson] = useState(personDetails[0]);
    const [flip, setFlip] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    // check mobile view
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        if (mediaQuery.matches) {
            setIsMobileView(true)
        }
        else
            setIsMobileView(false)
    }, [])

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
            <div className={`${styles.headLines} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}>
                <div className={styles.firstRow}>
                    {currentPerson?.firstLine}
                </div>
                <div className={styles.secondRow}>
                    {currentPerson?.secondLine}
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
                            src={mapping[currentPerson?.image]}
                            alt="person_image"
                            className={`${styles.personImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`}
                            width={500}
                            height={700}
                            priority
                            style={{
                                width: '250px',
                                height: '200px',
                                objectFit: 'contain'
                            }}
                        />
                    </div>
                </div>
                <div className={styles.dresses}>
                    {currentPerson?.dresses.map((dress, index) => (
                        <div className={styles.dress} key={`dress_${index}`}>
                            <DressImage isMobileView={isMobileView} imageUrl={dress} className={`${styles.dressImage} ${flip ? styles['flip-exit'] : styles['flip-enter']}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FashionBanner;
