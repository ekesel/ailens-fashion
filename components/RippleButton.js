import React, { useState } from 'react';
import styles from '../styles/RippleButton.module.css'; // Import your CSS file

const RippleButton = ({ initialText, newText, onClick }) => {
    const [ripple, setRipple] = useState(false);
    const [text, setText] = useState(initialText);

    const handleClick = () => {
        setRipple(true);
        setText(newText);
        onClick(); // Invoke the onClick function passed as a prop

        // Reset ripple effect after animation duration
        setTimeout(() => {
            setRipple(false);
        }, 600); // Adjust the duration (600ms in this example)
    };

    const handleEnter = () => {
        setRipple(true);
        setText(newText);
    };

    const handleRemove = () => {
        setRipple(false);
        setText(initialText);
    };

    return (
        <button
            className={`${styles.rippleButton} ${ripple ? styles.rippleEffect : ''}`}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            // onMouseLeave={handleRemove}
            disabled={ripple}
        >
            {text}
        </button>
    );
};

export default RippleButton;
