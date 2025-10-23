import { Looper } from "../types";
import { undoIcon } from "./svgButtons";
import { actions } from '@andreaskundig/looper';

class UndoButton extends HTMLElement {
    looper?: Looper;

    connectedCallback(){
        this.innerHTML = undoIcon;
        this.addEventListener('click', this.#clickHandler);
        this.classList.add('looper-menu-button');
    }
    
    disconnectedCallback(){
        this.removeEventListener('click', this.#clickHandler);
    }
    
    #clickHandler = () => {
        actions.undo();
    }
}

customElements.define("undo-button", UndoButton);
