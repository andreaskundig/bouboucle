
const { readFileSync, readdirSync, writeFileSync, fstat } = require('fs');
const { join, basename, extname } = require('path');

const iconsAssetsfolder = join('packages', 'looper-ui', 'assets', 'icons');

const iconsDirContent = readdirSync(iconsAssetsfolder);

let result = {};

for(const filename of iconsDirContent){
    if(extname(filename) == '.svg'){
        const filepath = join(iconsAssetsfolder, filename);
        const content = readFileSync(filepath, {encoding:'utf-8'});
        
        const encoded = `data:image/svg+xml;base64,${Buffer.from(content).toString('base64')}`

        result[filename] = encoded;
    }
}

let assetsDBTemplate = `
    const map = ${JSON.stringify(result)};
    export function getAssetString(filename){
        return map[filename];
    }
`;


const jsResultFolder = join('packages', 'looper-ui');
const resultFilepath = join(jsResultFolder, "assetsDB.js");
writeFileSync(resultFilepath, assetsDBTemplate, { encoding: 'utf8' });
console.log(`result file ${resultFilepath} written`);


