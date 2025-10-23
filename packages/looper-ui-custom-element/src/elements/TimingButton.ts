import { timing1Icon } from "./svgButtons";

class TimingButton extends HTMLElement {
    connectedCallback(){
        this.innerHTML = timing1Icon;
        this.classList.add('looper-menu-button');
    }
}

customElements.define("timing-button", TimingButton);
