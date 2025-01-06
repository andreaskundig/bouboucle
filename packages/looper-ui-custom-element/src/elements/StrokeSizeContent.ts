import { Menu, Looper } from '../types.ts';
import { MultiIconContent } from  "./MultiIconContent.ts";
import "./MultiIconContent.ts";
import {
    stroke1Icon,
    stroke2Icon,
    stroke3Icon,
    stroke4Icon,
    stroke5Icon,
    stroke6Icon,
} from "./svgButtons"

const CSS = `
`;

export class StrokeSizeContent extends HTMLElement {
    #looper!: Looper;
    menu?: Menu;
    button?: HTMLElement;
    css = CSS;


    connectedCallback(){
        this.render();
        const multiIconContent = this.querySelector('multi-icon-content');
        (multiIconContent as MultiIconContent).icons = [
            stroke1Icon, 
            stroke2Icon, 
            stroke3Icon,
            stroke4Icon,
            stroke5Icon,
            stroke6Icon,
        ];
        // TODO implement logic to set stroke size of looper
        // and correspondence between button stroke index and looper stroke size.
        // (see simple-ui.js)
    }

    get looper(): Looper{
        return this.#looper;
    }

    set looper(looper:Looper){
        this.#looper = looper;
    }

    render() {
        this.innerHTML = `<multi-icon-content></multi-icon-content>`;
    }
}

customElements.define("stroke-size-content", StrokeSizeContent);
