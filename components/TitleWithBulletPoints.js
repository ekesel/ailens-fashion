import React, { useEffect, useRef } from 'react';
import styles from '../styles/TitleWithBulletPoints.module.css';

const TitleWithBulletPoints = ({ title, description, bulletPoints, imageSrc }) => {
  const listRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.5 }
    );

    listRef.current.forEach(item => {
      if (item) {
        observer.observe(item);
      }
    });

    return () => {
      listRef.current.forEach(item => {
        if (item) {
          observer.unobserve(item);
        }
      });
    };
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.otherDetails}>
        <img src={imageSrc} alt={title} className={styles.image} />
        <ul className={styles.list}>
          {bulletPoints.map((point, index) => (
            <li
              key={index}
              className={styles.listItem}
              ref={el => listRef.current[index] = el}
            >
              {point}
            </li>
          ))}
        </ul>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default TitleWithBulletPoints;
