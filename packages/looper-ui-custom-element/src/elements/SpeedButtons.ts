import { playIcon, pauseIcon, forwardIcon, rewindIcon } from "./svgButtons";
import { Looper } from "../types";

const CSS = `
speed-buttons.speed-buttons {
    flex: 3;
    display: flex;
}
`;
class SpeedButtons extends HTMLElement {

    css = CSS;
    #speed = 1;
    #looper!: Looper;

    get looper(): Looper{
        return this.#looper;
    }

    set looper(looper:Looper){
        this.#looper = looper;
        this.#speed = looper.getSpeed();
    }

    connectedCallback(){
        this.render();
        this.slowDownButton?.addEventListener("click", this.#onSlowDown);
        this.playPauseButton?.addEventListener("click", this.#onPlayPause);
        this.speedUpButton?.addEventListener("click", this.#onSpeedUp);
    }

    disconnectedCallback(){
        this.slowDownButton?.removeEventListener("click", this.#onSlowDown);
        this.playPauseButton?.removeEventListener("click", this.#onPlayPause);
        this.speedUpButton?.removeEventListener("click", this.#onSpeedUp);
    }

    #onSlowDown = () => {
        console.log('slow',this);
    }
    
    #onPlayPause = () => {
        console.log('pause',this);
    };
    
    #onSpeedUp = () => {
        console.log('speed', this);
    };

    get slowDownButton(){
        return this.firstElementChild;
    }
    get playPauseButton(){
        return this.children[1];
    }
    get speedUpButton(){
        return this.lastElementChild;
    }

    render(){
        this.innerHTML = `
            ${rewindIcon}
            ${playIcon}
            ${forwardIcon}
        `;
        this.classList.add("speed-buttons"); 
    }

    determineActiveButton(speed:number){
        if(speed === 0 || speed === 1){
            return null;
        }else if(speed > 1){
            return this.speedUpButton;
        }else{
            return this.slowDownButton;
        }
    }
    
    set speed(speed:number){
        this.#speed = speed;
        this.looper.setSpeed(speed);
        const activeButton = this.determineActiveButton(speed);
        const playPauseIcon = speed ? pauseIcon : playIcon;
        const ppButton = document.createRange().createContextualFragment(playPauseIcon);
        this.replaceChild(this.playPauseButton, ppButton);
        for(const button of this.children){
            if (button === activeButton) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    }

}

customElements.define("speed-buttons", SpeedButtons);