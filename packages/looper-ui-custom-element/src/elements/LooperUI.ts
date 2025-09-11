import { makeSimpleUi, makeMenu, UIVariant, setupDomForVariant, injectCSS } from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import { Menu } from '../types';
import paper from 'paper/dist/paper-core';
import "./ColorButton";
import "./InfoButton";
import "./ExportButton";
import "./ColorContent";
import "./InfoContent";
import "./ExportContent";
import "./LocalExportContent";
import "./LocalInfoContent";
import "./StrokeSizeButton";
import "./TimingButton";
import "./TimingDynamicContent";
import "./TimingMultiButton";
import "./TimingSimpleContent";
import "./ClearButton";
import "./UndoButton";
import "./RedoButton";
import "./PlayPauseButton";
import "./SpeedButtons";
import { TITLE_HEIGHT } from './Constants';
import { Looper } from '../types';

export { type Looper, type Menu } from "../types";
export {type ClearButton } from "./ClearButton"
export { injectCSS } from "@andreaskundig/looper-ui";
export { VideoCarousel } from "./VideoCarousel";

const rootDivCss = `
    .root {
        position: relative;
    }
`;

export class LooperUI extends HTMLElement {
    static observedAttributes = ["width", "height"];

    width = 0;
    height = 0;

    looper?: Looper;
    
    rootDiv = document.createElement('div');

    constructor() {
        super();
    }

    dimensionCalc(width: number, height: number, ratio?: number){
        const targetHeight = height - TITLE_HEIGHT;
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
        this.rootDiv.classList.add("root");

        // 1 choose ui variant and setup dom accordingly
        // TODO take name of variant from attribute
        const variant = UIVariant.default;
        {
            const buttonOrder:any = [];
            const cssList = setupDomForVariant(variant, this.rootDiv, buttonOrder as any);
            cssList.push(rootDivCss);
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
        this.looper?.setLineColor('#E1BEE7')
        this.looper?.start();
        if (urlParams.gist) {
            (io as any).gists.load(urlParams.gist, this.looper?.importData);
        }

        const menu = makeMenu(this.rootDiv) as Menu;
        makeSimpleUi(this.looper, undefined, newTiming, dimension, showGallery,
            this.rootDiv as any, this.rootDiv as any, menu as any);

        const menuElement = this.rootDiv.querySelector(".menu") as HTMLElement;

        // let custom elements register properly 
        const buttons = [...this.querySelectorAll('.buttons > *')] as any[];
        await Promise.all(buttons.map(b => customElements.whenDefined(b.localName)));
        // b.tagName returns the upper case tag name.
        for(const button of buttons){
            menuElement.appendChild(button);
            button.looper = this.looper;
            injectCSS(button.css);
            await this.initializeModalContent(button, menu);
        }

        // Append the new div back to the parent
        this.appendChild(this.rootDiv);


        // TODO create a sibling div to canvas-parent 
        // give it css that makes it fill the desired height
        // (client like cdn.html can decide if its the viewport or half the viewport)
        // observe it's size with the resize observer.
        const resizeObserver = new ResizeObserver((entries) => {
            for(const entry of entries){
                const rect = entry.target.getBoundingClientRect()
                const dimension = this.dimensionCalc(rect.width, rect.height);
                console.log('obs',rect.width, rect.height, dimension);

                this.looper?.scale(dimension);
            }
        });
        resizeObserver.observe(this.rootDiv);
    }

    async initializeModalContent(button: Element, menu: Menu){
        const modalContentSelector = (button as any).dataset.for;
        if(!modalContentSelector){
            return;
        }
        const modalsElement = this.rootDiv.querySelector(".modals");
        modalsElement!.insertAdjacentHTML('beforeend', `<div class="submenu" data-for="${modalContentSelector}"></div>`);
        const modalDiv = modalsElement!.querySelector(`[data-for='${modalContentSelector}']`);
        modalsElement!.appendChild(modalDiv!);
        const modalContent = this.querySelector(modalContentSelector);
        if(!modalContent){
            console.error(`unable to find modal '${modalContentSelector}'`);
        } else {
            modalDiv!.appendChild(modalContent);
            await customElements.whenDefined(modalContent!.localName);
            menu.initShowSubmenu(modalDiv!, button, modalContent.beforeShow);
            modalContent.menu = menu;
            modalContent.button = button;
            modalContent.looper = this.looper;
            injectCSS(modalContent.css);
        }
    }

    attributeChangedCallback(name:string, _oldValue:string, newValue:string) {
        if(name == 'width'){
            this.width = Number(newValue);
        }else if(name == 'height'){
            this.height = Number(newValue);
        }
        const dimension = this.dimensionCalc(this.width, this.height);
        console.log(this.width, dimension);
//        this.looper?.scale(dimension);
    }

    // injectCSS(cssStr: string) {
    //     const sheet = new CSSStyleSheet();
    //     sheet.replaceSync(cssStr); 
    //     this.shadowRoot!.adoptedStyleSheets.push(sheet); 
    // }
}


customElements.define("looper-ui", LooperUI);
