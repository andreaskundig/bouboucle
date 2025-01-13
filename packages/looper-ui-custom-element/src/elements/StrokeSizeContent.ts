import { Menu } from '../types.ts';
import { MultiIconContent } from  "./MultiIconContent.ts";
import "./MultiIconContent.ts";
import { StrokeSizeButton } from './StrokeSizeButton.ts';
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
    
    css?: string;


    connectedCallback(){
        this.render();
        const multiIconContent = this.querySelector('multi-icon-content') as MultiIconContent;

        //TODO this button is undefined !
        const initialSelectedIndex = this.button?.selectedIndex;
        this.css = multiIconContent!.css;
        (multiIconContent as MultiIconContent).initIcons([
            stroke1Icon, 
            stroke2Icon, 
            stroke3Icon,
            stroke4Icon,
            stroke5Icon,
            stroke6Icon,
        ], initialSelectedIndex);
    }

    onIconSelected(e:any){
        const {detail: { index }} = e;
        this.button!.selectedIndex = index;
        this.menu?.hideSubmenu();
    }

    render() {
        this.innerHTML = `<multi-icon-content></multi-icon-content>`;
        this.addEventListener('selecticon', this.onIconSelected);
    }
}

customElements.define("stroke-size-content", StrokeSizeContent);
