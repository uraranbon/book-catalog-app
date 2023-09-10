import React from "react";
import styles from "./IconButton.module.scss";

const isDarkModeEnabled = () => {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
};

const IconButton = ({ image, text }) => {
  //ダークモード判別
  const isDark = isDarkModeEnabled();
  const imagePath = isDark
    ? `/image/icon/dark/icon_study_${image}.svg`
    : `/image/icon/light/icon_study_${image}.svg`;

  return (
    <button className={styles.button}>
      <div className={styles.icon}>
        <img src={imagePath} alt="" />
      </div>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

export default IconButton;
