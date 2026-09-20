export default function SectionFooter() {
  const links = [
    {href: 'https://www.github.com/grant', label: 'GitHub'},
    {href: 'https://www.linkedin.com/in/granttimmerman', label: 'LinkedIn'},
    {href: 'https://www.twitter.com/granttimmerman', label: 'Twitter'},
    {href: 'https://medium.com/@granttimmerman', label: 'Medium'},
    {
      href: 'mailto:granttimmerman@gmail.com?subject=Hello%20Grant!&amp;body=Hey%20Grant,%20',
      label: 'Contact',
    },
  ];

  return (
    <footer className="bg-navy px-5 py-[30px] pb-[50px] text-small text-gray-light md:pb-[30px]">
      <nav className="flex flex-col items-center gap-5 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-col items-center md:flex-row md:items-center">
          {links.map((link, index) => (
            <li key={link.href} className="flex items-center font-normal">
              {index > 0 && (
                <span
                  className="hidden px-[15px] text-gray-light md:inline"
                  aria-hidden="true"
                >
                  |
                </span>
              )}
              <a
                href={link.href}
                className="inline-flex min-h-11 items-center px-2 text-gray-light transition-colors duration-normal hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-center">Made with ❤ in California</p>
      </nav>
    </footer>
  );
}
