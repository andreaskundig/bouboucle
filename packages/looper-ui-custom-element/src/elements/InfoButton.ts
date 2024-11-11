const svgIcon = `
<svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 width="113.387px" height="113.387px" viewBox="0 0 113.387 113.387" enable-background="new 0 0 113.387 113.387"
	 xml:space="preserve">
<g>
	<defs>
		<circle id="SVGID_29_" cx="56.693" cy="56.693" r="44.628"/>
	</defs>
	<clipPath id="SVGID_2_">
		<use xlink:href="#SVGID_29_"  overflow="visible"/>
	</clipPath>
	<use xlink:href="#SVGID_29_"  overflow="visible" fill="none" stroke="#1D1D1B" stroke-width="2" stroke-miterlimit="10"/>
</g>
<line fill="none" stroke="#1D1D1B" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" x1="56.693" y1="71.001" x2="56.693" y2="53.443"/>
<line fill="none" stroke="#1D1D1B" stroke-width="4" stroke-linecap="round" stroke-miterlimit="10" x1="56.693" y1="44.109" x2="56.693" y2="42.385"/>
</svg>
`;

class InfoButton extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback(){
        this.render(this);
        this.addEventListener('click', this.handleClick);
    }

    disconnectedCallback(){
        this.removeEventListener('click', this.handleClick);
    }

    handleClick(){
      const event = new CustomEvent('buttonclick', {
        detail: {id: 42},
      });
      this.dispatchEvent(event);
    }
    
    render(parent: HTMLElement){
        parent.innerHTML = svgIcon;
    }
}

customElements.define("info-button", InfoButton);
