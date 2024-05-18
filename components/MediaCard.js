import React from 'react';
import styles from '../styles/card.module.css';
import VideoPlayer from './VideoPlayer';

const MediaCard = ({ type, src, position }) => {
  return (
    <div className={position == 'left' ? styles.leftCard : styles.rightCard} >
        {type == 'video' && <div className={styles.mediaWrap}>
            <VideoPlayer videosrc={src} />
        </div>}
        {type == 'image' && <div className={styles.mediaWrap}>
          <img src={src} className={styles.image} />
        </div>}
    </div>
  )
}

export default MediaCard