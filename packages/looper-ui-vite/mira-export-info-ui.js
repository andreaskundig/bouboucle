import { getAssetString, injectCSS } from '@andreaskundig/looper-ui';
export default function makeExportAndInfoUi(menu, looper, io, fullSizeGif){

    const gas = getAssetString;
    const download_10 = gas('10_download.svg');
    const erase_4 = gas('4_erase.svg');
    const done_8 = gas('8_done.svg');

    const infoContent = `
    <div class="infobox">
        <div class="instructions">
            <div class="instructions__row">
                <img src="${gas('1_couleur+2_taille_5.svg')}"
                     class="instructions__icon">
                <div class="instructions__text">
                Choisis ta couleur</div>
            </div>
            <div class="instructions__row">
                <img src="${gas('2_taille_3.svg')}" alt=""
                     class="instructions__icon">
                <div class="instructions__text">
                Fixe l'épaisseur de ton trait</div>
            </div>
            <div class="instructions__row">
                <img src="${gas('3_trait_3.svg')}" alt=""
                     class="instructions__icon">
                <div class="instructions__text">
                Définis la fréquence / durée de vie de la ligne</div>
            </div>
            <div class="instructions__row">
                <img src="${gas('8_done.svg')}" alt=""
                     class="instructions__icon">
                <div class="instructions__text">
                Quand tu as terminé, télécharge ton animation</div>
            </div>
         </div>
         <div>
            <p class="text__paragraph">
               Voyez des exemples d'animations dans la
               <a class="text__link"
                  href="https://www.bouboucle.com/gallery.html">galerie</a>
               et le
               <a class="text__link" target="_blank"
                  href="https://blog.bouboucle.com">blog</a>.</p>
            <p class="text__paragraph">
               Bouboucle est un projet d'Andréas Kündig, Ivan Gulizia,
               et maintenant aussi David Hodgetts.</p>
            <p class="text__paragraph">
               Ça fait plus de 15 ans qu'<a
               href="http://www.andreaskundig.ch" target="_blank"
               class="text__link">Andréas</a>
               a la flemme de mettre à jour son site, mais ceux d'<a
               href="https://www.ivangulizia.com/" target="_blank"
               class="text__link">Ivan</a>
               et
               <a href="https://davidhodgetts.ch" target="_blank"
                  class="text__link">David</a>
               sont impeccables.</p>
         </div>
     </div>
    `;

    const exportContent = `
         <div class="export-1 infobox infobox_centered">
           <div class="no-gist export-dialog__row">
             <p>Veux-tu générer un gif?</p>
           </div>
           <div class="gist no-gist export-dialog__row">
            <div id="export-cancel-button" class="export-dialog__button">
                <img src="${erase_4}">
            </div>
            <div id="export-ok-button" class="export-dialog__button">
                 <img src="${done_8}"></div>
           </div>
         </div>
         <div class="export-2 infobox infobox_centered">
           <div class="no-gist export-dialog__row">
             <p>Un instant</p>
           </div>
          <div id="gif-progress-bar"
               class="gist no-gist export-dialog__row export-dialog__progbar"><div></div></div></div>
         <div class="export-3 infobox infobox_centered" >
           <div class="no-gist export-dialog__row ">
             <p class="export-dialog__text">Voilà</p>
           </div>
           <div class="gist no-gist export-dialog__row">
             <div><img id="gif" class="export-dialog__gif"></img></div>
             <div class="export-dialog__button">
               <a download="bouboucle.gif" id="gif-download">
                     <img src="${download_10}">
               </a>
             </div>
           </div>
         </div>
`;

    const infoExportCSS = `
    #info-submenu {
        height: auto;
        bottom: 0;
        overflow-y: scroll;
    }
    .infobox {
        position: relative;
        margin: 0 auto;
        max-width: 600px;
        color: black;
        font-family: var(--font-family);
        /*  remove calc when we're no longer using
            the other font-size declaration
            and we can add 2px to --font-size itself
        font-size: calc(2px + var(--font-size));
        font-weight: bold;
        */
        font-size: var(--font-size);
    }
    .infobox_centered {
        text-align: center;
    }
    .export-dialog__row {
        margin-top: 20px;
        line-height: normal;
    }
    .export-dialog__text {
        margin-top: 30px;
    }
    .export-dialog__button {
        display: inline-block;
        margin-left: 50px ;
        margin-right: 50px ;
    }
    .export-dialog__button:active{
        background-color: #bbbbbb;
    }
    .export-dialog__progbar{
        width: 500px;
        background-color: darkGrey;
        margin-right:  auto;
        margin-left:  auto;
    }
    .export-dialog__progbar > div{
        height: 10px;
        background-color: darkCyan;
    }
    .export-dialog__gif {
        border: 1px solid #dddddd;
    }
    .text__paragraph{
        line-height: 130%;
        margin: 6px;
    }
    .text__link {
        color: rgb(77, 208, 225);
        text-decoration: none;
    }
    .instructions{
        padding-top: 20px;
        padding-bottom: 20px;
        display: flex;
        flex-direction: column;
        row-gap: 20px;
    }
    .instructions__row{
        display: flex;
        line-height: normal;
    }
    .instructions__icon {
        width: 27px;
    }
    .instructions__text {
        padding: 2px 0 0 20px;
    }
        `;

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

        const showExportSubmenu = menu.initShowSubmenu(exportMenuDiv,
                                                       exportButtonDiv,
                                                       beforeShow);
        return showExportSubmenu;
    };

    const initInfoButton = function (menu) {
        const infoButtonDiv = document.querySelector('#info-button'),
            infoMenuDiv = document.querySelector('#info-submenu');
        infoMenuDiv.innerHTML = infoContent;
        infoMenuDiv.addEventListener('click', function () {
            menu.hideSubmenu();
        });
        const showInfoSubmenu =
              menu.initShowSubmenu(infoMenuDiv, infoButtonDiv);
        return showInfoSubmenu;
    };

    const init = function (menu, looper, fullSizeGif) {
        injectCSS(infoExportCSS);
        const showExportSubmenu = initExportButton(looper, menu,
                                                   fullSizeGif);
        const showInfoSubmenu = initInfoButton(menu);
    };
    init(menu, looper, fullSizeGif);
};
