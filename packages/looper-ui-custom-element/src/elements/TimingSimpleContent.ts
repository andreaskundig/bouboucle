import { Menu } from '../types';
import { MultiIconContent } from  "./MultiIconContent";
import "./MultiIconContent";
import { TimingMultiButton } from './TimingMultiButton';
import {
    timing1Icon,
    timing2Icon,
    timing3Icon,
    timing4Icon,
    timing5Icon,
    timing6Icon,
} from "./svgButtons"

export class TimingSimpleContent extends HTMLElement {
    button?: TimingMultiButton;
    menu?: Menu;
    
    css = MultiIconContent.css;

    connectedCallback(){
        if(!this.button) {
            return;
        }
        this.innerHTML = `<multi-icon-content></multi-icon-content>`;
        this.addEventListener('selecticon', this.onIconSelected);
        const multiIconContent = this.querySelector('multi-icon-content') as MultiIconContent;
        const initialSelectedIndex = this.button.selectedIndex;
        multiIconContent.initIcons([
            timing1Icon, 
            timing2Icon, 
            timing3Icon,
            timing4Icon,
            timing5Icon,
            timing6Icon,
        ], initialSelectedIndex);
    }

    onIconSelected(e:any){
        const {detail: { index }} = e;
        this.button!.selectedIndex = index;
        this.menu?.hideSubmenu();
    }
}

customElements.define("timing-simple-content", TimingSimpleContent);
