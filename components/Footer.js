import styles from '../styles/footer.module.css';
import Link from 'next/link';
import React, { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

const Footer = ({ contactData, socialMedia }) => {
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactMsg, setContactMsg] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(false);
    const [loading, setLoading] = useState(false);
    const form = useRef();


    const contactSubmit = () => {
        setLoading(true)
        if (contactName && contactMsg && contactEmail) {
            emailjs.sendForm(process.env.NEXT_PUBLIC_EMAIL_SERVICE, process.env.NEXT_PUBLIC_EMAIL_TEMPLATE, form.current, process.env.NEXT_PUBLIC_EMAIL_KEY)
                .then((result) => {
                    setFormSubmitted(true)
                    setLoading(false)
                }, (error) => {
                    setFormError(true);
                    setLoading(false)
                    console.log(error);
                });
        }
        else {
            setFormError(true);
            setLoading(false)
        }
    }

    const clearState = () => {
        setContactName('')
        setContactEmail('')
        setContactMsg('')
        setFormSubmitted(false)
        setFormError(false)
        setLoading(false)
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.container} id={contactData?.key}>
                {(formSubmitted == true && formError == false) ? <div className={styles.contactSuccess}>
                    <span className={styles.contactTitle}>{contactData?.responseTitle}</span>
                    <div className={styles.contactForm}>
                        <span className={styles.contactResponseText}>{contactData?.responseText}</span>
                        <div className={styles.contactSubmit}>
                            <button
                                className={styles.submitBtn}
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    clearState();
                                }}
                            >
                                {loading ? 'Sending..' : contactData?.responseSubmit}
                            </button>
                        </div>
                    </div>
                </div> : (formError ? <div className={styles.contactSuccess}>
                    <span className={styles.contactTitle}>{contactData?.errorTitle}</span>
                    <div className={styles.contactForm}>
                        <span className={styles.contactResponseText}>{contactData?.errorText}</span>
                        <div className={styles.contactSubmit}>
                            <button
                                className={styles.submitBtn}
                                type="submit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    clearState();
                                }}
                            >
                                {loading ? 'Sending..' : contactData?.errorBtnText}
                            </button>
                        </div>
                    </div>
                </div> :
                    <div className={styles.contact}>
                        <span className={styles.contactTitle}>{contactData?.title}</span>
                        <form
                            className={styles.contactForm}
                            ref={form}
                        >
                            <div className={styles.contactInputLabel}>
                                <label htmlFor={'from_name'}>{contactData?.field1Name}</label>
                                <input
                                    type="text"
                                    placeholder={contactData?.field1Placeholder}
                                    name={'from_name'}
                                    id={contactData?.field1Name}
                                    className={styles.contactInput}
                                    onChange={(e) => setContactName(e.target.value)}
                                    value={contactName}
                                />
                            </div>
                            <div className={styles.contactInputLabel}>
                                <label htmlFor={'reply_to'}>{contactData?.field2Name}</label>
                                <input
                                    type="email"
                                    placeholder={contactData?.field2Placeholder}
                                    name={'reply_to'}
                                    className={styles.contactInput}
                                    required
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    value={contactEmail}
                                />
                            </div>
                            <div className={styles.contactInputLabel}>
                                <label htmlFor={'message'}>{contactData?.field3Name}</label>
                                <textarea
                                    placeholder={contactData?.field3Placeholder}
                                    name={'message'}
                                    className={styles.contactInput}
                                    onChange={(e) => setContactMsg(e.target.value)}
                                    value={contactMsg}
                                />
                            </div>
                            <div className={styles.contactSubmit}>
                                <button
                                    className={styles.submitBtn}
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        contactSubmit()
                                    }}
                                >
                                    {loading ? 'Sending..' : contactData?.submitText}
                                </button>
                            </div>
                        </form>
                        <p className={styles.copyright}>&copy; 2024 AI-Lens | All Rights Reserved</p>
                    </div>)}
            </div>
        </footer>
    )
}

export default Footer