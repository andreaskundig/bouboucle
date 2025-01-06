import { MultiIconButton } from './MultiIconButton.ts';

const CSS = `
`;

export class MultiIconContent extends HTMLElement {
    button?: MultiIconButton;
    css = CSS;


    set icons(icons: string[]){
        this.innerHTML = icons.map(i => `<div>${i}</div`).join('\n');
        const selected = this.getAttribute('selected');     
        const selectedIndex = selected ? parseInt(selected) : 0;
        this.selectIndex(selectedIndex);
    }
    
    static get observedAttributes() { 
        return ['selected']; 
    }

    attributeChangedCallback(name:string, _oldValue: string, newValue: string) {
        if(name === 'selected'){
            const index = parseInt(newValue);
            this.selectIndex(index);
        }
    }

    selectIndex(index: number){
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if(i === index) {
                child.classList.add('active');
            } else {
                child.classList.remove('active');
            }
        }
    }
}

customElements.define("multi-icon-content", MultiIconContent);
