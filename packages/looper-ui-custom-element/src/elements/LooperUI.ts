import { makeSimpleUi, makeMenu, UIVariant, setupDomForVariant, injectCSS } from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import paper from 'paper/dist/paper-core';
import "./InfoButton.ts";
import "./ExportButton.ts";
import "./ParentComponent.ts";
import "./InfoContent.ts";
import "./ExportContent.ts";
import "./LocalExportContent.ts";
import "./LocalInfoContent.ts";

class LooperUI extends HTMLElement {
    static observedAttributes = ["width", "height"];
    static titleHeight = 79.67; // related to selected html ?

    width = 0;
    height = 0;

    looper: any;
    
    rootDiv = document.createElement('div');

    constructor() {
        super();
    }

    dimensionCalc(width: number, height: number, ratio?: number){
        const targetHeight = height - LooperUI.titleHeight;
        const result:any = {
            width,
            height: targetHeight,
        };

        if(ratio){
            result.ratio = ratio;
        }

        return result;
    }

    async connectedCallback() {

        // 1 choose ui variant and setup dom accordingly
        // TODO take name of variant from attribute
        const variant = UIVariant.default;
        {
            const buttonOrder = [
                "color-button",
                "stroke-button",
                "timing-button",
                "clear-button",
                "undo-button",
                "redo-button",
                "pause-button",
            ];
            const cssList = setupDomForVariant(variant, this.rootDiv, buttonOrder as any);
            cssList.forEach(injectCSS);
        }
        // this.setupDomForVariant(variant, this.rootDiv);
        // 2 setup looper
        const urlParams: any = urlUtils.getUrlParams(location.href);
        const newTiming = 'new-timing' in urlParams || false;
        // const configRatioCode = urlParams.ratio || null;
        const backgroundColor = '#ffffff';
        const showGallery = !!urlParams.gallery;
        // const fullSizeGif = !!urlParams['big-gif'];
        // const foregroundUrl = 'Coloriage_Assiette-polaire.png';
        // const foregroundImage = await loadImage(foregroundUrl);
        // let ratio =  foregroundImage.naturalWidth / foregroundImage.naturalHeight;
        let ratio = 4 / 3;
        // if (configRatioCode) {
        //     ratio = eval(configRatioCode);
        // }

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        const dimension = this.dimensionCalc(this.width, this.height, ratio);

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

        this.looper = makeLooper(looperConfig as any);
        this.looper.setLineColor('#E1BEE7')
        this.looper.start();
        if (urlParams.gist) {
            (io as any).gists.load(urlParams.gist, this.looper.importData);
        }

        const menu = makeMenu(this.rootDiv);
        makeSimpleUi(this.looper, undefined, newTiming, dimension, showGallery,
            this.rootDiv as any, this.rootDiv as any, menu as any);

        const menuElement = this.rootDiv.querySelector(".menu") as HTMLElement;
        const modalsElement = this.rootDiv.querySelector(".modals");

        // let custom elements register properly 
        for(const button of this.querySelectorAll('[data-for]')){
            const modalContentSelector = (button as any).dataset.for;
            menuElement.appendChild(button);
            modalsElement!.insertAdjacentHTML('beforeend', `<div class="submenu" data-for="${modalContentSelector}"></div>`);
            const modalDiv = modalsElement!.querySelector(`[data-for='${modalContentSelector}']`);
            modalsElement!.appendChild(modalDiv!);
            const modalContent = this.querySelector(modalContentSelector);
            if(!modalContent){
                console.error(`unable to find modal '${modalContentSelector}'`);
            } else {
                modalDiv!.appendChild(modalContent);
                menu.initShowSubmenu(modalDiv, button, modalContent.beforeShow);
                modalContent.menu = menu;
                modalContent.looper = this.looper;
                injectCSS(modalContent.css);
            }
        }

        // Append the new div back to the parent
        this.appendChild(this.rootDiv);
    }

    attributeChangedCallback(name:string, _oldValue:string, newValue:string) {
        if(name == 'width'){
            this.width = Number(newValue);
        }else if(name == 'height'){
            this.height = Number(newValue);
        }
        const dimension = this.dimensionCalc(this.width, this.height);
        this.looper.scale(dimension);
    }

    // injectCSS(cssStr: string) {
    //     const sheet = new CSSStyleSheet();
    //     sheet.replaceSync(cssStr); 
    //     this.shadowRoot!.adoptedStyleSheets.push(sheet); 
    // }
}


customElements.define("looper-ui", LooperUI);
