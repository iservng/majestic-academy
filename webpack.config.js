/**
 * Inside this file is where we configure what we want webpack to do
 * Example 
 * What we want it to do is look at our "src/index.js" file, and any import  we have in it as well and then bundle all of that code together, into a single bundled file.
 * 
 * Implementation
 * To do this we need to export an object. This object represents our webpack configuration.
 */
const path  = require('path')
module.exports = {

    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: "bundle.js"
    },
    watch: true
};