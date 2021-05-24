import { Router } from 'preact-router';

import Header from './header';
import About from './about';
import Experience from './experience';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';

export default () => (
	<div class="pageContent">
		<Header />
		<About />
		<Experience />
    {/* URL Routes */}
		<Router>
			<Home path="/" />
			<Profile path="/profile/" user="me" />
			<Profile path="/profile/:user" />
		</Router>
	</div>
);
