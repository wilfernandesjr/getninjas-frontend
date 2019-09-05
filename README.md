# GetNinjas Frontend Challenge
[![Build Status](https://travis-ci.com/wilfernandesjr/getninjas-frontend.svg?token=A1spyHnWyE8BsYUnyxgW&branch=master)](https://travis-ci.com/wilfernandesjr/getninjas-frontend)

> GetNinjas Frontend Challenge is an application to render a frontend form based on a given model. It's used to evaluate the front end position candidates. You can [check the constraints here!](https://github.com/getninjas/frontend-challenge)

| Environment | URL  |
| ------------- | ------------- |
| local | http://localhost:8080/public/ |
| production | https://s3-sa-east-1.amazonaws.com/getninjas.wilfernandes.com.br/index.html |

### Application Architecture
It uses the following stack of technologies:
> - Node.js
> - Babel
> - Webpack
> - Sass
> - WebComponents (without any polyfill, through customElement)
> - Jest (unit tests)
> - Cypress (e2c tests)
> - Travis CI (CI/CD)

The repository for the API that this project connects is available [here](https://github.com/wilfernandesjr/getninjas-frontend-api)

### Installing Dependencies

Install project dependencies:
```
$ yarn install
```

### Running Application
Main commands:

Running project locally:
```
$ yarn dev
```

Running automated tests
```
$ yarn test
```

I've decided to implement only a few unit tests because its complexity when dealing with webcomponents. I realize there's a lack of tools to emulate DOM in these scenarios. Besides that, following the philosophy *"Write tests. Not too many. Mostly integrations"*, I've already a great coverage with all the scenarios tested on e2e through cypress.
