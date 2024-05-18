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
        if(contactName && contactMsg && contactEmail) {
            emailjs.sendForm('service_yccr9l9', 'template_ylbxkou', form.current, 'Q5XUJuNrqxlaHUEEz')
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
            <div className={styles.waves}>
                <div className={styles.wave1}></div>
                <div className={styles.wave2}></div>
                <div className={styles.wave3}></div>
                <div className={styles.wave4}></div>
            </div>
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
                    </div>)}
                <div className={styles.footerNavBar}>
                    <div className={styles.iconRow}>
                        <div className={styles.iconRowItem}>
                            <div className={styles.rowItemWrap}>
                                <Link href={socialMedia?.linkedIn} rel="noopener noreferrer" target="_blank"><div className={styles.linkedIn}></div>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.iconRowItem}>
                            <div className={styles.rowItemWrap}>
                                <Link href={socialMedia?.twitter} rel="noopener noreferrer" target="_blank"><div className={styles.twitter}></div>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.iconRowItem}>
                            <div className={styles.rowItemWrap}>
                                <Link href={socialMedia?.facebook} rel="noopener noreferrer" target="_blank"><div className={styles.facebook}></div>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.iconRowItem}>
                            <div className={styles.rowItemWrap}>
                                <Link href={socialMedia?.instagram} rel="noopener noreferrer" target="_blank"><div className={styles.instagram}></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className={styles.menu}>
                        <li className={styles.menu__item}><Link className={styles.menu__link} href="/">Home</Link></li>
                        <li className={styles.menu__item}><Link className={styles.menu__link} href="/#about_us_page" >About</Link></li>
                        <li className={styles.menu__item}>
                            <Link className={styles.menu__link} href="/#products" scroll={false}>Products</Link></li>
                    </ul>
                    <p className={styles.copyright}>&copy; 2024 AI Lens | All Rights Reserved</p>
                    <p className={styles.credits}>Site Developed By <Link href={'https://www.linkedin.com/in/ekesel/'} rel="noopener noreferrer" target="_blank">@ekesel</Link> and <Link href={'https://www.linkedin.com/in/aryanagr/'} rel="noopener noreferrer" target="_blank">@aryanagr</Link></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer