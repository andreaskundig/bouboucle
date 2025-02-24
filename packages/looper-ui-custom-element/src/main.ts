// import './style.css'


import { makeSimpleUi, setupDomForVariant, UIVariant, ExportInfoUIMaker} from '@andreaskundig/looper-ui';
import { io, urlUtils, makeLooper } from '@andreaskundig/looper';
// import miraMakeExportAndInfoUi from './mira-export-info-ui.js'; // ??
import paper from 'paper/dist/paper-core';
const makeExportAndInfoUi = ExportInfoUIMaker.web;

// console.log("running config", config);


async function main(){
    // 1 choose ui variant and setup dom accordingly
    const variant = UIVariant.default;
    setupDomForVariant(variant);
    // 2 setup looper
    const urlParams: any = urlUtils.getUrlParams(location.href);
    const newTiming = 'new-timing' in urlParams || false;
    // const configRatioCode = urlParams.ratio || null;
    const backgroundColor = '#ffffff';
    const showGallery = !!urlParams.gallery;
    const titleHeight = 80;//79.67; // related to selected html ?
    // const fullSizeGif = !!urlParams['big-gif'];
    // const foregroundUrl = 'Coloriage_Assiette-polaire.png';
    // const foregroundImage = await loadImage(foregroundUrl);
    // let ratio =  foregroundImage.naturalWidth / foregroundImage.naturalHeight;
    let ratio = 4 / 3;
    // if (configRatioCode) {
    //     ratio = eval(configRatioCode);
    // }
    const calculateDimension = () => {
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
    }, dimension);



    const looper = makeLooper(looperConfig as any);
    looper.setLineColor('#E1BEE7')
    looper.start();
    if (urlParams.gist) {
        (io as any).gists.load(urlParams.gist, looper.importData);
    }

    // function makeExportAndInfoUi(menu, looper) {
    //     miraMakeExportAndInfoUi(menu, looper, fullSizeGif)
    // }

    makeSimpleUi(looper, makeExportAndInfoUi, newTiming, dimension,
                 showGallery);

    window.addEventListener('resize', () => {
        const targetHeight = window.innerHeight - titleHeight;
        const dim = { width: window.innerWidth, height: targetHeight }
        looper.scale(dim);
    });
}

main();
