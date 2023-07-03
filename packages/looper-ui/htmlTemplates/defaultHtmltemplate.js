import { buttonMap } from './buttons.js';

const defaultHtmlTemplateStr = ` 
    <div class="menu nine-buttons">
      <div id="color-button">${buttonMap["color-button"]}
      </div><div id="stroke-button" >${buttonMap["stroke-button"]}
      </div><div id="timing-button">${buttonMap["timing-button"]}
      </div><div id="clear-button">${buttonMap["clear-button"]}
      </div><div id="undo-button">${buttonMap["undo-button"]}
      </div><div id="redo-button">${buttonMap["redo-button"]}
      </div><div id="pause-button">${buttonMap["pause-button"]}
      </div><div id="export-button">${buttonMap["export-button"]}
      </div><div id="info-button">${buttonMap["info-button"]}
      </div>
    </div>
    
    <div id="overlay" class="hidden"> </div>
    <div id="color-submenu" class="submenu hidden"> </div>
    <div id="timing-submenu" class="submenu hidden"> </div>
    <div id="stroke-submenu" class="submenu hidden"> </div>
    <div id="info-submenu" class="submenu hidden"></div>
    <div id="export-submenu" class="submenu hidden"></div>
    <div id="dialog-submenu"></div>
    <div id="canvas-parent"><canvas  id="main-canvas"></canvas></div>
    <div class="hidden"><canvas id="hidden-canvas"></canvas></div>
`;

export default defaultHtmlTemplateStr;