import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '../styles/whatdo.module.css';
import AnimatedText from './AnimatedText';
import MediaCard from './MediaCard';

const WhatDo = (props) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    const sectionVariants = {
        offscreen: { y: 100, opacity: 0 },
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

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const spring = {
        type: 'spring',
        stiffness: 100,
        damping: 10,
    };

    return (
        <motion.div
            ref={ref}
            initial="offscreen"
            animate={isInView ? "onscreen" : "offscreen"}
            variants={sectionVariants}
            className={styles.section}
            key={props?.data?.key}
        >
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.header}>
                        <span className={styles.title}>
                            {props?.data?.textCardTitle}
                        </span>
                    </div>
                    <div className={styles.body}>
                        <p className={styles.desc}>
                            {props?.data?.textCardp1}
                        </p>
                        <p className={styles.desc}>
                            {props?.data?.textCardp2}
                        </p>
                        <p className={styles.desc}>
                            {props?.data?.textCardp3}
                        </p>
                        <p className={styles.desc}>
                            {props?.data?.textCardp4}
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
    )
}

export default WhatDo;
