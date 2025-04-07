import { Menu, Looper } from '../types';

const CSS = `
modal-content {
    .info {
        font: 21px arial, sans-serif;
        text-align: center;
        line-height:130%;
        padding-top: 40px;
        bottom: 0;
    }
    .info p{
        margin: 6px;
    }
    .info div {
        margin-bottom: 40px;
    }
    .info-fr, .info-de {
        font-weight: bold;
    }
    .info-en {
        font-style: italic;
    }
    .info .link {
        color: rgb(77, 208, 225);
        text-decoration: none;
    }
}
`;

class ModalContent extends HTMLElement {
    looper?: Looper;
    menu?: Menu;
    css = CSS;

    #handleClick(){
        console.log("click");
        this.menu?.hideSubmenu();
    }

    connectedCallback(){
        this.addEventListener('click', this.#handleClick);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.#handleClick);
    }
    
}

customElements.define("modal-content", ModalContent);
