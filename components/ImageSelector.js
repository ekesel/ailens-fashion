import React, { useState, useEffect } from 'react';
import styles from '../styles/imageSelector.module.css'
import ImageSlider from './ImageSlider'

const ImageSelector = ({ selector }) => {
    const [selectedPerson, setSelectedPerson] = useState(selector?.person_images?.[0]);
    const [selectedDress, setSelectedDress] = useState(selector?.dress_images?.[0]);

    const selectEntity = (image, key) => {
        if(key == 'person') {
            index = selector?.person_images?.findIndex(item => item === image);
            if(index != undefined) {
                setSelectedPerson(selector?.person_images?.[index])
            }
        }
        if(key == 'dress') {
            index = selector?.dress_images?.findIndex(item => item === image);
            if(index != undefined) {
                setSelectedDress(selector?.dress_images?.[index])
            }
        }
    };

    return (
        <div className={styles.section}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.left}>
                        <ImageSlider key={'person'} images={selector?.person_images} onClickFunc={selectEntity} selectedImage={selectedPerson} />
                    </div>
                    <div className={styles.center}>
                        <div>

                        </div>
                    </div>
                    <div className={styles.right}>
                        <ImageSlider key={'dress'} images={selector?.dress_images} onClickFunc={selectEntity} selectedImage={selectedDress} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageSelector