import { getAssetString, injectCSS } from '@andreaskundig/looper-ui';
export default function makeExportAndInfoUi(menu, looper, io, fullSizeGif){

    const gas = getAssetString;
    const download_10 = gas('10_download.svg');
    const erase_4 = gas('4_erase.svg');
    const done_8 = gas('8_done.svg');

    const infoContent = `
    <div class="info-box">
        <div class="instructions">
            <div class="row">
                <img src="${gas('1_couleur+2_taille_5.svg')}" class="icon">
                <div class="text">Choisis ta couleur</div>
            </div>
            <div class="row">
                <img src="${gas('2_taille_3.svg')}" alt="" class="icon">
                <div class="text">Fixe l'épaisseur de ton trait</div>
            </div>
            <div class="row">
                <img src="${gas('3_trait_3.svg')}" alt="" class="icon">
                <div class="text">Définis la fréquence / durée de vie de la ligne</div>
            </div>
            <div class="row">
                <img src="${gas('8_done.svg')}" alt="" class="icon">
                <div class="text">Quand tu as terminé, télécharge ton animation</div>
            </div>
         </div>
         <div class="info">

          <div class="info-fr">
            <p>Bouboucle est un projet
               d'Andréas Kündig et Ivan Gulizia.</p>
            <p>Publie ton animation sur notre
              <a class="link" target="_blank"
                 href="http://blog.bouboucle.com">blog</a>.
              Non vraiment, tu es le bienvenu.</p>
            <p>Visite la
              <a class="link"
                 href="http://www.bouboucle.com/gallery.html">galerie</a>
              d'animations créées spécialement pour notre exposition à
              <a class="link" target="_blank" href="http://www.bdfil.ch/edition-2018/les-expositions/bouboucle">BFIL.</a></p>
            <p>L'<a
              href="ancien.html"  target="_blank"
              class="link">ancienne version</a>
              plus compliquée est toujours disponible.</p>
          </div>
          <div class="info-fr">
            <p>Ça fait plus que 10 ans qu'<a
               href="http://www.andreaskundig.ch" target="_blank"
               class="link">Andréas</a>
               a la flemme de mettre à jour son site.</p>
            <p>Mais celui d'<a
               href="http://www.ivangulizia.com/" target="_blank"
               class="link">Ivan</a> est impeccable.</p>
          </div>
         </div>
     </div>
    `;

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
    #info-submenu {
    height: auto;
    bottom: 0;
    overflow-y: scroll;
    }
    .info-box{
        position: relative;
        margin: 0 auto;
        max-width: 600px;
        height: 100%;
        color: black;
        font-family: var(--font-family);
    /*  remove calc when we're no longer using
        the other font-size declaration */
        font-size: calc(2px + var(--font-size));
    }
    .info-box .icon {
        width: 27px;
    }

    .info-box .instructions{
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    .info-box .row{
        display: flex;
        line-height: normal;
    }
    .info-box .instructions .text {
        padding: 2px 0 0 20px;
    }
        `;

    const exportContent = [
        ' <div class="export-1 info">',
        '   <div class="info-fr no-gist">',
        '     <p>Veux-tu générer un gif?</p>',
        '   </div>',
        '   <div class="dialog-buttons gist no-gist">',
        `    <div id="export-cancel-button"><img src="${erase_4}">`,
        // '    <div id="export-cancel-button"><img src="icons/4_erase.svg">',
        '    </div><div id="export-ok-button">',
        `         <img src="${done_8}"></div>`,
        // '         <img src="icons/8_done.svg"></div>',
        '   </div>',
        ' </div>',
        ' <div class="export-2 info">',
        '   <div class="info-fr no-gist">',
        '     <p>Un instant</p>',
        '   </div>',
        '  <div id="gif-progress-bar" class="gist no-gist"><div></div></div></div>',
        ' <div class="export-3 info" >',
        '   <div class="info-fr no-gist">',
        '     <p>Voilà</p> ',
        '   </div>',
        '   <div class="gist no-gist">',
        '     <div><img id="gif"></img></div>',
        '     <div><a download="bouboucle.gif" id="gif-download">',
        `             <img src="${download_10}"></div>`,
        // '            <img src="icons/10_download.svg"></div>',
        '   </div>',
        ' </div>',
    ].join('\n');

    const showElements = function (parentSelector, showClass) {
        document.querySelector(parentSelector)
            .childNodes
            .forEach(function (e) {
                if (!e.classList) { return; }
                var hasClass = e.classList.contains(showClass);
                e.classList[hasClass ? 'remove' : 'add']('hidden');
            });
    };

    const requestAnimationFramePromise = function () {
        return new Promise(function (resolve, reject) {
            requestAnimationFrame(resolve);
        });
    };

    const displayRecording = function (record, fullSizeGif) {
        var progBar = document.querySelector('#gif-progress-bar'),
            progIndex = progBar.firstChild,
            progressCallback = function (prog) {
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
            function (imgSrc) {
                var download = document.querySelector('#gif-download'),
                    gif = document.querySelector('#gif'),
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

    const initExportButton = function (looper, menu) {
        var exportButtonDiv = document.querySelector('#export-button'),
            exportMenuSelector = '#export-submenu',
            exportMenuDiv = document.querySelector(exportMenuSelector);
        exportMenuDiv.innerHTML = exportContent;
        var exportCancelBtnDiv = document.querySelector(
            '#export-cancel-button'),
            exportOkBtnDiv = document.querySelector('#export-ok-button'),
            beforeShow = function () {
                // showElements('.export-1', 'no-gist');
                showElements(exportMenuSelector, 'export-1');
            };
        exportCancelBtnDiv.addEventListener('click', function () {
            menu.hideSubmenu();
        });
        exportOkBtnDiv.addEventListener('click', function () {
            showElements(exportMenuSelector, 'export-2');
            displayRecording(looper.record, fullSizeGif)
                .then(function () {
                    showElements(exportMenuSelector, 'export-3');
                });
        });

        menu.initShowSubmenu(exportMenuDiv, exportButtonDiv, beforeShow);
    };

    const initInfoButton = function (menu) {
        injectCSS(infoCSS);
        var infoButtonDiv = document.querySelector('#info-button'),
            infoMenuDiv = document.querySelector('#info-submenu');
        infoMenuDiv.innerHTML = infoContent;
        infoMenuDiv.addEventListener('click', function () {
            menu.hideSubmenu();
        });
        menu.initShowSubmenu(infoMenuDiv, infoButtonDiv);
    };

    const init = function (menu, looper, fullSizeGif) {
        initExportButton(looper, menu, fullSizeGif);
        initInfoButton(menu);
    };
    init(menu, looper, fullSizeGif);
};
