import { Menu, Looper } from '../types.ts';

const htmlContent = `
    <div class="info">
    <div class="info-fr">
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
    </div>
    <div class="info-fr">
    <p>Ça fait plus que 10 ans qu'<a
        href="http://www.andreaskundig.ch" target="_blank"
        class="link">Andréas</a>
        a la flemme de mettre à jour son site.</p>
    <p>Mais celui d'<a
        href="http://www.ivangulizia.com/" target="_blank"
        class="link">Ivan</a> est impeccable.</p>
    </div>
    </div>'
    `;


const CSS = `
info-content {
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
    .info .link {
        color: rgb(77, 208, 225);
        text-decoration: none;
    }
}
`;

class InfoContent extends HTMLElement {
    looper?: Looper;
    menu?: Menu;
    css = CSS;

    #handleClick(){
        console.log("click");
        this.menu?.hideSubmenu();
    }

    connectedCallback(){
        this.render(this);
        this.addEventListener('click', this.#handleClick);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.#handleClick);
    }
    
    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("info-content", InfoContent);
