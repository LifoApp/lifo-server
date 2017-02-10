# Lyne App Server
###### The server portion of the Lyne Service

[![Version][version-img]][version-url]
[![Build Status][build-img]][build-url]
[![Codecov][codecov-img]][codecov-url]
[![Dependency Status][dependency-img]][dependency-url]
[![Dev Dependency Status][dev-dependency-img]][dev-dependency-url]
[![Known Vulnerabilities][snyk-img]][snyk-url]

### Requirements
Install `npm` if you don't already have them installed.
```
brew install node
```

- If you do not have `brew`, go [here](http://brew.sh). (Its a macOS only tool)
- If you cannot use `brew`, go [here](https://nodejs.org/en/).

### Installation
Download and install the server.
```
git clone https://github.com/LyneApp/lyne-server.git
cd lyne-server
npm install
```

Configure the server with a `.env` file at the root of the repo, alongside `package.json`.
```
DATABASE_URL=postgres://user:password@localhost:5432/db
```

Alternately, get the most recent `.env` file from the Lyne Slack. The most recent is from _Feb, 9_.

### Running & Development
Start the server.
```
npm start
```

Alternately, start server to auto restart when a file changes, _provided by [nodemon](https://github.com/remy/nodemon/)_.
```
npm run nodemon
```

Run the tests.
```
npm test
npm run lint
```

To view a coverage report, run `npm test`, then `npm run report`, then open up `coverage/lcov-report/index.html` in a web browser.

[version-img]: https://img.shields.io/badge/version-alpha%201-red.svg
[version-url]: https://github.com/LyneApp/lyne-server

[build-img]: https://travis-ci.org/LyneApp/lyne-server.svg?branch=master
[build-url]: https://travis-ci.org/LyneApp/lyne-server

[codecov-img]: https://codecov.io/gh/LyneApp/lyne-server/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/LyneApp/lyne-server

[dependency-img]: https://david-dm.org/LyneApp/lyne-server.svg
[dependency-url]: https://david-dm.org/LyneApp/lyne-server

[dev-dependency-img]: https://david-dm.org/LyneApp/lyne-server/dev-status.svg
[dev-dependency-url]: https://david-dm.org/LyneApp/lyne-server?type=dev

[snyk-img]: https://snyk.io/test/github/LyneApp/lyne-server.git/badge.svg
[snyk-url]: https://snyk.io/test/github/LyneApp/lyne-server.git
