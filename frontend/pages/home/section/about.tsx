import styles from './about.module.scss';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames/bind';

export default function SectionAbout() {
  return (
    <section
      id="about"
      className={classNames(styles.about, sectionStyles.section)}
    >
      <h2 className={styles.title}>About</h2>
      <img
        className={styles.profile}
        src="/images/profile.png"
        alt="Grant Timmerman"
      />
      <p className={styles.longBio}>
        <em>Hello there!</em> I'm Grant Timmerman, a platform engineer and open
        source enthusiast. I love building delightful developer experiences.
        <br />
      </p>
    </section>
  );
}
