const path = require('path');

//entry is entry point to bundle our code
//output is where our bundled app will be placed
// babel packages will help us transform our ECMAScript and JSX files in our React application into browser friendly
//To use these dependencies inside our webpack configuration we’ll need to define a module property inside our webpack exports object. 
//The module property is an array of rules objects that will test a conditional for our files to see if the a webpack loaders should be applied to the output, or modify the webpack parser. 
//Each rule can have a test property that tests if a file should be acted upon by webpack. In our case we’ll want to test JavaScript files and JSX files and use the babel-loader with some configuration options to compile our javascript into browser friendly javascript files.
module.exports = {
    entry: path.resolve(__dirname,'src','index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                "targets": "defaults"
                            }],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                //Module CSS
                test: /\.module\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    {loader: "style-loader"},
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                localIndentName: "[name]__[local]--[hash:base64:5]",
                            }
                        }
                    },
                ]
            },
            {
                test: /\.css|\.scss$/,
                exclude: [
                  path.resolve(__dirname, "node_modules"),
                  /\.module\.(css|scss)$/,
                ],
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                ],
              },
        ]
    }
}
//the test property tests the file extension to see if we should use the babel-loader. 
//We are including all files in our project src folder and just in case there are any node package dependencies in that src folder we’re use the exclude regular expression to exclude any files within a node_modules sub folder. 
//The use is the loader that we want to use on these files and we are going to be using babel-loader which takes some options. 
//Remember, we installed some presets: @babel/preset-env and @babel/preset-react. The @babel/preset-env is used to check compatibility for backward compatibility and polyfills for commonly used browser versions. 
//The targets property targets a browserslist query for compatible browser versions. 
//The "default" option is the save as using the query string '> 0.5%, last 2 versions, Firefox ESR, not dead' . 

/* Browserslist will use browsers and Node.js versions query from one of these sources:

1. .browserslistrc config file in current or parent directories.
2. browserslist key in package.json file in current or parent directories.
3. browserslist config file in current or parent directories.
4. BROWSERSLIST environment variable.
5. If the above methods did not produce a valid result Browserslist will use defaults: > 0.5%, last 2 versions, Firefox ESR, not dead. */