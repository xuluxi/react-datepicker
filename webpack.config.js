module.exports = {
    entry : "./src/DatePicker.jsx",
    output : {
        path : __dirname,
        filename : "index.js"
    },
    module : {
        loaders : [
            { test : /\.css/, loader : "style!css" },
            { test : /\.jsx/, loader : "jsx" }
        ]
    }
}
