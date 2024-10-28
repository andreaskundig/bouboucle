import { buttonMap } from './buttons.js';

const defaultButtonOrder = [
  "color-button",
  "stroke-button",
  "timing-button",
  "clear-button",
  "undo-button",
  "redo-button",
  "pause-button",
  "export-button",
  "info-button",
];

const defaultHtmlTemplateStr = (buttonOrder=defaultButtonOrder) => ` 
    <div class="menu">
     ${buttonOrder.map(b => buttonMap[b]).join('')}
    </div>
    
    <div id="overlay" class="hidden"> </div>
    <div class="modals">
      <div id="color-submenu" class="submenu hidden"> </div>
      <div id="timing-submenu" class="submenu hidden"> </div>
      <div id="stroke-submenu" class="submenu hidden"> </div>
      <div id="info-submenu" class="submenu hidden"></div>
      <div id="export-submenu" class="submenu hidden"></div>
      <div id="dialog-submenu"></div>
    </div>
    <div id="canvas-parent"><canvas  id="main-canvas"></canvas></div>
    <div class="hidden"><canvas id="hidden-canvas"></canvas></div>
`;

export default defaultHtmlTemplateStr;