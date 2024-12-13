import { infoIcon } from "./svgButtons";

class InfoButton extends HTMLElement {

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
        parent.innerHTML = infoIcon;
    }
}

customElements.define("info-button", InfoButton);
