import React, { useState, useEffect } from "react";
import { url } from "../const";
import { useParams } from "react-router-dom";
import styles from "./BookDetail.module.scss";
import IconButton from "./IconButton";
import Breadcrumb from "./Breadcrumb";
import Loading from "./Loading";

//redux
import { connect } from "react-redux";
import { addToMyBooks, removeFromMyBooks } from "../actions";

const BookDetail = ({ mybooks, addToMyBooks, removeFromMyBooks }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState(null);

  //redux
  const isMyBooks = mybooks.includes(id);
  const toggleFavorite = () => {
    if (isMyBooks) {
      removeFromMyBooks(id);
    } else {
      addToMyBooks(id);
    }
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await fetch(`${url}/mock/book/all`);
        if (!response.ok) {
          throw new Error("データを取得できませんでした");
        }

        const data = await response.json();

        // 一覧データからid_bookに一致する本を検索
        const allCategory = data.top_category_list.find((category) => {
          return category.name_category === "すべて";
        });

        let foundBook = null;

        if (allCategory) {
          allCategory.sub_category_list.forEach((subCategory) => {
            if (foundBook) {
              return; // 早期リターン
            }
            const book = subCategory.book_list.find(
              (book) => book.id_book === id
            );
            if (book) {
              foundBook = book;
            }
          });
        }

        if (foundBook) {
          setBookData(foundBook);
          setLoading(false); //データの取得が完了したらfalse
        }
      } catch (error) {
        console.error("エラー:", error);
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, []);

  return (
    <div className={styles[`l-detail`]}>
      <Breadcrumb current={"書籍詳細"} isTop={false} />
      {loading ? (
        <Loading />
      ) : (
        <div className="outer">
          <div className="inner-narrow">
            <div className={styles.content}>
              <div className={styles.overall}>
                <div className={styles.thumbnail}>
                  <img src={bookData.img_url} alt={bookData.name_book} />
                </div>
                <div className={styles.info}>
                  <h2 className={styles.title}>{bookData.name_book}</h2>
                  <div className={styles.detail}>
                    <span className={styles.tag}>著者</span>
                    {bookData.author}
                  </div>
                  <div className={styles.detail}>
                    <span className={styles.tag}>出版社</span>
                    {bookData.publisher}
                  </div>
                  <div className={styles["button-wrap"]}>
                    <button
                      onClick={toggleFavorite}
                      className={isMyBooks ? styles.active : styles.inactive}
                    >
                      MyBooks{isMyBooks ? <span>削除</span> : <p>追加</p>}
                    </button>
                    <div className={styles.active}>
                      読み放題中
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["icon-button-wrap"]}>
                <IconButton image={"quiz"} text={"アプリ学習"} />
                <IconButton image={"test"} text={"テスト"} />
                <IconButton image={"sound"} text={"音声(無料)"} />
                <IconButton image={"sw"} text={"SWトレ"} />
                <IconButton image={"vocab"} text={"単語一覧"} />
                <IconButton image={"marksheet"} text={"マークシート"} />
                <IconButton image={"record"} text={"学習記録"} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  mybooks: state.mybooks,
});

export default connect(mapStateToProps, { addToMyBooks, removeFromMyBooks })(
  BookDetail
);
