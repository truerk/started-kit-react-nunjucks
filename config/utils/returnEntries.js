const glob_entries = require('webpack-glob-folder-entries')

// Генерация папок для вьюшки nunjucks
function returnEntries(globPath){
    let entries = glob_entries(globPath, true);
    let folderList = new Array();
    for (let folder in entries){
       folderList.push(entries[folder]);
    }
    return folderList;
}

module.exports = returnEntries