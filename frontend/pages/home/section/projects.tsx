import styles from './projects.module.scss';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames/bind';

export default function Projects() {
  return (
    <section
      id="projects"
      className={classNames(styles.projects, sectionStyles.section)}>
      <h2 className={styles.title}>Projects</h2>
      <p className={styles.sectionDescription}>
        <em>I shipped it</em>
      </p>
      {/* <div className={styles.centerBox}>
        <h1 className={styles.name}>Grant Timmerman</h1>
        <h3 className={styles.bio}>Google Developer Platform Engineer</h3>
        <ul>
          {[
            {link: '#about', title: 'About'},
            {link: '#experience', title: 'Experience'},
          ].map(l => (
            <li key={l.title}>
              <a className={styles.link} href={l.link}>
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.arrow}>
        <i className="fa fa-angle-down"></i>
      </div> */}
    </section>
  );
}
