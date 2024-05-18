import React from 'react'
import styles from '../styles/fashionBanner.module.css'
import ImageTransform from './ImageTransform'
import TextRotator from './TextRotator'

const FashionBanner = ({ banner }) => {
    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.left}>
                    <ImageTransform images={banner?.leftImages} />
                </div>
                <div className={styles.center}>
                    <span className={styles.text}>
                        <TextRotator texts={banner?.texts} staggerRate={0.2} delayRate={0.23} interval={8000} />
                    </span>
                </div>
                <div className={styles.right}>
                    <ImageTransform images={banner?.rightImages} />
                </div>
            </div>
        </div>
    )
}

export default FashionBanner