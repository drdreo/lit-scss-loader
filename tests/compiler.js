// From https://webpack.js.org/contribute/writing-a-loader/#testing
const path = require("path");
const webpack = require("webpack");
const MemoryFileSystem = require("memory-fs");
const fs = new MemoryFileSystem();


export default (fixture, options = {}) => {
    const compiler = webpack({
                                 context: __dirname,
                                 entry: `./${fixture}`,
                                 output: {
                                     path: path.resolve(__dirname),
                                     filename: "bundle.js"
                                 },
                                 module: {
                                     rules: [{
                                         test: /\.(s?)(c|a)ss$/,
                                         use: [
                                             {
                                                 loader: path.resolve(__dirname, "../index.js"),
                                                 // Uses the same options as the parameters
                                                 options
                                             }
                                         ]
                                     }]
                                 }
                             });

    compiler.outputFileSystem = fs;

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(stats.toJson().errors);

            const info = stats.toJson({source: true});
            let output;
            if (info.modules[0].modules) {
                output = "\`" + info.modules[0].modules[0].source.trim().replace(/\`/g, "\\`") + "\`";
            } else {
                output = "\`" + info.modules[0].source.trim().replace(/\`/g, "\\`") + "\`";
            }
            resolve(output);
        });
    });
};
