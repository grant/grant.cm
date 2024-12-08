import classNames from 'classnames';
import Head from 'next/head';
import Layout from '../components/layout';
import styles from './home/section/header.module.scss';
import SectionFooter from './home/section/footer';
import sectionStyles from './home/section/sections.module.scss';

export default function Consulting() {
  return (
    <Layout>
      <Head key="head">
        <title>Timmerman Consulting, LLC</title>
      </Head>

      <section className={classNames(styles.header, sectionStyles.section)}>
        <div className={styles.centerBox}>
          <h1 className={styles.name}>Grant Timmerman</h1>
          <h3 className={styles.bio}>Full-Stack Software Engineer</h3>

          <p
            style={{
              textAlign: 'center',
              maxWidth: '440px',
              margin: 'auto',
              padding: '20px',
              color: '#333',
            }}
          >
            If you are interested in consulting services, please contact{' '}
            <span
              style={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
              }}
            >
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
