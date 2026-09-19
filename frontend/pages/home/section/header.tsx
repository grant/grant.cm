export default function SectionHeader() {
  return (
    <section className="relative bg-gradient-to-r from-primary-start to-primary-end h-full overflow-hidden text-center [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer">
      <div className="absolute inset-0 flex h-full w-full flex-col justify-center">
        <h1 className="mx-0 px-0 py-5 pb-[10px] text-center font-montserrat text-[52px] font-bold uppercase leading-none tracking-[5px] text-black-light sm:m-3 sm:ml-1 sm:text-[80px] sm:tracking-[9px]">
          Grant
          <br />
          Timmerman
        </h1>
        <h3 className="mb-[35px] px-4 text-[24px] font-normal leading-tight text-primary-dark sm:mb-[50px] sm:text-[36px]">
          Full-Stack Software Engineer
        </h3>
        <ul>
          {[
            {link: '#about', title: 'About'},
            {link: '#experience', title: 'Experience'},
            {link: '#projects', title: 'Projects'},
            {break: true, title: 'Break'},
            {link: '/videos', title: 'Videos', newTab: true},
            {
              link: 'https://medium.com/@granttimmerman',
              title: 'Blogposts',
              newTab: true,
            },
          ].map(l =>
            l.break ? (
              <li key={l.title} className="flex justify-center py-5">
                <hr className="w-[5%] h-[2px] bg-white/30 border-0" />
              </li>
            ) : (
              <li key={l.title}>
                <a
                  className="inline-flex min-h-11 items-center justify-center px-2 text-medium font-bold leading-none tracking-[2px] text-primary-dark transition-colors duration-normal ease hover:text-white"
                  href={l.link}
                  target={l.newTab ? '_blank' : undefined}
                  rel={l.newTab ? 'noreferrer' : undefined}
                >
                  {l.title}
                  {l.newTab && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="ml-1 h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                    >
                      <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" />
                    </svg>
                  )}
                </a>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
