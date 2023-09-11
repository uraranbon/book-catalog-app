import React from "react";
import { Link } from "react-router-dom";
import styles from "./BookItem.module.scss";

const BookItem = ({ book }) => {
  return (
    <Link to={`/detail/${book.id_book}`} className={styles.item}>
      <img src={book.img_url} alt={book.name_book} />
    </Link>
  );
};

export default BookItem;