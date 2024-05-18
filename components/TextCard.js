import React from 'react'
import styles from '../styles/card.module.css';

const TextCard = (props) => {

  const getStyleFromPosition = (position) => {
    if (position == 'right')
      return styles.rightTextCardContainer
    if (position == 'left')
      return styles.leftTextCardContainer
    if (position == 'center')
      return styles.centerTextCardContainer
  }
  
  return (
    <div className={getStyleFromPosition(props?.position)}>
      <span className={styles.title}>{props?.textCardTitle}</span>
      <p className={styles.description}>{props?.textCardp1}</p>
      {props?.textCardp2 && <p className={styles.description}>{props?.textCardp2}</p>}
      {props?.textCardp3 && <p className={styles.description}>{props?.textCardp3}</p>}
    </div>
  )
}

export default TextCard