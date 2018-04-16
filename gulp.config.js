module.exports = {

    browserSyncOpts: {
        server: {
            baseDir: './dist'
        }
    },
    source: {
        path: "./app/",
        jsPath: "./app/scripts/",
        vendorCssPath: "./app/css/",
        sassPath: "./app/sass/",
        imagesPath: "./app/images/",
        vendorCssFiles: [
            "./app/css/vendor.css",
        ],
        sassFile: "./app/sass/main.scss",
        vendorScripts: [
            "node_modules/jquery/dist/jquery.min.js"
        ],
        bundleScripts: [
            "app/scripts/aprtslider.js",
            "app/scripts/imagelay.js",
            "app/scripts/main.js"
        ]
    },
    dist: {
        path: "./dist/",
        jsPath: "assets/js",
        cssPath: "assets/css",
        imagesPath: "assets/images",
        vendorCssName: "vendor.min.css",
        vendorJsName: "vendor.min.js",
        bundleCssName: "bundle.min.css",
        bundleJsName: "bundle.min.js"
    }

}