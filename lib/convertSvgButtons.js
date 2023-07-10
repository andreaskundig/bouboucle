// if(process.argv.length != 3){
//     console.error("the script takes one argument namely the html template to convert (.template file)");
//     process.exit(1);
// }

const buttonIconMap = {
    "color": "1_couleur+2_taille_5.svg",
    "clear": "4_erase.svg",
    "export": "8_done.svg",
    "export-cancel": "4_erase.svg",
    "forward": "11_fast_forward.svg",
    "gallery": "15_gallery.svg",
    "info": "9_informations.svg",
    "pause": "6_pause.svg",
    "redo": "5_redo.svg",
    "rewind": "11_rewind.svg",
    "stroke": "2_taille_3.svg",
    "timing": "3_trait_1.svg",
    "undo": "7_undo.svg"
}
// the template file we want to transform
// const templateFilePath = process.argv[2];

// console.log("loaded file ", templateFilePath);


const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const iconsAssetsfolder = join('packages', 'looper-ui', 'assets', 'icons');

const htmlTemplatesFolder = join('packages', 'looper-ui', 'htmlTemplates');

let result = "export const buttonMap = {\n";



for (const [buttonName, iconFileName] of Object.entries(buttonIconMap)) {
    const path = join(iconsAssetsfolder, iconFileName);
    const rawContent = readFileSync(path, {encoding: 'utf-8'});
    const svgTagRE = /(<svg)/;
    const match = rawContent.match(svgTagRE);
    if(!match){
        console.error("invalid svg tag regex");
        process.exit(1);
    }
    // remove doctype and metas from svg which we don't need
    const cleanContent = rawContent.slice(match.index, rawContent.length);

    result += `"${buttonName}-button": \`<div id="${buttonName}-button" >${cleanContent}</div>\`,\n`;
}

result += "};";


const resultFilePath = join(htmlTemplatesFolder, "buttons.js");

writeFileSync(resultFilePath, result, {encoding: 'utf-8'});

console.log("successfully written", resultFilePath);
console.log("all done");
