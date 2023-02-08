import  { makeUI, setupDomForVariant, UIVariant } from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
import miraMakeExportAndInfoUi from './mira-export-info-ui.js'; // ??
import paper from 'paper/dist/paper-core';

console.log("running config", config);

async function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = url;
    });
}

async function main(){

    const variant = config.variant || UIVariant.default;
    // 1 choose ui variant and setup dom accordingly
    setupDomForVariant(variant);
    // 2 setup looper
    const urlParams = urlUtils.getUrlParams(location.href);
    const newTiming = 'new-timing' in urlParams || config.newTiming;
    const configRatioCode = urlParams.ratio || config.ratio;
    const backgroundColor =
      urlParams['background-color'] || config.backgroundColor || '#ffffff';
    const showGallery = !!urlParams.gallery;
    const titleHeight = 79.67; // related to selected html ?
    const fullSizeGif = !!urlParams['big-gif'];
    const foregroundUrl = 'Coloriage_Assiette-polaire.png';
    const foregroundImage = await loadImage(foregroundUrl);
    let ratio =  foregroundImage.naturalWidth / foregroundImage.naturalHeight;
    if (configRatioCode) {
        ratio = eval(configRatioCode);
    }
    const calculateDimension = () => {
        const targetHeight = window.innerHeight - titleHeight;
        return {width: window.innerWidth,
                height: targetHeight,
                ratio};
    }
    const dimension = calculateDimension();

    const graphics = {
        canvas: document.getElementById('main-canvas'),
        paper: paper,
    };

    const looperConfig = Object.assign({
        graphics: graphics,
        backgroundColor: backgroundColor,
        foregroundUrl,
    }, dimension);



    const looper = makeLooper(looperConfig);
    looper.start();
    if (urlParams.gist) {
        io.gists.load(urlParams.gist, looper.importData);
    }

    makeUI(variant, looper, fullSizeGif, newTiming, dimension,
           showGallery, miraMakeExportAndInfoUi);

    window.addEventListener('resize', () => {
        const targetHeight = window.innerHeight - titleHeight;
        const dim = { width: window.innerWidth, height: targetHeight }
        looper.scale(dim);
    });
}

main();
