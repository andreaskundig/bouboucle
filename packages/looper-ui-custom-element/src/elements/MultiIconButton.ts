export const CSS = `
    multi-icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
}`;

export class MultiIconButton extends HTMLElement {
    css = CSS

    static get observedAttributes() { 
        return ['selected']; 
    }

    connectedCallback(){
        this.showOnlySelected(0);
        this.classList.add('looper-menu-button');
    }
    
    attributeChangedCallback(name:string, _oldValue: string, newValue: string) {
        if(name === 'selected'){
            const index = parseInt(newValue);
            this.showOnlySelected(index);
        }
    }

    showOnlySelected(index: number){
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if(i === index) {
                child.classList.remove('hidden');
            } else {
                child.classList.add('hidden');
            }
        }
    }
}

customElements.define("multi-icon-button", MultiIconButton);
