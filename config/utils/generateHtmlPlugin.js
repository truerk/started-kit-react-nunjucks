const fs                 = require("fs");
const glob_entries       = require('webpack-glob-folder-entries');
const HtmlWebpackPlugin  = require("html-webpack-plugin");

// Генерация nunjucks pages в html
function generateHtmlPlugin(templatesGlob, pathPages) {
    let entries = glob_entries(templatesGlob, true);
    let pagesList = new Array();
    for (let pages in entries){
        pagesList.push(pages);
    }

    // Удаляем templates, pages
    pagesList.splice(0, 2)

    return pagesList.map(page => {
        let parts;
        let name;
        let extension;
        let chunks = []

        chunks.push(page)

        if (fs.existsSync(`${pathPages}/${page}/${page}.njk`)) {
            parts = `${page}.njk`.split(".");
            name = parts[0];
            extension = parts[1];
        } else if (fs.existsSync(`${pathPages}/${page}/index.njk`)) {
            parts = 'index.njk'.split(".");
            name = parts[0];
            extension = parts[1];
        }

        return new HtmlWebpackPlugin({
            // title: page,
            template: `${pathPages}/${page}/${name}.${extension}`,
            filename: `./${page}.html`,
            inject: true,
            minify: true,
            // hash: false,
            chunks: chunks,
        });

    });
}

module.exports = generateHtmlPlugin