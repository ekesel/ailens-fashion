import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/whatdo.module.css';
import AnimatedText from './AnimatedText';
import MediaCard from './MediaCard';

const WhatDo = (props) => {
    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const cardVariants = {
        offscreen: {
            y: 300,
            opacity: 0,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
            },
        },
    };

    return (
        <motion.div
            className={styles.section}
            key={props?.data?.key}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
            variants={cardVariants}
        >
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.header}>
                        <span className={styles.title}><AnimatedText text={props?.data?.textCardTitle} /></span>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.desc}>
                            <AnimatedText text={props?.data?.textCardp1} />
                        </p>
                        <p className={styles.desc}>
                            <AnimatedText text={props?.data?.textCardp2} />
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.imageWrap}>
                        {domLoaded && <MediaCard type={props?.data?.mediaCardType} images={props?.data?.mediaCardSrc} position={'right'} />}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WhatDo;
