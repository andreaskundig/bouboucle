const { readFileSync } = require('fs');
const { join } = require('path');

const iconsAssetsfolder = join('packages', 'looper-ui', 'assets', 'icons');

const htmlTemplatesFolder = join('packages', 'looper-ui', 'htmlTemplates');
const htmlDefaultTemplatePath = join(htmlTemplatesFolder, 'defaultHtmlTemplate.js');

const htmlTemplate = readFileSync(htmlDefaultTemplatePath, {encoding: 'utf-8'});

