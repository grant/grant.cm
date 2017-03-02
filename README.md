# grant.cm

The website [grant.cm](http://grant.cm)

### How to start server

```sh
npm start
open http://localhost:3000
```

### How to develop

```sh
gulp
```

### How to deploy

```sh
heroku git:remote -a granttimmerman
git push heroku master
```

### Gulp tasks

- `gulp`: Builds and watches for changed files
- `gulp build`: Compiles and builds the generated files
- `gulp watch`: Watches files
- `gulp coffee`: Lints coffeescript and browserifies client coffeescript
- `gulp stylus`: Compiles stylus
- `gulp image`: Minifies images

### Built with

- :coffee: Coffeescript
- :cloud: Express
- :lipstick: Stylus
- :gem: Jade
- :tropical_fish: Gulp
