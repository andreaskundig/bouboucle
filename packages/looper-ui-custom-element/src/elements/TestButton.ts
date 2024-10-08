const svgIcon = `
     <svg version="1.1" id="Calque_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
          x="0px" y="0px"  
          viewBox="0 0 113.387 113.387" enable-background="new 0 0 113.387 113.387"
	      xml:space="preserve">
      <g>
        <defs>
          <circle id="SVGID_21_" cx="56.692" cy="56.693" r="44.628"/>
        </defs>
        <clipPath id="SVGID_2_">
          <use xlink:href="#SVGID_21_"  overflow="visible"/>
        </clipPath>
        <use xlink:href="#SVGID_21_"  overflow="visible" fill="none" stroke-width="2" stroke-miterlimit="10"/>
      </g>
      <path d="M101.322,56.699c0,24.648-19.98,44.622-44.629,44.622S12.064,81.348,12.064,56.699
        c0-24.649,19.98-44.636,44.629-44.636S101.322,32.05,101.322,56.699z"/>
      </svg>
`;

class TestButton extends HTMLElement {

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

customElements.define("test-button", TestButton);
