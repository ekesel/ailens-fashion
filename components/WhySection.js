import React from 'react';
import styles from '../styles/whysection.module.css';
import AnimatedText from './AnimatedText';
import Image from 'next/image'

const WhySection = (props) => {
    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.titleContainer}>
                    <span className={styles.title}>
                        <AnimatedText text={props?.title} />
                    </span>
                    <span className={styles.desc}>
                        <AnimatedText text={props?.description} />
                    </span>
                </div>
                <div className={styles.items}>
                    {props?.bulletPoints.map((point, index) => (
                        <div className={styles.item} key={index}>
                            <div className={styles.circle}>
                                <Image
                                    src={props?.imageSrcList?.[index]}
                                    alt={props?.title}
                                    priority
                                    className={styles.image}
                                    width={500}
                                    height={700}
                                    style={{
                                        width: '96px',
                                        height: '96px'
                                    }}
                                />
                            </div>
                            <div>
                                <span className={styles.listItem}>{point}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhySection;
