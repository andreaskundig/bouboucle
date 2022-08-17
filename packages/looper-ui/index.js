import makeSimpleUi from './simple-ui.js'; 
import makeExportAndInfoUi from './web-export-info-ui.js'; // ??

import localHtmlTemplate from './htmlTemplates/localHtmlTemplate.js';
import advancedHtmlTemplateStr from './htmlTemplates/advancedHtmlTemplate.template';

import simpleCSS from './cssTemplates/simpleCSS.js';
import simpleIpadCSS from './cssTemplates/simple-ipad.js';
import setupDom from './setup.js'
import { injectCSS } from './setup.js'

/**
 * make ui wrapper function
 * @param {*} looper - looper instance
 * @param {boolean} fullSizeGif - ?? you want the big one ??
 * @param {boolean} newTiming - ??
 * @param {{width:number, height:number}} dimension 
 */
export default function makeUI(looper, fullSizeGif, newTiming, dimension){
    makeSimpleUi(looper, fullSizeGif, makeExportAndInfoUi, newTiming, dimension);
}

/**
 * enum to discriminate ui variant
 * @readonly
 * @enum { number }
 */
const UIVariant = Object.freeze({
    default: 0,
    local: 1,
    advanced: 2,
});

export { 
    setupDom, 
    advancedHtmlTemplateStr,
    localHtmlTemplate, 
    
    injectCSS,
    simpleCSS, 
    simpleIpadCSS,
};

