import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/header.module.css';
import AnimatedTextCharacter from './AnimatedTextCharacter';
import Image from 'next/image';
import logo from '../images/videos/logo_edit.gif'

const Header = ({ title, email, location, socialMedia }) => {
  const [isMobileView, setIsMobileView] = useState(false)

  // check mobile view
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      setIsMobileView(true)
    }
    else
      setIsMobileView(false)
  }, [])

  return (
    <section className={styles.topHeader}>
      <div className={styles.container}>
        {isMobileView ? <div className={styles.row}>
          <div className={styles.rowItem}>
            <div>
              <Link href="/" color='foreground' rel="noopener noreferrer" target="_blank">
                <span className={styles.heading}>
                  <Image src={logo} alt="AI Lens" height={500} width={500} style={{
                    width: '154px',
                    height: '64px',
                  }} />
                </span>
              </Link>
            </div>
          </div>
          <div className={styles.rowItem}>
            <div className={styles.rowItemWrap}>
              <div className={styles.telephone}></div>
              <span className={styles.mobileText}><AnimatedTextCharacter text={email} staggerRate={0.03} delayRate={0.04} /></span>
            </div>
            <div className={styles.rowItemWrap}>
              <div className={styles.location}></div>
              <span className={styles.mobileText}><AnimatedTextCharacter text={location} staggerRate={0.2} delayRate={0.23} /></span>
            </div>
          </div>
        </div>
          : <div className={styles.row}>
            <div className={styles.rowItem}>
              <div className={styles.rowItemWrap}>
                <div className={styles.telephone}></div>
                <span className={styles.mobileText}><AnimatedTextCharacter text={email} staggerRate={0.03} delayRate={0.04} /></span>
              </div>
            </div>
            <div className={styles.rowItem}>
              <div>
                <Link href="/" color='foreground' rel="noopener noreferrer" target="_blank">
                  <span className={styles.heading}>
                    <Image src={logo} alt="AI Lens" height={500} width={500} style={{
                      width: '200px',
                      height: '100px',
                    }} />
                  </span>
                </Link>
              </div>
            </div>
            <div className={styles.rowItem}>
              <div className={styles.rowItemWrap}>
                <div className={styles.location}></div>
                <span className={styles.mobileText}><AnimatedTextCharacter text={location} staggerRate={0.2} delayRate={0.23} /></span>
              </div>
            </div>
          </div>}
      </div>
    </section>
  )
}

export default Header