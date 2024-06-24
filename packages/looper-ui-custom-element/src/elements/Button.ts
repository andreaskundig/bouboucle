
import iconUrl from '/assets/icons/2_taille_1.svg';

enum AttributeName {
    ICON_SRC = "icon-src",
}
class Button extends HTMLElement {
    static observedAttributes = [AttributeName.ICON_SRC];

    private image :HTMLImageElement = document.createElement('img');
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.render();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);

        if(name == AttributeName.ICON_SRC){
            this.image.src = newValue;
        }
    }

    render(){
        this.shadowRoot!.innerHTML = "";

        const container = document.createElement('div');
        container.appendChild(this.image);

        this.shadowRoot?.appendChild(container);
    }

}

customElements.define("button-element", Button);
  