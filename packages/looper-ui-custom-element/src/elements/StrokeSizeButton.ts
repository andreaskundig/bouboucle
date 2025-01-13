import { Looper } from '../types.ts';
import "./MultiIconButton";
import { MultiIconButton } from "./MultiIconButton";
import "./StrokeSizeContent";
import {
    stroke1Icon,
    stroke2Icon,
    stroke3Icon,
    stroke4Icon,
    stroke5Icon,
    stroke6Icon,
} from "./svgButtons"


const strokeWidths = [2, 7, 20, 50, 200, 600];

export class StrokeSizeButton extends HTMLElement {
    #looper!: Looper;

    get looper(): Looper{
        return this.#looper;
    }

    set looper(looper:Looper){
        this.#looper = looper;
    }

    static get observedAttributes() { 
        return ['stroke-index']; 
    }

    connectedCallback(){
        this.render();
    }

    get iconButton(): MultiIconButton{
        return this.querySelector("multi-icon-button") as MultiIconButton;
    }

    get selectedIndex():number{
        const selectedWidth = this.looper.getStrokeWidth();
        const selectedIndex = strokeWidths.indexOf(selectedWidth);
        return selectedIndex;
    }

    set selectedIndex(index:number){
        this.iconButton.showOnlySelected(index);
        const strokeWidth = strokeWidths[index];
        this.looper.setStrokeWidth(strokeWidth);
        //TODO set class selected
    }
    
    //TODO remove this
    attributeChangedCallback(name:string, _oldValue: any, newValue: any) {
        if(name === "stroke-index"){
            this.iconButton?.setAttribute("selected", newValue);
        }
    }
    
    render(){
        this.innerHTML = `
            <multi-icon-button>
                ${stroke1Icon}
                ${stroke2Icon}
                ${stroke3Icon}
                ${stroke4Icon}
                ${stroke5Icon}
                ${stroke6Icon}
            </multi-icon-button>
        `;
    }
}

customElements.define("stroke-size-button", StrokeSizeButton);
