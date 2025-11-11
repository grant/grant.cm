export default function SectionHeader() {
  return (
    <section className="bg-gradient-to-r from-[rgb(200,60,50)] to-[rgb(255,160,140)] h-full overflow-hidden text-center [box-shadow:inset_0_-20px_20px_-20px_rgba(0,0,0,0.35)] [&>_.title]:cursor-pointer">
      <div className="absolute left-1/2 top-1/2 w-[1400px] h-[700px] -ml-[700px] -mt-[300px]">
        <h1 className="font-montserrat text-black-light font-bold text-[80px] tracking-[9px] uppercase text-center py-5 px-0 pb-[10px] leading-none m-3 ml-1">
          Grant
          <br />
          Timmerman
        </h1>
        <h3 className="font-normal text-red-dark text-[36px] mb-[50px]">
          Full-Stack Software Engineer
        </h3>
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
                <hr className="w-[5%] h-[2px] bg-white/30 border-0" />
              </li>
            ) : (
              <li key={l.title}>
                <a
                  className="text-medium leading-[2em] tracking-[2px] text-red-dark transition-colors duration-normal ease hover:text-white font-bold"
                  href={l.link}
                >
                  {l.title}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </section>
  );
}
