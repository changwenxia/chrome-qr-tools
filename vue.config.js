const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const copyFile = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`,
    },
    {
        from: path.resolve("src/assets"),
        to: path.resolve("dist/assets"),
    },
    {
        from: path.resolve("src/plugins/inject.js"),
        to: path.resolve("dist/js"),
    },
];

const pages = {};

// 配置 popup.html 页面
const chromeName = ["popup", "qrCode"];
chromeName.forEach((name) => {
    pages[name] = {
        entry: `src/${name}/main.js`,
        template: `src/${name}/index.html`,
        filename: `${name}.html`,
    };
});

module.exports = {
    pages,
    productionSourceMap: false,
    // 配置 content.js background.js
    configureWebpack: {
        entry: {
            background: "./src/background/main.js",
        },
        output: {
            filename: "js/[name].js",
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: copyFile,
            }),
        ],
    },
    // 配置 content.css
    css: {
        extract: {
            filename: "css/[name].css",
        },
    },
    // 增加chainWebpack配置
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.filename('js/[name].js').end();
            config.output.chunkFilename('js/[name].js').end();
        }
    }
};
