import { doneIcon, eraseIcon, downloadIcon } from "./svgButtons";
import { Menu, Looper } from '../types.ts';
import { io } from '@andreaskundig/looper';

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

const CSS = `
export-content {
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
    .info-fr {
        font-weight: bold;
    }
    .info .link {
        color: rgb(77, 208, 225);
        text-decoration: none;
    }
    #gif-progress-bar{
        width: 500px;
        background-color: darkGrey;
        margin: 0 auto;
    }
    #gif-progress-bar > div{
        height: 10px;
        background-color: darkCyan;
    }
    #gif {
    border: 1px solid #dddddd;
    }
    #export-3 > div{
        text-align: center; /* WTF */
    }
}
`;
const requestAnimationFramePromise = function () {
  return new Promise(function (resolve, _reject) {
    requestAnimationFrame(resolve);
  });
};



class ExportContent extends HTMLElement {

  looper?: Looper;
  menu?: Menu;
  css = CSS;
  fullSizeGif = false;
  beforeShow?: () => void;

  #handleClick(event: MouseEvent) {
    const target = (event.target as any)
    if (target!.nodeName === 'DIV') {
      this.menu?.hideSubmenu();
    }
  }

  connectedCallback() {
    this.render(this);
    this.init();
    this.addEventListener('click', this.#handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.#handleClick);
  }

  attributeChangedCallback(name:string, _oldValue: any, _newValue: any) {
    if(name === 'fullsizGif'){
      this.fullSizeGif = true;
    }
  }
  
  init() {
    var gistLinks = this.querySelectorAll('.gist-link'),
      exportCancelBtnDiv = this.querySelector('#export-cancel-button') as HTMLButtonElement,
      exportOkBtnDiv = this.querySelector('#export-ok-button') as HTMLButtonElement,
      gistId:string|undefined = undefined;
      
      this.beforeShow = () => {
        this.showElements(undefined, 'export-0');
        (io as any).gists.save(this.looper!.exportData)
          .then((id:string) => {
            if (!id) {
              this.menu!.hideSubmenu();
              return;
            }
            this.showElements('.export-1', 'gist');
            gistLinks.forEach(function (gistLink) {
              (gistLink as HTMLAnchorElement).href = 'http://www.bouboucle.com?gist=' + id;
            });
            gistId = id;
          }, (err:any) => {
            console.error('could not save gist', err);
            this.showElements('.export-1', 'no-gist');
          })
          .then(() => {
            this.showElements(undefined, 'export-1');
          });
      };

    exportCancelBtnDiv.addEventListener('click', () => {
      this.menu!.hideSubmenu();
    });

    exportOkBtnDiv.addEventListener('click', () => {
      this.showElements('.export-2', gistId ? 'gist' : 'no-gist');
      this.showElements(undefined, 'export-2');
      this.displayRecording(this.looper!.record, this.fullSizeGif)
        .then(() => {
          this.showElements('.export-3', gistId ? 'gist' : 'no-gist');
          this.showElements(undefined, 'export-3');
        });
    });
  };

//  showElements(parentSelector: string, showClass: string) {
 //   this.childNodes
  showElements(parentSelector: string|undefined, showClass: string) {
      const parent = parentSelector ? this.querySelector(parentSelector) : this;
      if(parent){
        parent.childNodes.forEach(function (e: ChildNode) {
          if (!(e as any).classList) { return; }
          var hasClass = (e as any).classList.contains(showClass);
          (e as any).classList[hasClass ? 'remove' : 'add']('hidden');
        });
      }else{
        console.error('parent not found: ', parentSelector);
      }
  }

  displayRecording(record: (config:any) => Promise<string>, fullSizeGif: boolean) {
    var progBar = this.querySelector('#gif-progress-bar'),
      progIndex: HTMLElement = progBar!.firstChild as HTMLElement,
      progressCallback = function (prog: number) {
        var width = Math.abs(500 * (0.1 + prog * 0.9));
        progIndex.style.width = width + 'px';
      };
    console.log('start recording');
    progIndex.style.width = Math.abs(500 * 0.1) + 'px';
    return requestAnimationFramePromise().then(function () {
      return record({
        progress: progressCallback,
        fullSize: fullSizeGif
      });
    }).then(
      (imgSrc: string) => {
        var download = this.querySelector('#gif-download') as HTMLAnchorElement,
          gif = this.querySelector('#gif') as HTMLImageElement,
          //         window - buttons - .info padding
          maxHeight = window.innerHeight - 79.67 - 40;
        //    - text height - .info>div margin - icon height
        maxHeight = maxHeight - 27.3 - 3 * 40 - 113;
        download.href = imgSrc;
        //available height: innerHeight - 113 
        gif.src = imgSrc;
        gif.style.maxHeight = maxHeight + 'px';

      },
      function (o) {
        console.error(o.error, o);
      }
    );
  };

  render(parent: HTMLElement) {
    parent.innerHTML = htmlContent;
  }
}

customElements.define("export-content", ExportContent);
