import React from 'react';
import styles from '../styles/whysection.module.css';
import AnimatedText from './AnimatedText';

const WhySection = (props) => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>
                        <AnimatedText text={props?.title} />
                    </span>
                </div>
                <div className={styles.items}>
                    {props?.bulletPoints.map((point, index) => (
                        <div className={styles.item} key={index}>
                            <div className={styles.circle}>
                                <img src={props?.imageSrcList?.[index]} alt={props?.title} className={styles.image} />
                            </div>
                            <div>
                                <span className={styles.listItem}><AnimatedText text={point} /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhySection;
