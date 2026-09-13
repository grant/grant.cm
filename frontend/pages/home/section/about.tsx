import Image from 'next/image';
import {PageTitle} from '../../../components/pageTitle';

export default function SectionAbout() {
  return (
    <section
      id="about"
      className="[box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] overflow-hidden [&>_.title]:cursor-pointer bg-gradient-to-r from-orange-dark to-orange-light"
    >
      <PageTitle title="About" />
      <Image
        src="/images/profile.png"
        alt="Grant Timmerman"
        width={200}
        height={200}
        className="block mx-auto mb-5 text-center rounded-full mb-20px p-2 border-2 border-orange-lightest/50 border-dashed"
      />
      <p className="mx-auto max-w-screen-md px-5 pb-12 text-center text-small text-white sm:text-medium">
        <em className="font-bold">Hello there!</em> I'm Grant Timmerman, a
        software engineer and open source enthusiast. I love building delightful
        developer and user experiences.
        <br />
      </p>
    </section>
  );
}
