import { infoIcon } from "./svgButtons";

class InfoButton extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(){
        this.render(this);
    }
   
    render(parent: HTMLElement){
        parent.innerHTML = infoIcon;
    }
}

customElements.define("info-button", InfoButton);
