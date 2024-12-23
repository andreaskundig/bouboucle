import { colorIcon } from "./svgButtons";


class ColorButton extends HTMLElement {

    constructor() {
        super();
    }
    
    static get observedAttributes() { 
        return ['color']; 
    }

    connectedCallback(){
        this.render(this);
    }
    
    attributeChangedCallback(name:string, _oldValue: any, newValue: any) {
        if(name === 'color'){
            this.style.fill = newValue;
            this.style.stroke = newValue;
        }
    }
    
    render(parent: HTMLElement){
        parent.innerHTML = colorIcon;
    }
}

customElements.define("color-button", ColorButton);
