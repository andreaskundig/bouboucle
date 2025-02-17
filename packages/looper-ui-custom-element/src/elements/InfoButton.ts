import { infoIcon } from "./svgButtons";

class InfoButton extends HTMLElement {
    connectedCallback(){
        this.innerHTML = infoIcon;
    }
}

customElements.define("info-button", InfoButton);
