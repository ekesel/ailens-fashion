import React, { useState, useEffect } from 'react';
import styles from '../styles/viton.module.css';

const VirtualTryOn = ({ personDetails, selectedImage }) => {
    const [selectedPersonIndex, setSelectedPersonIndex] = useState(0);
    const [selectedDressIndex, setSelectedDressIndex] = useState(0);
    const [isMobileView, setIsMobileView] = useState(false);
    const [showAllPersons, setShowAllPersons] = useState(false);

    // check mobile view
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)')
        setIsMobileView(mediaQuery.matches);

        const handleResize = () => {
            setIsMobileView(mediaQuery.matches);
        };

        mediaQuery.addEventListener('change', handleResize);

        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, []);

    const handlePersonChange = (index) => {
        setSelectedPersonIndex(index);
        setSelectedDressIndex(0); // Reset dress selection when changing person
    };

    const handleDressChange = (index) => {
        setSelectedDressIndex(index);
    };

    const selectedPerson = personDetails[selectedPersonIndex];
    const selectedDress = selectedPerson.dresses[selectedDressIndex];
    const personImage = selectedPerson.image;
    const finalImage = selectedImage[`${personImage}_${selectedDress}`];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Virtual Try-On</h1>
            <div className={styles.tryOnContainer}>
                <div className={styles.personContainer}>
                    <div className={styles.slideAnimationWrapper}>
                        <div className={styles.slideAnimation}>
                            <img src={finalImage} alt="Person" className={styles.personImage} />
                            <div className={styles.hoverText}>
                                <p>How does it look?</p>
                                <p>Change dress or person to view more.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.dressSelector}>
                    <div className={styles.selectRow}>
                        {!isMobileView && <div className={styles.arrowButtonContainer}>
                                    <button
                                        className={styles.arrowButton}
                                        onClick={() =>
                                            setSelectedPersonIndex(
                                                (selectedPersonIndex - 1 + personDetails.length) % personDetails.length
                                            )
                                        }
                                    >
                                        {'<'}
                                    </button>
                                </div>}
                        <div className={styles.dressThumbnailsContainer}>
                            {(isMobileView ? (showAllPersons ? personDetails : personDetails.slice(0, 2)).map((person, index) => (
                                <img
                                    key={index}
                                    src={person.image}
                                    alt={`Person ${index + 1}`}
                                    className={styles.dressThumbnail}
                                    onClick={() => handlePersonChange(index)}
                                    onMouseOver={() => handlePersonChange(index)} // Add hover effect
                                    style={{ border: selectedPersonIndex === index ? '4px solid #cdb5ffbf' : '4px solid transparent' }}
                                />
                            )) : personDetails.map((person, index) => (
                                <img
                                    key={index}
                                    src={person.image}
                                    alt={`Person ${index + 1}`}
                                    className={styles.dressThumbnail}
                                    onClick={() => handlePersonChange(index)}
                                    onMouseOver={() => handlePersonChange(index)} // Add hover effect
                                    style={{ border: selectedPersonIndex === index ? '4px solid #cdb5ffbf' : '4px solid transparent' }}
                                />
                            )))}
                        </div>
                        {isMobileView  && (
                            <div className={styles.arrowButtonContainer}>
                                {!showAllPersons ? <button
                                    className={styles.arrowButton}
                                    onClick={() => setShowAllPersons(true)}
                                >
                                    {'▼'}
                                </button> : <button
                                    className={styles.arrowButton}
                                    onClick={() => setShowAllPersons(false  )}
                                >
                                    {'▲'}
                                </button>}
                            </div>
                        )}
                        {!isMobileView && (
                            <React.Fragment>
                                <div className={styles.arrowButtonContainer}>
                                    <button
                                        className={styles.arrowButton}
                                        onClick={() => setSelectedPersonIndex((selectedPersonIndex + 1) % personDetails.length)}
                                    >
                                        {'>'}
                                    </button>
                                </div>
                            </React.Fragment>
                        )}
                    </div>
                    <div className={styles.dressThumbnailsContainer}>
                        {personDetails[selectedPersonIndex].dresses.map((dress, index) => (
                            <img
                                key={index}
                                src={dress}
                                alt={`Dress ${index + 1}`}
                                className={styles.dressThumbnail}
                                onClick={() => handleDressChange(index)}
                                onMouseOver={() => handleDressChange(index)} // Add hover effect
                                style={{ border: selectedDressIndex === index ? '4px solid #cdb5ffbf' : '4px solid transparent' }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualTryOn;
