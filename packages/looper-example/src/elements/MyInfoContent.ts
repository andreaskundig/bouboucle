import { Menu, Looper } from '@andreaskundig/looper-custom-element';

const htmlContent = `
<modal-content>
    <div class="info">
    <p>Bouboucle est un projet
        d'Andréas Kündig et Ivan Gulizia.</p>
    <p>Publie ton animation sur notre
        <a class="link" target="_blank"
            href="http://blog.bouboucle.com">blog</a>.
        Non vraiment, tu es le bienvenu.</p>
    <p>Visite la
        <a class="link"
            href="http://www.bouboucle.com/gallery.html">galerie</a>
        d'animations créées spécialement pour notre exposition à
        <a class="link" target="_blank" href="http://www.bdfil.ch/edition-2018/les-expositions/bouboucle">BFIL.</a></p>
    <p>L'<a
        href="ancien.html"  target="_blank"
        class="link">ancienne version</a>
        plus compliquée est toujours disponible.</p>
    <p>Ça fait plus que 10 ans qu'<a
        href="http://www.andreaskundig.ch" target="_blank"
        class="link">Andréas</a>
        a la flemme de mettre à jour son site.</p>
    <p>Mais celui d'<a
        href="http://www.ivangulizia.com/" target="_blank"
        class="link">Ivan</a> est impeccable.</p>
    </div>
</modal-content>
    `;

const myCss = `
 my-info-content {
    .info > p {
      padding-left: 15px;
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
        this.css = myCss + modalC.css;
        modalC.menu = this.menu;
    }

    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("my-info-content", MyInfoContent);
