import { Looper } from '../types';
import "./MultiIconButton";
import { MultiIconButton } from "./MultiIconButton";
import "./StrokeSizeContent";
import {
    timing1Icon,
    timing2Icon,
    timing3Icon,
    timing4Icon,
    timing5Icon,
    timing6Icon,
} from "./svgButtons";

const timings = [[0.05,0.5],[0.25,1],[0.5,2],[1,2],[1,4],[2,1]]
                .map(t => ({lifetime: t[0] * 1000, beat: t[1] * 1000}));
const initialTimingIndex = 2;                

export class TimingMultiButton extends HTMLElement {
    #looper!: Looper;

    get looper(): Looper{
        return this.#looper;
    }

    set looper(looper:Looper){
        this.#looper = looper;
        const initialTiming = timings[initialTimingIndex];
        looper.setLifetime(initialTiming.lifetime);
        looper.setBeat(initialTiming.beat);
    }

    static get observedAttributes() { 
        return ['stroke-index']; 
    }

    connectedCallback(){
        this.render();
    }

    get iconButton(): MultiIconButton{
        return this.querySelector("multi-icon-button") as MultiIconButton;
    }

    get selectedIndex():number{
        const selectedTiming = {
            lifetime: this.looper.getLifetime(),
            beat: this.looper.getBeat()
        };
        const selectedIndex = timings.findIndex( t => 
            selectedTiming.lifetime === t.lifetime && selectedTiming.beat === t.beat);
        return selectedIndex;
    }

    set selectedIndex(index:number){
        this.iconButton.showOnlySelected(index);
        const timing = timings[index];
        this.looper.setLifetime(timing.lifetime);
        this.looper.setBeat(timing.beat);
    }
    
    render(){
        this.innerHTML = `
            <multi-icon-button>
                ${timing1Icon}
                ${timing2Icon}
                ${timing3Icon}
                ${timing4Icon}
                ${timing5Icon}
                ${timing6Icon}
            </multi-icon-button>
        `;
    }
}

customElements.define("timing-multi-button", TimingMultiButton);
