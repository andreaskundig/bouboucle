import { Menu } from '../types';
import { MultiIconContent } from  "./MultiIconContent";
import "./MultiIconContent";
import { StrokeSizeButton } from './StrokeSizeButton';
import {
    stroke1Icon,
    stroke2Icon,
    stroke3Icon,
    stroke4Icon,
    stroke5Icon,
    stroke6Icon,
} from "./svgButtons"

export class StrokeSizeContent extends HTMLElement {
    button?: StrokeSizeButton;
    menu?: Menu;
    // #button?: StrokeSizeButton;
    // set button(button:StrokeSizeButton){
    //     this.#button = button;
    //     this.init();
    // }
    // get button(): StrokeSizeButton|undefined{
    //     return this.#button;
    // }
    
    css = MultiIconContent.css;

    connectedCallback(){
        if(!this.button) {
            return;
        }
        this.innerHTML = `<multi-icon-content></multi-icon-content>`;
        this.addEventListener('selecticon', this.onIconSelected);
        const multiIconContent = this.querySelector('multi-icon-content') as MultiIconContent;
        const initialSelectedIndex = this.button.selectedIndex;
        multiIconContent.initIcons([
            stroke1Icon, 
            stroke2Icon, 
            stroke3Icon,
            stroke4Icon,
            stroke5Icon,
            stroke6Icon,
        ], initialSelectedIndex);
        this.classList.add('looper-menu-button');
    }

    onIconSelected(e:any){
        const {detail: { index }} = e;
        this.button!.selectedIndex = index;
        this.menu?.hideSubmenu();
    }
}

customElements.define("stroke-size-content", StrokeSizeContent);
