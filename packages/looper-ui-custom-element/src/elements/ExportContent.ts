import { doneIcon, eraseIcon, downloadIcon } from "./svgButtons";

const htmlContent = `
﻿ <div class="export-1 info">
   <div class="info-fr gist">
     <p>L'animation est enregistrée 
        <a class="gist-link link" target="_blank">ici</a>.</p>
     <p>Veux-tu aussi générer un gif?</p>
   </div>
   <div class="info-fr no-gist">
     <p>Veux-tu générer un gif?</p>
   </div>
   <div class="dialog-buttons gist no-gist">
    <div id="export-cancel-button">${eraseIcon}
    </div><div id="export-ok-button">
         ${doneIcon}</div>
   </div>
 </div>
 <div class="export-2 info">
   <div class="info-fr gist">
     <p>L'animation est enregistrée 
        <a class="gist-link link" target="_blank">ici</a>.</p>
     <p>Un instant, je génère le gif.</p>
   </div>
   <div class="info-fr no-gist">
     <p>Un instant</p>
   </div>
  <div id="gif-progress-bar" class="gist no-gist"><div></div></div></div>
 <div class="export-3 info" >
   <div class="info-fr gist">
     <p>L'animation est 
        <a class="gist-link link" target="_blank">ici</a>.
     Le gif est là:</p> 
   </div>
   <div class="info-fr no-gist">
     <p>Voilà</p> 
   </div>
   <div class="gist no-gist">
     <div><img id="gif"></img></div>
     <div><a download="bouboucle.gif" id="gif-download">
        ${downloadIcon}
    </div>
   </div>
 </div>
`;

class ExportContent extends HTMLElement {

    connectedCallback(){
        console.log('ExportContent connectedCallback')
        this.render(this);
    }
    
    render(parent: HTMLElement){
        parent.innerHTML = htmlContent;
    }
}

customElements.define("export-content", ExportContent);
