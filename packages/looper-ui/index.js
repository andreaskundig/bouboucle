import makeSimpleUi from './simple-ui.js'; 
import webMakeExportAndInfoUi from './web-export-info-ui.js'; // ??
import localMakeExportAndInfoUi from './local-export-info-ui.js';

import defaultHtmlTemplate from './htmlTemplates/defaultHtmltemplate.js';
import localHtmlTemplate from './htmlTemplates/localHtmlTemplate.js';
import advancedHtmlTemplate from './htmlTemplates/advancedHtmlTemplate.js';

import simpleCSS from './cssTemplates/simpleCSS.js';
import simpleIpadCSS from './cssTemplates/simple-ipad.js';
import setupDom from './setup.js'
import { injectCSS } from './setup.js'
import * as assDB from "./assetsDB.js";

export const getAssetString = assDB.getAssetString;
export { injectCSS };

/**
 * make ui wrapper function
 * @param {*} UIVariant - ui variant see below
 * @param {*} looper - looper instance
 * @param {boolean} fullSizeGif - ?? you want the big one ??
 * @param {boolean} newTiming - ??
 * @param {{width:number, height:number}} dimension
 * @param {boolean} showGallery
 */
export function makeUI(variant, looper, fullSizeGif, newTiming,
                       dimension, showGallery, makeExportAndInfoUi){
    //TODO pass makeExportAndInfoUi instead of variant
    // requires exporting the exportUIAndInfo methods
    // and importing them in projects stroke-looper
    // and mirabilia
    if (!makeExportAndInfoUi) {
        if(variant == UIVariant.local) {
            makeExportAndInfoUi = localMakeExportAndInfoUi;
        } else {
            makeExportAndInfoUi =
                (menu,looper) =>  webMakeExportAndInfoUi(menu, looper, fullSizeGif);
        }
    }
    makeSimpleUi(looper, makeExportAndInfoUi, newTiming,
                 dimension, showGallery);
}

/**
 * enum to discriminate ui variant
 * @readonly
 * @enum { string }
 */
export const UIVariant = Object.freeze({
    default: "default",
    local: "local",
    advanced: "advanced",
});

/**
 * 
 * @param {("default", "local", "advanced")} uiVariant 
 * @param { HTMLElement } targetDomElement root element of ui
 */
export function setupDomForVariant(uiVariant, targetDomElement = document.body, buttonOrder=undefined){
    // TODO replace variant with args: additionalCss, htmlTemplate
    // requires exporting the css/html templates
    // and importing them in projects stroke-looper
    // and mirabilia
    const cssToInject = [simpleCSS];
    let htmlTemplate;
    if(uiVariant == UIVariant.default){
        htmlTemplate = defaultHtmlTemplate;
    } else if (uiVariant == UIVariant.local){
        htmlTemplate = localHtmlTemplate;
    } else if(uiVariant == UIVariant.advanced){
        cssToInject.push(simpleIpadCSS);
        htmlTemplate = advancedHtmlTemplate;
    } else {
        throw new Error(`unsupported UI variant ${uiVariant}`);
    }
    cssToInject.forEach(injectCSS);
    setupDom(targetDomElement, htmlTemplate, buttonOrder);
}
