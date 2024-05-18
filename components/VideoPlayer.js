import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from '../styles/card.module.css';

const VideoPlayer = ({ videosrc }) => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [isTabView, setIsTabView] = useState(false)

    useEffect(() => {
        setDomLoaded(true);
    }, []);
    
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 820px)')
        if (mediaQuery.matches) {
            setIsTabView(true)
        }
        else
            setIsTabView(false)
      }, [domLoaded])

    return (
        <div>
            <ReactPlayer
                url={videosrc}
                controls={false}
                light={false}
                loop
                muted
                playsInline
                playing
                className={styles.videoPlayer}
            />
            <source src={videosrc} type="video/mp4" />
        </div>
    );
};

export default VideoPlayer;