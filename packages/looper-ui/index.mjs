import makeSimpleUi from './simple-ui.js'; 
import makeExportAndInfoUi from './web-export-info-ui.js'; // ??
import defaultHtmlTemplate from './htmlTemplates/defaultHtmlTemplate.js';
import setupDom from './setup.js'

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

export { setupDom, defaultHtmlTemplate };