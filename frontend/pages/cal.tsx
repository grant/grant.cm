import styles from './cal.module.scss';

// A page with my Google Calendar.
// http://localhost:8080/cal
export default function Cal() {
  return (
    <div className={styles.pageContent}>
      <div className={styles.calArea}>
        <h1 className={styles.title}>Grant Timmerman's Calendar</h1>
        <div className={styles.cal}>
          <iframe
            className={styles.iframe}
            src="https://www.google.com/calendar/embed?showTitle=0&amp;showPrint=0&amp;mode=WEEK&amp;wkst=1&amp;bgcolor=%23ea5f4e&amp;src=granttimmerman%40gmail.com&amp;color=%232952A3&amp;ctz=America%2FLos_Angeles&output=embed"
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
