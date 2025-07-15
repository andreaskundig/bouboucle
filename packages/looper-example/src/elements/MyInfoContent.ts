import { Looper, Menu } from "@andreaskundig/looper-custom-element";
import { VideoCarousel } from "./VideoCarousel";

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

const myCss = `
 my-info-content {
  .container {
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    div {
      max-width: 600px;
      width: 100%;
    }
  }
 }
`;


class MyInfoContent extends HTMLElement {
    looper?: Looper;
    menu?: Menu;
    css = myCss + VideoCarousel.css;

    connectedCallback(){
        this.render(this);
        const modalC = this.querySelector('modal-content') as any;
        modalC.menu = this.menu;
    }

    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("my-info-content", MyInfoContent);
