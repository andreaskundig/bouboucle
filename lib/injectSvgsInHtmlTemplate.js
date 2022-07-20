if(process.argv.length != 3){
    console.error("the script takes one argument namely the html template to convert (.template file)");
    process.exit(1);
}

// the template file we want to transform
const templateFilePath = process.argv[2];

console.log("loaded file ", templateFilePath);


const { readFileSync, writeFileSync } = require('fs');
const { join, basename } = require('path');

const iconsAssetsfolder = join('packages', 'looper-ui', 'assets');

const htmlTemplatesFolder = join('packages', 'looper-ui', 'htmlTemplates');
// const htmlDefaultTemplatePath = join(htmlTemplatesFolder, 'defaultHtmlTemplate.template');

let htmlTemplate = readFileSync(templateFilePath, {encoding: 'utf-8'});

// extract icon filepath
const iconPathRe = /<img\s+src="(.+)">/g;

let matches = [];
let iconFilePaths = [];
while (matches = iconPathRe.exec(htmlTemplate)) {
    iconFilePaths.push(matches[1]);
}

const svgStrings = iconFilePaths.map(iconFilePath => {
    const path = join(iconsAssetsfolder, iconFilePath);
    const content = readFileSync(path, {encoding: 'utf-8'});
    const svgTagRE = /(<svg)/;
    const match = content.match(svgTagRE);
    if(!match){
        console.error("invalid svg tag regex");
        process.exit(1);
    }
    return content.slice(match.index, content.length);
});


// replace img tags with the raw svg content
const imgTagRe = /(<img\s+src=.+>)/g;
let index = 0;
while (matches = imgTagRe.exec(htmlTemplate)) {
    const stringToReplace = matches[1];
    const svgStr = svgStrings[index]; 
    index += 1;
    htmlTemplate = htmlTemplate.replace(stringToReplace, svgStr);
}


const resultFileName = basename(templateFilePath).replace(".template", ".js");

const resultFilePath = join(htmlTemplatesFolder, resultFileName);

writeFileSync(resultFilePath, htmlTemplate, {encoding: 'utf-8'});

console.log("successfully written", resultFilePath);
console.log("all done");
