import { MultiIconButton } from './MultiIconButton.ts';

const CSS = `
    multi-icon-content{
        display: flex;
        
        div {
            flex: 1;
        }
    
        div > svg {
            width: 100%;
            height: 39px;
            padding: 20px 0px;
            border-bottom: 1px solid #dddddd;
            border-right: 1px solid #dddddd;
        }
    }
`;

export class MultiIconContent extends HTMLElement {
    // button?: MultiIconButton;
    css = CSS;

    initIcons(icons: string[], selectedIndex = 0){
        for (let i = 0; i < icons.length; i++) {
            this.insertAdjacentHTML('beforeend', `<div>${icons[i]}</div>`);
            const div = this.lastChild as HTMLElement;
            div?.addEventListener('click', () => {
                this.selectIndex(i);
            });
        }
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
        console.log("selecting index", index);
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if(i === index) {
                child.classList.add('active');
            } else {
                child.classList.remove('active');
            }
        }

        this.dispatchEvent(new CustomEvent("selecticon", { bubbles: true, detail: { index }}));
    }
}

customElements.define("multi-icon-content", MultiIconContent);
