import { Looper, Menu } from "@andreaskundig/looper-custom-element";
import { VideoCarousel } from "./VideoCarousel";

import "./VideoCarousel";

const htmlContent = `
<modal-content>
<div class="container">
  <div class="tutorial">
    <video-carousel></video-carousel>
  </div>
  <div class="info">
    <p><strong>Qu'est-ce que c'est que ça</strong></p>
    <p>Bouboucle est un projet d'Andréas Kündig, Ivan Gulizia et David Hodgetts.</p>
    <p>Visite la
        <a class="link"
            href="http://www.bouboucle.com/gallery.html">galerie</a>
        d'animations créées spécialement pour notre exposition à BDFIL.</p>  
    <p>Le site d'<a
        href="https://andreaskundig.ch" target="_blank"
        class="link">Andréas</a>
        présente un certain intérêt paléontologique.</p>
    <p>Celui d'<a
        href="http://www.ivangulizia.com/" target="_blank"
        class="link">Ivan</a> est impeccable et sera sûrement de retour bientôt.</p>
    <p><a
        href="https://davidhodgetts.ch" target="_blank"
        class="link">David</a> a un vrai site
        professionnel.</p>
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
      width: 100%;
      /* TODO avoid having to set here 
         the width needed for the carousel */
      max-width: 600px;

    }
    .info{
      padding: 0 15px;

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
