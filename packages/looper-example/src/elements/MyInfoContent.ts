import { Looper, Menu, injectCSS } from "@andreaskundig/looper-custom-element";

import "./VideoCarousel";

const htmlContent = `
<modal-content>
<div class="container">
  <div class="info">
    <p>Bouboucle est un projet
       d'Andréas Kündig, Ivan Gulizia et David Hodgetts.</p>
  </div>
  <div class="tutorial">
    <video-carousel></video-carousel>
  </div>
</div>
</modal-content>
    `;

const css = `
 my-info-content {
  .container {
    display: flex;
    flex-direction: column;
    /* WTF?? 
    justify-content: space-between;
    */
        div {

     max-width: 600px;
        }
  }
    
 }
`;


class MyInfoContent extends HTMLElement {
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
        injectCSS(css);
    }
}

customElements.define("my-info-content", MyInfoContent);
