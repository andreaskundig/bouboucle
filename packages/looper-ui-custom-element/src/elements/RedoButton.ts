import { Looper } from "../types";
import { redoIcon } from "./svgButtons";
import { actions } from '@andreaskundig/looper';

class RedoButton extends HTMLElement {
    looper?: Looper;

    connectedCallback(){
        this.innerHTML = redoIcon;
        this.addEventListener('click', this.#clickHandler);
    }
    
    disconnectedCallback(){
        this.removeEventListener('click', this.#clickHandler);
    }
    
    #clickHandler = () => {
        actions.redo();
    }
}

customElements.define("redo-button", RedoButton);