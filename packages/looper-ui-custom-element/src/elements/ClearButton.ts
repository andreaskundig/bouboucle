import { Looper } from "../types";
import { eraseIcon } from "./svgButtons";

class ClearButton extends HTMLElement {
    looper?: Looper;

    connectedCallback(){
        this.innerHTML = eraseIcon;
        this.addEventListener('click', this.#clickHandler);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.#clickHandler);
    }
    
    #clickHandler = () => {
        this.looper?.clear();
    }
}

customElements.define("clear-button", ClearButton);
