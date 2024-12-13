import { Menu, Looper } from '../types.ts';
import "./ModalContent.ts";

const htmlContent = `
<modal-content>
  <div class="info">
   <div class="info-fr">
     <p>Bouboucle est une application
        d'Andréas Kündig et Ivan Gulizia.</p>
     <p>Elle est accessible librement sur notre site
       <span class="link">bouboucle.com</span>.</p>
     <p>Vous pouvez voir des animations réalisées
        avec bouboucle sur <br>
       <span class="link">blog.bouboucle.com</span>,
       où vous pouvez aussi publier les vôtres.</p>
   </div>
<!--
   <div class="info-en">
        <p>Bouboucle is an application by Andréas Kündig
        and Ivan Gulizia.</p>
        <p>It is freely accessible on our website
        <span class="link">bouboucle.com</span>.</p>
        <p>You can see animations made with bouboucle at
        <span class="link">blog.bouboucle.com</span>,<br>
        where you can also publish your own.
        </p>
    </div>
    <div class="info-de">
        <p>Bouboucle ist eine Applikation von
            Andréas Kündig und Ivan Gulizia.</p>
        <p>Sie ist frei zugänglich auf unserer Webseite
        <span class="link">bouboucle.com</span>.</p>
        <p>Sie können Bouboucle-Animationen auf
        <span class="link">blog.bouboucle.com</span> ansehen,<br>
        wo sie auch ihre eigenen veröffentlichen können.
        </p>
    </div>
-->
  </div>
</modal-content>
    `;

class LocalInfoContent extends HTMLElement {
    looper?: Looper;
    menu?: Menu;
    css = CSS;

    connectedCallback(){
        console.log('local-i-c connected');
        this.render(this);
        const modalC = this.querySelector('modal-content') as any;
        this.css = modalC.css;
        modalC.menu = this.menu;
    }

    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("local-info-content", LocalInfoContent);
