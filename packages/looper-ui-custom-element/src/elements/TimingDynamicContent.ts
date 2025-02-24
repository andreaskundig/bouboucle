import { Looper, Menu, Timing, Dimension } from '../types.ts';
import { TITLE_HEIGHT } from './Constants.ts';

export class TimingDynamicContent extends HTMLElement {
    menu?: Menu;
    looper?: Looper;
    timingLooper?: Looper
    css = '';

    connectedCallback(){
        const looper = this.looper
        if(!looper){
            return
        }
        const initial = {lifetime: 0.5, beat:2};

        const handle = (t: any) => {
            looper.setLifetime(t.lifetime * 1000);
            looper.setBeat(t.beat * 1000);
        };
        const pickTiming = (timing: Timing) => {
            this.menu?.hideSubmenu();
            handle(timing);
        }; 
        const dimension = {
            width: window.innerWidth,
            height: window.innerHeight - TITLE_HEIGHT,
        };
        this.render(this, initial, pickTiming, looper, dimension);
    }

    onIconSelected(e:any){
        this.menu?.hideSubmenu();
    }

    render(parentElement: HTMLElement,
        initialT: Timing,
        pickTiming: (timing: Timing) => void,
        looper: Looper,
        dimension: Dimension) {
        let activeDisplay: Element|null;
        const canvasParent = document.createElement('div');
        const canvas = document.createElement('canvas');
        const buttonTable = document.createElement('table');
        const findDisplay = (buttonTd: HTMLElement) =>
            displayTable.querySelector('tr>td.' + buttonTd.className);
        
        const beats = [6, 3, 2, 1, 1 / 2];
        const lifetimes = [0.05, 0.1, 0.25, 0.50, 1, 2];
        const timings = beats.map(b =>  
            lifetimes.map(l => ({ lifetime: l * 1000, beat: b * 1000 }))) as Timing[][];
        canvasParent.appendChild(canvas);
        canvasParent.style.position = 'absolute';
        buttonTable.style.position = 'absolute';
        buttonTable.style.borderCollapse = 'collapse';
        buttonTable.style.height = dimension.height + "px";
        buttonTable.style.width = dimension.width + "px";
        const displayTable = buttonTable.cloneNode() as HTMLElement;
        displayTable.style.backgroundColor = 'white';
        parentElement.appendChild(displayTable);
        parentElement.appendChild(canvasParent);
        parentElement.appendChild(buttonTable);
        const timingLooper = looper.makeTimingDemo(canvas, timings, dimension);
        timings.forEach(function (beats, beatIndex) {
            const buttonRow = document.createElement('tr');
            buttonTable.appendChild(buttonRow);
            const displayRow = document.createElement('tr');
            displayTable.appendChild(displayRow);
            beats.forEach(function (timing: Timing, timingIndex: number) {
                const buttonTd = document.createElement('td');
                buttonTd.classList.add('b' + beatIndex + 'l' + timingIndex);
                const displayTd = buttonTd.cloneNode() as HTMLTableCellElement;
                displayTd.style.border = 'solid #dddddd 1px';
                if (timing.lifetime === (initialT.lifetime) * 1000 &&
                    timing.beat === (initialT.beat * 1000)) {
                    pickTiming({
                        lifetime: timing.lifetime / 1000,
                        beat: timing.beat / 1000
                    });
                    activeDisplay = displayTd;
                    activeDisplay.classList.add('active');
                }
                buttonTd.addEventListener('click', function (e) {
                    if (activeDisplay) {
                        activeDisplay.classList.remove('active');
                    }
                    activeDisplay = findDisplay(buttonTd);
                    activeDisplay?.classList.add('active');
                    pickTiming({
                        lifetime: timing.lifetime / 1000,
                        beat: timing.beat / 1000
                    });
                });
                buttonRow.appendChild(buttonTd);
                displayRow.appendChild(displayTd);
            });
        });
        this.timingLooper = timingLooper;
    }

    update(config: any){
        if(this.timingLooper && 'speed' in config){
            this.timingLooper.setSpeed(config.speed);
        }
    };
}

customElements.define("timing-dynamic-content", TimingDynamicContent);
