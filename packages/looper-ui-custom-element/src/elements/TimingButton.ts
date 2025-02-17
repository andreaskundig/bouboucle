import { timing1Icon } from "./svgButtons";

class TimingButton extends HTMLElement {
    connectedCallback(){
        this.innerHTML = timing1Icon;
    }
}

customElements.define("timing-button", TimingButton);
