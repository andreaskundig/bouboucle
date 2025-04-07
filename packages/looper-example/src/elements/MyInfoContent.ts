


class InfoContent extends HTMLElement {
    looper?: Looper;
    menu?: Menu;
    css?: string;

    connectedCallback(){
        this.render(this);
        const modalC = this.querySelector('modal-content') as any;
        this.css = modalC.css;
        modalC.menu = this.menu;
    }

    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("info-content", InfoContent);
