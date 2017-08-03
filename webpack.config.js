const path = require("path"); //** lets define to absolute path

module.exports = {
  //* the entry file for the bundle
  entry: path.join(__dirname, "/client/src/App.js"),

  //* the bundle file we will get in the result
  output: {
    path: path.join(__dirname, "/client/dist/js"),
    filename: "app.js"
  },

  module: {
    //* apply loaders to files that meet given conditions
    //* were using babel-loader with presets for react and es2015
    loaders: [
      {
        test: /\.js?$/,
        include: path.join(__dirname, "/client/src"),
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  devtool: "source-map", //*Lets get a better error handling - we can see all orrors in the termianl
  //* start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
