import iconUrl from '/assets/icons/2_taille_1.svg';

class HelloWorld extends HTMLElement {
    constructor() {
        super();
        console.log("hello world");
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot!.innerHTML = "";

        const iconImage = document.createElement('img');
        iconImage.src = iconUrl;

        this.shadowRoot?.appendChild(iconImage);
    }
}

customElements.define("hello-world", HelloWorld);
  