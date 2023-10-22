import { getAssetString } from "./assetsDB.js";
import { injectCSS } from './setup.js'
export default function localMakeExportAndInfoUi(menu, looper, io, fullSizeGif){

    const erase_4 = getAssetString('4_erase.svg');
    const done_8 = getAssetString('8_done.svg');

    const infoContent = [
        '<div class="info">',
        ' <div class="info-fr">',
        '   <p>Bouboucle est une application ',
        "      d'Andréas Kündig et Ivan Gulizia.</p>",
        '   <p>Elle est accessible librement sur notre site',
        '     <span class="link">bouboucle.com</span>.</p>',
        '   <p>Vous pouvez voir des animations réalisées',
        '      avec bouboucle sur <br>' ,
        '     <span class="link">blog.bouboucle.com</span>,',
        '     où vous pouvez aussi publier les vôtres.</p>',
        ' </div>',
        // ' <div class="info-en">',
        // '   <p>Bouboucle is an application by Andréas Kündig',
        // '  and Ivan Gulizia.</p>',
        // '   <p>It is freely accessible on our website',
        // '     <span class="link">bouboucle.com</span>.</p>',
        // '   <p>You can see animations made with bouboucle at',
        // '     <span class="link">blog.bouboucle.com</span>,<br>',
        // '     where you can also publish your own.',
        // '   </p>',
        // ' </div>',
        // ' <div class="info-de">',
        // '   <p>Bouboucle ist eine Applikation von',
        // '      Andréas Kündig und Ivan Gulizia.</p>',
        // '   <p>Sie ist frei zugänglich auf unserer Webseite',
        // '     <span class="link">bouboucle.com</span>.</p>',
        // '   <p>Sie können Bouboucle-Animationen auf',
        // '     <span class="link">blog.bouboucle.com</span> ansehen,<br>',
        // '     wo sie auch ihre eigenen veröffentlichen können.',
        // '   </p>',
        // ' </div>',
        '</div>'
    ].join('\n');
    const infoCSS = `
.submenu .info {
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
.info-fr, .info-de {
    font-weight: bold;
}
.info-en {
    font-style: italic;
}
.info .link {
    color: rgb(77, 208, 225);
    text-decoration: none;
}
        `;

    const exportContent = [
        ' <div class="info">',
        '   <div class="info-fr">',
        // "     <p>Voulez-vous publier votre animation?</p>",
        "     <p>Voulez-vous sauvegarder votre animation</p>",
        "     <p>pour qu'elle soit projetée régulièrement sur le mur?</p>",
        // "     <p>Voulez-vous sauvegarder votre animation?</p>",
        // "     <p>Nous la publierons sur blog.bouboucle.com, </p>",
        // "     <p>et peut-être aussi sur villabernasconi.ch.</p>",
        '   </div>',
        // '   <div class="info-en">',
        // '     <p>Do you want to publish your animation?</p>',
        // '   </div>',
        // '   <div class="info-de">',
        // '     <p>Wollen sie ihre Animation veröffentlichen?</p>',
        // '   </div>',
        '   <div class="dialog-buttons">',
        `     <div id="export-cancel-button"><img src="${erase_4}">`,
        '     </div><div id="export-ok-button">',
        `         <img src="${done_8}"></div>`,
        '   </div>',
        ' </div>'
    ].join('\n');

    const initExportButton = function (exportHandler, menu) {
        var exportButtonDiv = document.querySelector('#export-button'),
            exportMenuDiv = document.querySelector('#export-submenu');
        exportMenuDiv.innerHTML = exportContent;
        ;
        var exportCancelBtnDiv = document.querySelector(
            '#export-cancel-button'),
            exportOkBtnDiv = document.querySelector('#export-ok-button');

        exportCancelBtnDiv.addEventListener('click', function () {
            menu.hideSubmenu();
        });
        exportOkBtnDiv.addEventListener('click', function () {
            menu.hideSubmenu();
            exportHandler.handle();
        });
        menu.initShowSubmenu(exportMenuDiv, exportButtonDiv);
    };

    const initInfoButton = function (menu) {
        injectCSS(infoCSS);
        var infoButtonDiv = document.querySelector('#info-button'),
            infoMenuDiv = document.querySelector('#info-submenu');
        infoMenuDiv.innerHTML = infoContent;
        menu.initShowSubmenu(infoMenuDiv, infoButtonDiv);
    };

    const initGalleryButton = function () {
        var galleryButtonDiv = document.querySelector('#gallery-button');
        galleryButtonDiv?.addEventListener('click', function () {
            document.location.href = '/gallery.html?menu=true';
        });
    };

    const makeSaver = function (looper, fileName) {
        var lastSaveTime = looper.getLastUpdateTime();
        return function () {
            var lastUpdateTime = looper.getLastUpdateTime();
            if (lastSaveTime < lastUpdateTime) {
                var toSave = fileName || 'saved/' + Date.now() + '.js';
                console.log('save', toSave, lastUpdateTime);
                io.server.save(looper.exportData, toSave);
                lastSaveTime = lastUpdateTime;
            }
        };
    };

    let autoSaveId;
    const instanceId = Math.round(Math.random() * 1000000000);
    const startAutoSaves = function (looper, period) {
        clearInterval(autoSaveId);
        autoSaveId = setInterval(makeSaver(looper,
            'auto/' + instanceId + '.js'),
            period || 5000);
    };
        
    const init = function (menu, looper) {
        initExportButton({ handle: makeSaver(looper) }, menu);
        initGalleryButton();
        initInfoButton(menu);
        startAutoSaves(looper);
    };
    init(menu, looper);
};

