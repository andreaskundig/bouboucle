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
    if (!makeExportAndInfoUi) {
        makeExportAndInfoUi = variant == UIVariant.local ? localMakeExportAndInfoUi : webMakeExportAndInfoUi;
    }
    makeSimpleUi(looper, fullSizeGif, makeExportAndInfoUi, newTiming,
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


