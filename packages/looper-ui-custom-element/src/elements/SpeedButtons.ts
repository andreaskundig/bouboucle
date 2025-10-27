import { playIcon, pauseIcon, forwardIcon, rewindIcon } from "./svgButtons";
import { Looper } from "../types";
import { MultiIconButton, CSS as mibCSS } from "./MultiIconButton";

const CSS = `
speed-buttons.speed-buttons {
    flex: 3;
    display: flex;
    * {
        flex: 1;
    }
}
${mibCSS}
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
        this.speed = looper.getSpeed();
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
        this.#speedUp(-1);
    }
    
    #onPlayPause = () => {
        this.#togglePause();
    };
    
    #onSpeedUp = () => {
        this.#speedUp(1);
    };

    get slowDownButton(){
        return this.firstElementChild;
    }
    get playPauseButton(): MultiIconButton{
        return this.querySelector("multi-icon-button") as MultiIconButton;
    }
    get speedUpButton(){
        return this.lastElementChild;
    }

    render(){
        this.innerHTML = `
            <div class="looper-menu-button">${rewindIcon}</div>
            <multi-icon-button>
                ${pauseIcon}
                ${playIcon}
            </multi-icon-button>
            <div class="looper-menu-button">${forwardIcon}</div>
        `;
        this.classList.add("speed-buttons"); 
        this.classList.add('menu');
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
    
    get speed():number{
        return this.#speed;
    }

    set speed(speed:number){
        this.#speed = speed;
        this.looper.setSpeed(speed);
        const activeButton = this.determineActiveButton(speed);
        this.playPauseButton.showOnlySelected(speed ? 0 : 1);
        for(const button of this.children){
            if (button === activeButton) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    }

    #speedUp(direction: number) {
        var increase = this.#speed === 0;
        increase = increase || Math.sign(this.speed) == Math.sign(direction);
        var delta;
        if (Math.abs(this.speed) <= 0.125) {
            delta = direction * 0.125; //slomo
        } else {
            delta = increase ? this.speed : this.speed * -0.5;
        }
        this.speed += delta;
    }

    #togglePause() {
        this.speed = this.speed ? 0 : 1;
    }
}

customElements.define("speed-buttons", SpeedButtons);