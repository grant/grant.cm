import classNames from 'classnames';
import Head from 'next/head';
import Layout from '../../components/layout';
import styles from '../home/section/header.module.scss';
import SectionFooter from '../home/section/footer';
import sectionStyles from '../home/section/sections.module.scss';

export default function Consulting() {
  const consultingOptions = [
    {
      duration: 15,
      price: 125,
      title: '15 Min - $125',
      description: 'Brief advice, quick discussions, problem scoping',
    },
    {
      duration: 30,
      price: 225,
      title: '30 Min - $225',
      description: 'Technical analysis, market dynamics, initial strategy',
    },
    {
      duration: 60,
      price: 400,
      title: '60 Min - $400',
      description:
        'Strategic consulting, market research, complex problem solving',
    },
  ];

  return (
    <Layout>
      <Head key="head">
        <title>Timmerman Consulting, LLC</title>
      </Head>

      <section className={classNames(styles.header, sectionStyles.section)}>
        <div className={styles.centerBox}>
          <h1 className={styles.name}>Timmerman Consulting, LLC</h1>

          <div className="text-center max-w-lg mx-auto p-5 text-gray-800">
            <p>
              Timmerman Consulting, LLC specializes in designing and developing
              custom software solutions and websites tailored to meet the unique
              needs of businesses and individuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {consultingOptions.map(option => (
              <a
                key={option.duration}
                href={`/consulting/${option.duration}`}
                className="p-4 rounded-lg shadow hover:shadow-md transition bg-white bg-opacity-10 border-6 border-gray-800"
              >
                <h3 className="font-bold text-lg">{option.title}</h3>
                <p className="">{option.description}</p>
              </a>
            ))}
          </div>

          <p className="text-center max-w-lg mx-auto p-5 text-gray-800">
            If you are interested in consulting services, please contact{' '}
            <span style={{fontFamily: 'monospace', fontWeight: 'bold'}}>
              granttimmerman at gmail
            </span>
            .
          </p>
        </div>
        <div className={styles.arrow}>
          <i className="fa fa-angle-down"></i>
        </div>
      </section>
      <SectionFooter key="footer" />
    </Layout>
  );
}
