import { doneIcon } from "./svgButtons";

class ExportButton extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(){
        this.render(this);
    }
   
    render(parent: HTMLElement){
        parent.innerHTML = doneIcon;
        this.classList.add('looper-menu-button');
    }
}

customElements.define("export-button", ExportButton);
