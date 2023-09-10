import React from "react";
import { Link } from "react-router-dom";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb = ({ current, isTop }) => {
  return (
    <div className={styles.breadcrumb}>
      <ul className={styles.list}>
        {!isTop && (
          <li>
            <Link to="/" className={styles.arrow}></Link>
          </li>
        )}
        <li>{current}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
