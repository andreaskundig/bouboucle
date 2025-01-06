import "./MultiIconButton";
import "./StrokeSizeContent";
import {
    stroke1Icon,
    stroke2Icon,
    stroke3Icon,
    stroke4Icon,
    stroke5Icon,
    stroke6Icon,
} from "./svgButtons"

export class StrokeSizeButton extends HTMLElement {
    
    static get observedAttributes() { 
        return ['stroke-index']; 
    }

    connectedCallback(){
        this.render();
    }

    get iconButton(){
        return this.querySelector("multi-icon-button");
    }
    
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
