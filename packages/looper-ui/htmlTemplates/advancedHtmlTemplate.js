import { buttonMap } from './buttons.js';

const advancedHtmlTemplateStr = `
    <style>
      .menu > div {
          width: 9.0909%; 
      }
    </style>
    <div class="menu">
      <div id="color-button">
        <!-- 1_couleur+2_taille_5.svg is inlined so we can change its color -->
        <svg  version="1.1" id="Calque_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              width="113.387px" height="113.387px" viewBox="0 0 113.387 113.387"
              enable-background="new 0 0 113.387 113.387"
              xml:space="preserve">
          <g>
            <defs><circle id="SVGID_21_" cx="56.692" cy="56.693" r="44.628"/>
            </defs>
            <clipPath id="SVGID_2_">
              <use xlink:href="#SVGID_21_"  overflow="visible"/>
            </clipPath>
            <use xlink:href="#SVGID_21_"  overflow="visible" fill="none"
                 stroke-width="2" stroke-miterlimit="10"/>
          </g>
          <path d="M101.322,56.699c0,24.648-19.98,44.622-44.629,44.622S12.064,
                   81.348,12.064,56.699
                   c0-24.649,19.98-44.636,44.629-44.636S101.322,32.05,101.322,
                   56.699z"/>
        </svg>
      </div><div id="stroke-button" >${buttonMap["stroke-button"]}
      </div><div id="timing-button">${buttonMap["timing-button"]}
      </div><div id="clear-button">${buttonMap["clear-button"]}
      </div><div id="undo-button">${buttonMap["undo-button"]}
      </div><div id="redo-button">${buttonMap["redo-button"]}
      </div><div id="rewind-button">${buttonMap["rewind-button"]}
      </div><div id="pause-button">${buttonMap["pause-button"]}
      </div><div id="forward-button">${buttonMap["forward-button"]}
      </div><div id="export-button">${buttonMap["export-button"]}
      </div><div id="info-button">${buttonMap["info-button"]}
      </div>
    </div>
    
    <div id="overlay" class="hidden"> </div>
    <div id="color-submenu" class="submenu hidden"> </div>
    <div id="timing-submenu" class="submenu hidden">
    </div>
    <div id="stroke-submenu" class="submenu hidden"> </div>
    <div id="info-submenu" class="submenu hidden"></div>
    <div id="export-submenu" class="submenu hidden"></div>
    <div id="dialog-submenu"></div>
    <div id="canvas-parent"><canvas  id="main-canvas"></canvas></div>
    <div class="hidden"><canvas id="hidden-canvas"></canvas></div>
`;

export default advancedHtmlTemplateStr;