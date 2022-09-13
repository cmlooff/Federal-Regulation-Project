start: cross-env NODE_ENV=production node server/server.js

Build: cross-env NODE_ENV= production webpack

dev: concurrently \"NODE_ENV=development nodemon server/server.js\" \"NODE_ENV=development webpack serve --hot --open\""