import  { makeUI, setupDomForVariant, UIVariant } from '@andreaskundig/looper-ui';
import { makeLooper } from '@andreaskundig/looper';
import paper from 'paper/dist/paper-core';


const variant = config.variant || UIVariant.default;
// 1 choose ui variant and setup dom accordingly
setupDomForVariant(variant);

console.log("running config", config);

// 2 setup looper
const newTiming = config.newTiming;
const backgroundColor = config.backgroundColor || '#ffffff';
const titleHeight = 79.67; // related to selected html ?
const fullSizeGif = false;
const foregroundImage =
      document.getElementById('bouboucle-foreground-image');
const targetHeight = window.innerHeight - titleHeight;
const scale = targetHeight /foregroundImage.naturalHeight
const dimension = {
  "width": foregroundImage.naturalWidth * scale,
  "height": foregroundImage.naturalHeight * scale,
};

const graphics = {
    canvas: document.getElementById('main-canvas'),
    paper: paper
};

const looperConfig = Object.assign({
    graphics: graphics,
    backgroundColor: backgroundColor,
    foregroundImage
}, dimension);

const looper = makeLooper(looperConfig);
looper.start();

makeUI(variant, looper, fullSizeGif, newTiming, dimension);

window.addEventListener('resize', () => {
    looper.scale({
        width:window.innerWidth,
        height: window.innerHeight - titleHeight,
        ratio: null,
    });
});
