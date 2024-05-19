import React, { useState, useEffect } from 'react';
import styles from '../styles/imageSelector.module.css'
import ImageSlider from './ImageSlider'
import AnimatedTextCharacter from './AnimatedTextCharacter';

const ImageSelector = ({ selector }) => {
    const [selectedPerson, setSelectedPerson] = useState(selector?.person_images?.[0]);
    const [selectedDress, setSelectedDress] = useState(selector?.dress_images?.[0]);
    const [selectedCombo, setSelectedCombo] = useState(null);

    const selectEntity = (image, key) => {
        if (key == 'person') {
            setSelectedPerson(image)
        }
        if (key == 'dress') {
            setSelectedDress(image)
        }
    };


    useEffect(() => {
        const key = `${selectedPerson}_${selectedDress}`
        if (key) {
            setSelectedCombo(selector?.selected_image?.[key])
        }
    }, [selectedPerson, selectedDress]);

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <ImageSlider propKey={'person'} images={selector?.person_images} onClickFunc={selectEntity} selectedImage={selectedPerson} />
                    </div>
                    <div className={styles.center}>
                        <img
                            key={'selected_combo'}
                            src={selectedCombo}
                            alt={`Image ${selectedCombo}`}
                            className={styles.image}
                        />
                        <span className={styles.textImage}><AnimatedTextCharacter text={'Explore Your Style: Try on Any Dress with Just a Click!! :)'} staggerRate={0.2} delayRate={0.23} /></span>
                    </div>
                    <div className={styles.right}>
                        <ImageSlider propKey={'dress'} images={selector?.dress_images} onClickFunc={selectEntity} selectedImage={selectedDress} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageSelector