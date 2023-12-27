import {PageTitle} from '../../../components/pageTitle';
import styles from './about.module.scss';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames';

export default function SectionAbout() {
  return (
    <section
      id="about"
      className={classNames(styles.about, sectionStyles.section)}
    >
      <PageTitle title="About" />
      <img
        src="/images/profile.png"
        alt="Grant Timmerman"
        className={
          'block mx-auto mb-5 text-center rounded-full mb-20px p-2 border-2 border-orange-light border-opacity-50 border-dashed'
        }
        style={{width: '200px'}}
      />
      <p className={styles.longBio}>
        <em>Hello there!</em> I'm Grant Timmerman, a software engineer and open
        source enthusiast. I love building delightful developer and user
        experiences.
        <br />
      </p>
    </section>
  );
}
