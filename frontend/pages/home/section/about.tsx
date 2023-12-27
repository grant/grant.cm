import {PageTitle} from '../../../components/pageTitle';
import sectionStyles from './sections.module.scss';
import classNames from 'classnames';

export default function SectionAbout() {
  return (
    <section
      id="about"
      className={classNames(
        sectionStyles.section,
        'bg-gradient-to-r from-orange-dark to-orange-light'
      )}
    >
      <PageTitle title="About" />
      <img
        src="/images/profile.png"
        alt="Grant Timmerman"
        className={
          'block mx-auto mb-5 text-center rounded-full mb-20px p-2 border-2 border-orange-lightest border-opacity-50 border-dashed'
        }
        style={{width: '200px'}}
      />
      <p
        className={`
          sm:text-medium text-white text-indent-50 max-w-screen-md mx-auto text-center text-small  pb-12 pl-15`}
      >
        <em className="text-orange-lightest">Hello there!</em> I'm Grant
        Timmerman, a software engineer and open source enthusiast. I love
        building delightful developer and user experiences.
        <br />
      </p>
    </section>
  );
}
