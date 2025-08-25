
import { Looper, Menu, VideoCarousel } from "@andreaskundig/looper-custom-element";
//import vitesseMp4 from "@andreaskundig/looper-custom-element/assets/videos/vitesses.mp4";

import rythmesMp4 from "@andreaskundig/looper-custom-element/assets/videos/rythmes.mp4";
import vitessesMp4 from "@andreaskundig/looper-custom-element/assets/videos/vitesses.mp4";
import explosionMp4 from "@andreaskundig/looper-custom-element/assets/videos/explosion.mp4";
import etoileMp4 from "@andreaskundig/looper-custom-element/assets/videos/etoile.mp4";
import vaguesReculentMp4 from "@andreaskundig/looper-custom-element/assets/videos/vagues-reculent.mp4";
import arcEnCielMp4 from "@andreaskundig/looper-custom-element/assets/videos/arc-en-ciel.mp4";
import chenilleClignotanteMp4 from "@andreaskundig/looper-custom-element/assets/videos/chenille-clignotante.mp4";


const slides = [
    {
        title: 'Choisir la combinaison fréquence / durée de vie',
        src: "/images/videos/rythmes.mp4",
    },
    {
        title: 'Dessiner plus vite allonge les traits',
        src: vitessesMp4,
    },
    {
        title: 'Mettre en pause pour dessiner des traits qui clignotent',
        src: explosionMp4,
    },
    {
        title: "Ceci est dessiné d'un seul long trait",
        src: etoileMp4,
    },
    {
        title: 'Ceci est dessiné avec beaucoup de traits courts',
        src: vaguesReculentMp4,
    },
    {
        title: 'Varier les couleurs',
        src: arcEnCielMp4,
    },
    {
        title: 'Varier la vitesse de dessin',
        src: chenilleClignotanteMp4,
    }
];


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

    async connectedCallback(){
        this.render(this);
        const modalC = this.querySelector('modal-content') as any;
        modalC.menu = this.menu;

        const videoCarousel = this.querySelector('video-carousel') as VideoCarousel;
        await customElements.whenDefined("video-carousel");

        videoCarousel.slides = slides;
    }

    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("my-info-content", MyInfoContent);
