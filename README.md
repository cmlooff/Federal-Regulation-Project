#webpack_temp

- src is where all the code I write is located

- dist is where all my static assets are built to

- When we run npm build webpack will look at our src folder and construct a main.js
  file in the dist folder.

- Loaders -> allows you to load css, sass, images and such to our webpack

- Installing plugin so we can rebuild the whole dist folder instead of just the bundle.js

- Installed webpack-dev-serve and now we have a localhost:8080

- Source map -> Great for debugging -> Creates a map to from our dist to our src
  -> This is added in the webpack.config

- Another Loader -> Babel

  - Babel helps to make the webapp compatible with older browsers
  - npm i -D babel-loader @babel/core @babel/preset-env

- What if we want to add images?

https://www.federalregister.gov/api/v1/
