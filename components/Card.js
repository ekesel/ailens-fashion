import React from 'react';
import TextCard from "./TextCard";
import { motion } from "framer-motion";
import styles from '../styles/card.module.css';

const Card = ({ data }) => {

    const cardVariants = {
        offscreen: {
            y: 300,
        },
        onscreen: {
            y: 50,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8
            }
        }
    };

    return (
        <motion.div
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
        >
            <div id={data?.key}>
                <motion.div className={styles.cardContainer} variants={cardVariants}>
                    <span className={styles.cardTitle}>{data?.card_title}</span>
                    <div className={styles.cardBody}>
                        <TextCard position={data?.position}
                            textCardTitle={data?.textCardTitle}
                            textCardp1={data?.textCardp1}
                            textCardp2={data?.textCardp2}
                            textCardp3={data?.textCardp3}
                        />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Card