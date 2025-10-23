import { infoIcon } from "./svgButtons";

class InfoButton extends HTMLElement {
    connectedCallback(){
        this.innerHTML = infoIcon;
        this.classList.add('looper-menu-button');
    }
}

customElements.define("info-button", InfoButton);
