class SVGButton extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(){
        this.render();
    }

    render(){
        this.shadowRoot!.innerHTML = `
        <style>
        ::slotted(svg) {
            width: 200px;
            height: 39px;
            padding: 20px 0;
            border-bottom: 1px solid #dddddd;
            border-right:  1px solid #dddddd;
        }
        </style>
        <div>
            <slot></slot>
        </div>`;
        // this.shadowRoot!.innerHTML = "";
        // this.shadowRoot?.appendChild(this._slot);
    }

}

customElements.define("svg-button", SVGButton);
