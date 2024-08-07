import { getAssetString } from "./assetsDB.js";
import { injectCSS } from './setup.js'
import { io } from '@andreaskundig/looper';

export default function makeExportAndInfoUi({menu, looper, fullSizeGif, overlayParent, looperParent}){

    const download_10 = getAssetString('10_download.svg');
    const erase_4 = getAssetString('4_erase.svg');
    const done_8 = getAssetString('8_done.svg');

    const infoContent = `
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
         </div>'
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
#gif-progress-bar{
    width: 500px;
    background-color: darkGrey;
    margin: 0 auto;
}
#gif-progress-bar > div{
    height: 10px;
    background-color: darkCyan;
}
#gif {
  border: 1px solid #dddddd;
}
#export-3 > div{
    text-align: center; /* WTF */
}
        `;

    const exportContent = [
            // ' <div class="export-0 gist info">',
            // '   <div class="info-fr">',
            // "     <p>Un instant, j'enregistre l'animation.</p>",
            // '   </div>',
            // ' </div>',
            ' <div class="export-1 info">',
            '   <div class="info-fr gist">',
            "     <p>L'animation est enregistrée ",
            '        <a class="gist-link link" target="_blank">ici</a>.</p>',
            '     <p>Veux-tu aussi générer un gif?</p>',
            '   </div>',
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
            '   <div class="info-fr gist">',
            "     <p>L'animation est enregistrée ",
            '        <a class="gist-link link" target="_blank">ici</a>.</p>',
            '     <p>Un instant, je génère le gif.</p>',
            '   </div>',
            '   <div class="info-fr no-gist">',
            '     <p>Un instant</p>',
            '   </div>',
            '  <div id="gif-progress-bar" class="gist no-gist"><div></div></div></div>',
            ' <div class="export-3 info" >',
            '   <div class="info-fr gist">',
            "     <p>L'animation est ",
            '        <a class="gist-link link" target="_blank">ici</a>.',
            '     Le gif est là:</p> ',
            '   </div>',
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

        const showElements = function(parentSelector, showClass){
            overlayParent.querySelector(parentSelector)
                .childNodes
                .forEach(function(e){
                    if(! e.classList){ return; }
                    var hasClass = e.classList.contains(showClass);
                    e.classList[hasClass ? 'remove': 'add']('hidden');
                });
        };
        
        const requestAnimationFramePromise = function(){
            return new Promise(function(resolve, reject){
                requestAnimationFrame(resolve);
            });
        };
        
        const displayRecording = function(record, fullSizeGif){
            var progBar = overlayParent.querySelector('#gif-progress-bar'),
                progIndex = progBar.firstChild,
                progressCallback = function(prog){
                    var width = Math.abs(500*(0.1+prog*0.9));
                    progIndex.style.width = width +'px';
                };
            console.log('start recording');
            progIndex.style.width = Math.abs(500*0.1) +'px';
            return requestAnimationFramePromise().then(function(){
                return record({progress: progressCallback,
                               fullSize: fullSizeGif});
            }).then(
                function(imgSrc){
                    var download = overlayParent.querySelector('#gif-download'),
                        gif = overlayParent.querySelector('#gif'),
                        //         window - buttons - .info padding
                        maxHeight = window.innerHeight  - 79.67 - 40;
                    //    - text height - .info>div margin - icon height
                    maxHeight = maxHeight - 27.3 - 3 * 40 - 113;
                    download.href = imgSrc;
                    //available height: innerHeight - 113 
                    gif.src = imgSrc;
                    gif.style.maxHeight = maxHeight + 'px';
                    
                },
                function(o){
                    console.error(o.error,o);
                }
            );
        };

        const initExportButton = function(looper, menu){
            var exportButtonDiv = looperParent.querySelector('#export-button'),
                exportMenuSelector = '#export-submenu',
                exportMenuDiv = overlayParent.querySelector(exportMenuSelector);
            exportMenuDiv.innerHTML = exportContent;
            var gistLinks = exportMenuDiv.querySelectorAll('.gist-link'),
                exportCancelBtnDiv = overlayParent.querySelector(
                    '#export-cancel-button'),
                exportOkBtnDiv = overlayParent.querySelector('#export-ok-button'),
                gistId = false,
                beforeShow = function(){
                    showElements(exportMenuSelector, 'export-0');
                    io.gists.save(looper.exportData)
                        .then(function(id){
                            if(!id){
                                menu.hideSubmenu();
                                return;   
                            }
                            showElements('.export-1', 'gist');
                            gistLinks.forEach(function(gistLink){
                                gistLink.href = 'http://www.bouboucle.com?gist='+id;
                            });
                            gistId = id;
                        },function(err){
                            console.error('could not save gist', err);
                            showElements('.export-1', 'no-gist');
                        })
                        .then(function (){
                            showElements(exportMenuSelector, 'export-1');
                        });
                };
            exportCancelBtnDiv.addEventListener('click', function(){
                menu.hideSubmenu();
            });
            exportOkBtnDiv.addEventListener('click', function(){
                showElements('.export-2', gistId ? 'gist' : 'no-gist');
                showElements(exportMenuSelector, 'export-2');
                displayRecording(looper.record, fullSizeGif)
                    .then(function(){
                        showElements('.export-3', gistId ? 'gist' : 'no-gist');
                        showElements(exportMenuSelector, 'export-3');
                    });
            });
            menu.initShowSubmenu(exportMenuDiv, exportButtonDiv, beforeShow);
        };
        
        const initInfoButton = function(menu){
            var infoButtonDiv = looperParent.querySelector('#info-button'),
                infoMenuDiv = looperParent.querySelector('#info-submenu');
            infoMenuDiv.innerHTML = infoContent;
            infoMenuDiv.addEventListener('click', function(){
                menu.hideSubmenu();
            });
            menu.initShowSubmenu(infoMenuDiv, infoButtonDiv);
        };

        const init = function(menu, looper, fullSizeGif){
            initExportButton(looper, menu, fullSizeGif);
            initInfoButton(menu);
        };
    init(menu, looper, fullSizeGif);
    return [infoCSS];
};
