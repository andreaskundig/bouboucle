export class MultiIconButton extends HTMLElement {
    
    static get observedAttributes() { 
        return ['selected']; 
    }

    connectedCallback(){
        this.showOnlySelected(0);
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
