import { Looper, Menu } from "@andreaskundig/looper-custom-element";
import { VideoCarousel } from "./VideoCarousel";

import "./VideoCarousel";

const htmlContent = `
<modal-content>
<div class="container">
  <div class="tutorial">
    <h3>Tutoriel</h3>
    <video-carousel></video-carousel>
  </div>
  <div class="info">
    <h3>À propos</strong></h3>
    <p>Bouboucle est un projet 
       d'<a href="https://andreaskundig.ch" target="_blank"
          class="link">Andréas Kündig</a>, 
       <a href="http://www.ivangulizia.com/" target="_blank"
          class="link">Ivan Gulizia</a> 
       et 
       <a href="https://davidhodgetts.ch" target="_blank"
          class="link">David Hodgetts</a>.
    </p>
    <p>Visite la
        <a class="link"
            href="http://www.bouboucle.com/gallery.html">galerie</a>
        d'animations créées pour notre exposition à BDFIL.</p>  
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
    margin: auto;
    flex-wrap: wrap;
    padding: 0 15px;
    max-width: 600px;
    > div {
      width: 100%;
      margin-bottom: 20px;
    }
    .info > p {
      padding-left: 15px;
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
