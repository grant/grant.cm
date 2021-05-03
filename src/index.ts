import * as express from 'express';
import { Request, Response } from 'express';
import { keybaseKey } from './routes/keybase';
import * as favicon from 'serve-favicon';
import * as compression from 'compression';
import * as methodOverride from 'method-override';

// Quickly render the route
const renderTemplate = (name: string) => {
  return (req: Request, res: Response) => {
    return res.render(name);
  };
};
// Quickly return a string
const renderString = (body: string) => {
  return (req: Request, res: Response) => {
    return res.send(body); 
  };
};

const error404 = (req: Request, res: Response) => {
  res.status(404);
  if (req.accepts('html')) {
    return res.render('errorCode', {
      errorCode: 404,
      errorMessage: 'This page<br>does not exist.'
    });
  }
  if (req.accepts('json')) {
    return res.send({
      error: 'Not found'
    });
  }
  return res.type('txt').send('Not found');
};

// Routes setup
export const app = express();
app.set('view engine', 'pug')
app.use(express.static('static', { maxAge: 86400000 }));

// Middleware
app.use(compression());
app.use(methodOverride());

// Pages
app.get('/cal', renderTemplate('cal'));
app.get('/dinner', renderTemplate('dinner'));
app.get('/talks', renderTemplate('talks'));
app.get('/resume', renderTemplate('resume'));
app.get('/keybase.txt', renderString(keybaseKey));
app.get('/', renderTemplate('index'));

// Favicon
app.use(favicon('static/images/favicon.ico'));

// Errors
app.use(error404);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log(`Listening on http://localhost:${PORT}`);
