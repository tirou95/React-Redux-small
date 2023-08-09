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
    devServer: {
        // contentBase: path.resolve(__dirname, 'dist'),
        // open: true,
        // clientLogLevel: 'silent',
        // port: 9000,

        historyApiFallback: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        client: {
          webSocketURL: {
            hostname: "localhost",
          },
        },
        // port: "8089",
        https: true,
        allowedHosts: "all",

        // contentBase
        static : {
            directory : path.join(__dirname, "dist")
        },
        port: 9000,
        
        // publicPath
        // devMiddleware:{
        //     publicPath: "https://localhost:9000/dist/",
        // },

        // hotOnly
        // hot: "only",
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


/* The webpack-dev-server package is a development dependency that can streamline the development process for our React app. 
Remember, every time we make a change to our React application we need to recompile our bundle.js file. Fortunately, the webpack-dev-server can do this for us by watching for file changes. 
It can also server our index.html file in our dist directory as a web server instead of from a file:// resource that we’ve been loading it with. 
This is critical in cross origin requests (CORs) and loading resources/assets for our application.

Our devServer property will take a couple of options. 
First, the contentBase is the path to our output directory dist where our index.html and bundle.js file are found.This is going to be the base where our devServer serves the files. By default, any index.html file will be served as is the case with any other web server. 
The open property tells the devServer to open a browser window for the application. 
The clientLogLevel is set to silent so all server requests and long pull requests will not be logged to the console.
We can start the devServer by setting up a node startup script in our package.json file: "develop":"webpack-dev-server"/"start".
*/