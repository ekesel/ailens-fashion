import React, { useState, useEffect } from 'react'
import styles from '../styles/ethical.module.css';
import Image from 'next/image';
import ethicalGirl from '../public/images/ethicalgirl.png'
import ethicalGirl1 from '../public/images/ethicalgirl1.png'
import checkbox from '../images/icons/check.svg'

const EthicalAI = ({ data }) => {
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
    <div className={styles.section}>
      <div className={styles.headers}>
        <span className={styles.title}>{data?.title}</span>
        <span className={styles.desc}>{data?.desc}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.left}>
          {!isMobileView && <Image src={ethicalGirl1} width={600} height={600} />}
        </div>
        <div className={styles.center}>
          {isMobileView && <Image src={ethicalGirl1} width={600} height={600} />}
          {data?.points.map((point, index) => (
            <div className={styles.elementBox}>
              <div className={styles.element}>
                <Image src={checkbox} width={25} height={25} />
                <span className={styles.elementTitle}>{point?.title}</span>
              </div>
              <span className={styles.elementDesc}>{point?.desc}</span>
            </div>))}
        </div>
        <div className={styles.right}>
          {!isMobileView && <Image src={ethicalGirl} width={600} height={600} />}
        </div>
      </div>
    </div>
  )
}

export default EthicalAI