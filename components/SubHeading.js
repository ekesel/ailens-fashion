import React from 'react'
import styles from '../styles/subHeading.module.css'
import AnimatedTextCharacter from './AnimatedTextCharacter';
import AnimatedTextWord from './AnimatedTextWord';

const SubHeading = ({subHeadingTitle, subHeadingSubTitle, idKey }) => {
  
  return (
    <div className={styles.container} id={idKey}>
        <span className={styles.title}><AnimatedTextCharacter text={subHeadingTitle} /></span>
        <span className={styles.subTitle}><AnimatedTextWord text={subHeadingSubTitle} /></span>
    </div>
  )
}

export default SubHeading