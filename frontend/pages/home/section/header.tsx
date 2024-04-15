import styles from './header.module.scss';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames';

export default function SectionHeader() {
  return (
    <section className={classNames(styles.header, sectionStyles.section)}>
      <div className={styles.centerBox}>
        <h1 className={styles.name}>Grant Timmerman</h1>
        <h3 className={styles.bio}>Full-Stack Software Engineer</h3>
        <ul>
          {[
            {link: '#about', title: 'About'},
            {link: '#experience', title: 'Experience'},
            {link: '#projects', title: 'Projects'},
            {break: true, title: 'Break'},
            {link: '/videos', title: 'Videos'},
            {link: 'https://medium.com/@granttimmerman', title: 'Blogposts'},
          ].map(l =>
            l.break ? (
              <li key={l.title} className="flex justify-center py-5">
                <hr />
              </li>
            ) : (
              <li key={l.title}>
                <a className={styles.link} href={l.link}>
                  {l.title}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
      <div className={styles.arrow}>
        <i className="fa fa-angle-down"></i>
      </div>
    </section>
  );
}
