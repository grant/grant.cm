import styles from './footer.module.scss';

export default function SectionFooter() {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.links}>
          <li>
            <a href="http://www.github.com/grant">GitHub</a>
          </li>
          <li>
            <a href="http://www.linkedin.com/in/granttimmerman">LinkedIn</a>
          </li>
          <li>
            <a href="http://www.twitter.com/granttimmerman">Twitter</a>
          </li>
          <li>
            <a href="https://medium.com/@granttimmerman">Medium</a>
          </li>
          <li>
            <a href="mailto:granttimmerman@gmail.com?subject=Hello%20Grant!&amp;body=Hey%20Grant,%20">
              Contact
            </a>
          </li>
        </ul>
        <div className={styles.message}>Made with ❤ in California</div>
      </nav>
    </footer>
  );
}
