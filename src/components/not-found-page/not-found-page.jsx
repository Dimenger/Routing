import styles from "./not-found-page.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles.notfoundcontainer}>
      <h1 className={styles.errorcode}>404</h1>
      <h2 className={styles.errortitle}>Страница не найдена</h2>
      <p className={styles.errormessage}>
        Извините, запрошенная страница не существует.
      </p>
    </div>
  );
};
