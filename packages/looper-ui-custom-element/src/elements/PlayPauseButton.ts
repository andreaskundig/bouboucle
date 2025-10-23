import { Looper } from "../types";
import { playIcon, pauseIcon } from "./svgButtons";
import { MultiIconButton } from "./MultiIconButton";

class PlayPauseButton extends HTMLElement {
    looper?: Looper;

    connectedCallback(){
        this.render();
        this.addEventListener('click', this.#clickHandler);
        this.#displayCorrectButton();
    }

    get #isPlaying(){
        return this.looper?.getSpeed() != 0;
    }

    #displayCorrectButton(){
        this.iconButton.showOnlySelected(this.#isPlaying ? 0 : 1);
    }
    
    #clickHandler = () => {
        const speed = this.#isPlaying ? 0 : 1;
        this.looper?.setSpeed(speed);
        this.#displayCorrectButton();
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.#clickHandler);
    }
    
    get iconButton(): MultiIconButton{
        return this.querySelector("multi-icon-button") as MultiIconButton;
    }

    render(){
        this.innerHTML = `
            <multi-icon-button>
                ${pauseIcon}
                ${playIcon}
            </multi-icon-button>
        `;
        this.classList.add('looper-menu-button');
    }
}

customElements.define("play-pause-button", PlayPauseButton);