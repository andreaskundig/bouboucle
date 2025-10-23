import { Looper } from '../types';
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
        this.classList.add('looper-menu-button');
    }
}

customElements.define("stroke-size-button", StrokeSizeButton);
