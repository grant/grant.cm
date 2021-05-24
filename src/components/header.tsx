import { Link } from 'preact-router/match';

const Header = () => (
  <header>
    <div class="centerBox">
      <h1 class="name">Grant Timmerman</h1>
      <h3 class="bio">Google Developer Platform Engineer</h3>
      <ul><a href="#about">
        <li>About</li>
      </a><a href="#experience">
          <li>Experience</li>
        </a></ul>
    </div>
    <div class="arrow"><i class="fa fa-angle-down"></i></div>
  </header>
);

// <header class="header">
// <h1>Preact App</h1>
// <nav>
//   <Link activeClassName="active" href="/">Hoffme</Link>
//   <Link activeClassName="active" href="/profile">Mre</Link>
//   <Link activeClassName="active" href="/profile/john">sdf</Link>
// </nav>
// </header>

export default Header;
