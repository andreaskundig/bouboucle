import { makeSimpleUi, UIVariant, ExportInfoUIMaker, injectCSS, UIVariantCode} from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import paper from 'paper/dist/paper-core';
import simpleCSS from '@andreaskundig/looper-ui/cssTemplates/simpleCSS';
import setupDom from '@andreaskundig/looper-ui/setup';

const makeExportAndInfoUi = ExportInfoUIMaker.web;

class LooperUI extends HTMLElement {
    rootDiv = document.createElement('div');

    constructor() {
        super();
        console.log("hello world");
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        console.log("connected callback");
        this.shadowRoot?.appendChild(this.rootDiv);

        // 1 choose ui variant and setup dom accordingly
        // TODO take name of variant from attritube
        const variant = UIVariant.default;
        this.setupDomForVariant(variant, this.rootDiv);
        // 2 setup looper
        const urlParams: any = urlUtils.getUrlParams(location.href);
        const newTiming = 'new-timing' in urlParams || false;
        // const configRatioCode = urlParams.ratio || null;
        const backgroundColor = '#ffffff';
        const showGallery = !!urlParams.gallery;
        const titleHeight = 79.67; // related to selected html ?
        // const fullSizeGif = !!urlParams['big-gif'];
        // const foregroundUrl = 'Coloriage_Assiette-polaire.png';
        // const foregroundImage = await loadImage(foregroundUrl);
        // let ratio =  foregroundImage.naturalWidth / foregroundImage.naturalHeight;
        let ratio = 4 / 3;
        // if (configRatioCode) {
        //     ratio = eval(configRatioCode);
        // }
        const calculateDimension = () => {
            const targetHeight = window.innerHeight - titleHeight;
            return {
                width: window.innerWidth,
                height: targetHeight,
                ratio
            };
        }
        const dimension = calculateDimension();

        // const canvas = document.createElement('canvas');
        const canvas = this.rootDiv.querySelector('#main-canvas');
        /// this.rootDiv.appendChild(canvas!);

        const graphics = {
            canvas: canvas,
            paper: paper,
        };

        const looperConfig = Object.assign({
            graphics: graphics,
            backgroundColor: backgroundColor,
        }, dimension);

        const looper = makeLooper(looperConfig as any);
        looper.setLineColor('#E1BEE7')
        looper.start();
        if (urlParams.gist) {
            (io as any).gists.load(urlParams.gist, looper.importData);
        }

        // TODO uncomment this
        // makeSimpleUi(looper, makeExportAndInfoUi, newTiming, dimension, showGallery,
        //     this.rootDiv as any, this.rootDiv as any);
        //TODO remove this to use makeExport...
        makeSimpleUi(looper, undefined, newTiming, dimension, showGallery, 
            this.rootDiv as any, this.rootDiv as any);

        // TODO: component should not be responsible for handling resize events
        // window.addEventListener('resize', () => {
        //     const targetHeight = window.innerHeight - titleHeight;
        //     const dim = { width: window.innerWidth, height: targetHeight }
        //     looper.scale(dim);
        // });
    }

    /**
     * 
     * @param {("default", "local", "advanced")} uiVariant 
     * @param { HTMLElement } targetDomElement root element of ui
     */
    setupDomForVariant(uiVariant: any,
        targetDomElement: HTMLElement,
        buttonOrder = undefined) {
        if (!(uiVariant in UIVariantCode)) {
            throw new Error(`unsupported UI variant ${uiVariant}`)
        }
        const { css, html } = (UIVariantCode as any)[uiVariant];
        this.setupDomAndCss(html, css, targetDomElement, buttonOrder);
    }

    setupDomAndCss(htmlTemplate: (bo: any) => string,
        additionalCSS: string,
        targetDomElement = document.body,
        buttonOrder = undefined) {
        const cssToInject = additionalCSS ? [simpleCSS] : [simpleCSS, additionalCSS];
        for(const cssStr of cssToInject){
            this.injectCSS(cssStr);
        }
        this.setupDom(targetDomElement, htmlTemplate, buttonOrder);
    }

    /**
     * 
     * @param {HTMLElement} targetElement target dom element for ui instance (defaults to document.body)
     * @param htmlTemplate function producing the ui 
     */
    setupDom(targetElement = document.body, htmlTemplate: (bo: any) => string, buttonOrder = undefined) {
        targetElement.innerHTML += htmlTemplate(buttonOrder);
    }

    injectCSS(cssStr: string) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssStr); 
        this.shadowRoot!.adoptedStyleSheets.push(sheet); 
    }
}


customElements.define("looper-ui", LooperUI);
