import React, { useState, useEffect } from "react";
import { url } from "../const";
import styles from "./BookList.module.scss";
import Loading from "./Loading";
import Breadcrumb from "./Breadcrumb";
import BookItem from "./BookItem";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${url}/mock/book/all`);
        if (!response.ok) {
          throw new Error("データを取得できませんでした");
        }

        const data = await response.json();

        // id_top_category別に書籍をグループ化
        const groupedBooks = {};
        data.top_category_list.forEach((category) => {
          const categoryName = category.name_category;
          if (categoryName === "すべて") {
            groupedBooks[categoryName] = category.sub_category_list;
          }
        });
        setCategories(groupedBooks);

        setLoading(false); //データの取得が完了したらfalse
      } catch (error) {
        console.error("エラー:", error);
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Breadcrumb current={"すべて"} isTop={true} />
      {loading ? (
        <Loading />
      ) : (
        <div className="outer">
          <div className="inner">
            {Object.keys(categories).map((name_category) => (
              <div className={styles.category} key={name_category}>
                {categories[name_category].map((subCategory) => (
                  <div
                    key={subCategory.id_category}
                    className={styles.category}
                  >
                    <h2 className={styles.subtitle}>
                      {subCategory.name_category}
                    </h2>
                    <div className={styles.list}>
                      {subCategory.book_list.map((book) => (
                        <BookItem key={book.id_book} book={book} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookList;
