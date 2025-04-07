import { doneIcon, eraseIcon } from "./svgButtons";
import { Menu, Looper } from '../types';
import { io } from '@andreaskundig/looper';

const htmlContent = `
        <div class="info">
          <div class="info-fr">
            <p>Voulez-vous sauvegarder votre animation</p>
            <p>pour qu'elle soit projetée régulièrement sur le mur?</p>
          </div>
          <div class="dialog-buttons">
            <div id="export-cancel-button">${eraseIcon}</div>
            <div id="export-ok-button">${doneIcon}</div>
          </div>
        </div>
`;

const CSS = `
local-export-content {
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
}
`;

class LocalExportContent extends HTMLElement {

  looper?: Looper;
  menu?: Menu;
  css = CSS;

  #handleExport?: () => void;

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

  init() {
    const exportCancelBtnDiv =
      this.querySelector('#export-cancel-button') as HTMLButtonElement;
    const exportOkBtnDiv =
      this.querySelector('#export-ok-button') as HTMLButtonElement;

    exportCancelBtnDiv.addEventListener('click',
      () => this.menu?.hideSubmenu());
    exportOkBtnDiv.addEventListener('click', () => {
      this.menu?.hideSubmenu();
      this.#handleExport = this.#handleExport || this.makeSaver();
      this.#handleExport();
    });
  };

  makeSaver() {
    var lastSaveTime = this.looper!.getLastUpdateTime();
    return () => {
      var lastUpdateTime = this.looper!.getLastUpdateTime();
      if (lastSaveTime < lastUpdateTime) {
        var toSave = 'saved/' + Date.now() + '.js';
        console.log('save', toSave, lastUpdateTime);
        (io as any).server.save(this.looper!.exportData, toSave);
        lastSaveTime = lastUpdateTime;
      }
    };

  };

  render(parent: HTMLElement) {
    parent.innerHTML = htmlContent;
  }
}

customElements.define("local-export-content", LocalExportContent);
