import styles from './error.module.scss';

export default function Error({
  errorMessage,
  errorCode,
}: {
  errorMessage: string;
  errorCode: string;
}) {
  return (
    <div className={styles.fullPage}>
      <div className={styles.center}>
        <span className={styles.quoteMark}>&ldquo;</span>
        <h1 className={styles.errorMessage}>{errorMessage}</h1>
        <h3 className={styles.errorCode}>{errorCode}</h3>
        <hr className={styles.lineBreak} />
        <h3 className={styles.home}>
          <a className={styles.errorLink} href="/">
            Go home
          </a>
        </h3>
      </div>
    </div>
  );
}
