import { Looper, Menu } from "../types";
import { VideoCarousel } from "./VideoCarousel";

const slides = [
    {
        title: 'Choisir la combinaison fréquence / durée de vie',
        src: "./videos/rythmes.mp4"
    },
    {
        title: 'Dessiner plus vite allonge les traits',
        src: "./videos/vitesses.mp4",
    },
    {
        title: 'Mettre en pause pour dessiner des traits qui clignotent',
        src: "./videos/explosion.mp4",
    },
    {
        title: "Ceci est dessiné d'un seul long trait",
        src: "./videos/etoile.mp4",
    },
    {
        title: 'Ceci est dessiné avec beaucoup de traits courts',
        src: "./videos/vagues-reculent.mp4",
    },
    {
        title: 'Varier les couleurs',
        src: "./videos/arc-en-ciel.mp4",
    },
    {
        title: 'Varier la vitesse de dessin',
        src: "./videos/chenille-clignotante.mp4",
    }
].map(s => ({title: s.title, src: (import.meta as any).resolve(s.src)}));

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
 info-content {
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


class InfoContent extends HTMLElement {
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

customElements.define("info-content", InfoContent);
