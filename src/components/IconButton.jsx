import React from "react";
import styles from "./IconButton.module.scss";

const IconButton = ({ image, text }) => {
  return (
    <button className={styles.button}>
      <div className={styles.icon}>
        <img src={`/image/icon/light/icon_study_${image}.svg`} alt="" />
      </div>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default IconButton;
