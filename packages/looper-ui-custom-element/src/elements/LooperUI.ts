import { makeSimpleUi, makeMenu, injectCSS, setupDom, UIVariantCode } from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import  simpleCSS from '../simpleCSS';
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

const looperUiCss = `
  looper-ui {
    display: block;
    width: 100%;
    height: 100%;
    .root {
        position: relative;
        width: 100%;
        height: 100%;
    }
}
`;

export class LooperUI extends HTMLElement {
    static observedAttributes = ["foreground-url", "ratio"];
    foregroundUrl?: string;
    ratio?: number;
    looper?: Looper; 
    rootDiv = document.createElement('div');

    constructor() {
        super();
    }

    dimensionCalc(width: number, height: number, ratio?: number){
        const result:any = { width, height };
        if(ratio){
            result.ratio = ratio;
        }
        return result;
    }

    async connectedCallback() {
        this.rootDiv.classList.add("root");

        // 1 choose ui variant and setup dom accordingly
        // TODO take name of variant from attribute,
        // or get rid of it entirely, that probably would work
        const variant:UIVariant = "default";
        {
            const buttonOrder:any = [];
            const cssList = setupDomForVariant(variant, this.rootDiv, buttonOrder as any);
            cssList.push(looperUiCss);
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
        
        const rect = this.getBoundingClientRect();
        const dimension = this.dimensionCalc(rect.width, 
                          rect.height - TITLE_HEIGHT, this.ratio);

        const canvas = this.rootDiv.querySelector('#main-canvas');

        const graphics = {
            canvas: canvas,
            paper: paper,
        };

        const looperConfig = {...dimension, graphics, backgroundColor, 
            foregroundUrl: this.foregroundUrl };

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
        this.querySelector('.buttons')?.remove();

        // Append the new div back to the parent
        this.appendChild(this.rootDiv);

        const resizeObserver = new ResizeObserver((entries) => {
            for(const entry of entries){
//                const rect = entry.target.getBoundingClientRect()
                const canvasParent =  entry.target.querySelector('#canvas-parent');
                const rect = canvasParent!.getBoundingClientRect();
                const dimension = this.dimensionCalc(rect.width, rect.height);
                this.looper?.scale(dimension);
            }
        });
        resizeObserver.observe(this);
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
        if(name == 'foreground-url'){
            this.foregroundUrl = newValue;
        }
        if(name == 'ratio'){
            this.ratio = eval(newValue);
        }
    }
}

type UIVariant = "default" | "local" | "advanced";

export function setupDomForVariant(uiVariant: UIVariant,
                                   targetDomElement=document.body,
                                   buttonOrder=undefined): [string] | [string, string]
{
    if(!(uiVariant in UIVariantCode)){
        throw new Error(`unsupported UI variant ${uiVariant}`)
    }
    const { css, html } = UIVariantCode[uiVariant];
    setupDom(targetDomElement, html, buttonOrder);
    return css ? [simpleCSS, css ] : [simpleCSS] ;
}



customElements.define("looper-ui", LooperUI);
