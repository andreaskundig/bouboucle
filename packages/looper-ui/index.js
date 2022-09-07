import makeSimpleUi from './simple-ui.js'; 
import makeExportAndInfoUi from './web-export-info-ui.js'; // ??

import defaultHtmlTemplate from './htmlTemplates/defaultHtmltemplate.js';
import localHtmlTemplate from './htmlTemplates/localHtmlTemplate.js';
import advancedHtmlTemplate from './htmlTemplates/advancedHtmlTemplate.js';

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
export function makeUI(looper, fullSizeGif, newTiming, dimension){
    makeSimpleUi(looper, fullSizeGif, makeExportAndInfoUi, newTiming, dimension);
}

/**
 * enum to discriminate ui variant
 * @readonly
 * @enum { number }
 */
export const UIVariant = Object.freeze({
    default: 0,
    local: 1,
    advanced: 2,
});

/**
 * 
 * @param {(0, 1, 2)} uiVariant 
 * @param { HTMLElement } targetDomElement root element of ui
 */
export function setupDomForVariant(uiVariant, targetDomElement = document.body){
    injectCSS(simpleCSS);
    if(uiVariant == UIVariant.default){
        // 1 setup dom
        setupDom(targetDomElement, defaultHtmlTemplate);
        return;
    }
    
    if(uiVariant == UIVariant.local){
        // 1 setup dom
        setupDom(targetDomElement, localHtmlTemplate);
        return;
    }

    if(uiVariant == UIVariant.advanced){
        injectCSS(simpleIpadCSS);
        // 1 setup dom
        setupDom(targetDomElement, advancedHtmlTemplate);
        return;
    }

    throw new Error(`unsupported UI variant ${uiVariant}`);
}


