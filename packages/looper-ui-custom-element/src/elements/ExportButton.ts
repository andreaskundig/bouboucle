import { doneIcon } from "./svgButtons";

class ExportButton extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(){
        this.render(this);
        this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick);
    }

    handleClick(){
      const event = new CustomEvent('buttonclick', {
        detail: {id: 42},
      });
      this.dispatchEvent(event);
    }
    
    render(parent: HTMLElement){
        parent.innerHTML = doneIcon;
    }
}

customElements.define("export-button", ExportButton);
