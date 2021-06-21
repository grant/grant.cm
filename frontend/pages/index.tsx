import Head from 'next/head';
import Layout, {siteTitle} from '../components/layout';
import {GetStaticProps} from 'next';
import SectionHeader from './home/section/header';
import SectionAbout from './home/section/about';
import SectionExperience from './home/section/experience';
import SectionFooter from './home/section/footer';

export default function Home() {
  return (
    <Layout>
      <Head key="head">
        <title>{siteTitle}</title>
      </Head>
      <SectionHeader key="header" />
      <SectionAbout key="about" />
      <SectionExperience key="experience" />
      {/* Talks */}
      {/* Projects */}
      <SectionFooter key="footer" />
    </Layout>
  );
}
