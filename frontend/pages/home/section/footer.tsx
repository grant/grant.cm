export default function SectionFooter() {
  const links = [
    {href: 'http://www.github.com/grant', label: 'GitHub'},
    {href: 'http://www.linkedin.com/in/granttimmerman', label: 'LinkedIn'},
    {href: 'http://www.twitter.com/granttimmerman', label: 'Twitter'},
    {href: 'https://medium.com/@granttimmerman', label: 'Medium'},
    {
      href: 'mailto:granttimmerman@gmail.com?subject=Hello%20Grant!&amp;body=Hey%20Grant,%20',
      label: 'Contact',
    },
  ];

  return (
    <footer className="block bg-[rgb(45,62,82)] text-gray-light text-small py-[30px] px-5 pb-[50px] md:pb-[30px]">
      <nav>
        <ul className="md:float-left">
          {links.map((link, index) => (
            <li
              key={link.href}
              className="md:inline font-normal md:block text-center [&:not(:first-child)]:md:pl-[15px]"
            >
              {index > 0 && (
                <span className="hidden md:inline text-gray-light pr-[15px]">
                  |
                </span>
              )}
              <a
                href={link.href}
                className="text-gray-light transition-colors duration-normal hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-5 text-center md:float-right md:pt-0">
          Made with ❤ in California
        </div>
      </nav>
    </footer>
  );
}
