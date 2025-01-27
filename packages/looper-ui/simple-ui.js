import { actions } from '@andreaskundig/looper';
import { getAssetString } from './assetsDB.js';




/**
 * generates looper's ui 
 * @param {*} looper - looper instance 
 * @param {boolean} fullSizeGif 
 * @param {*} makeExportAndInfoUi - factory function to build
 *                                  some extra ui bits
 *                                  called with args: menu, looper
 * @param {boolean} newTiming 
 * @param {{width: number, height: number}} dimension 
 * @param {boolean} showGallery - flag controlling gallery display
 */
export default function makeSimpleUi(looper, makeExportAndInfoUi,
                            newTiming, dimension, showGallery, overlayParent = undefined, 
                            looperParent = undefined, theMenu = undefined){



var colors = [
    ['#ffebee', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6', '#E3F2FD', '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9', '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FFF3E0', '#FBE9E7', '#EFEBE9', 'white', /*'#FAFAFA',*/ '#ECEFF1'],
['#ffcdd2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#F5F5F5', '#CFD8DC'],
['#ef9a9a', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7', '#C5E1A5', '#E6EE9C', '#FFF59D', '#FFE082', '#FFCC80', '#FFAB91', '#BCAAA4', '#EEEEEE', '#B0BEC5'],
['#e57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F', '#E0E0E0', '#90A4AE'],
['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'],
['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
['#e53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41', '#757575', '#546E7A'],
['#d32f2f', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C', '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#5D4037', '#616161', '#455A64'],
    ['#c62828', '#AD1457', '#6A1B9A', '#4527A0', '#283593', '#1565C0', '#0277BD', '#00838F', '#00695C', '#2E7D32', '#558B2F', '#9E9D24', '#F9A825', '#FF8F00', '#EF6C00', '#D84315', '#4E342E', '#424242', '#37474F'],
    ['#b71c1c', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C', '#3E2723', 'black',/*'#212121'*/, '#263238']],
    overlayParent = overlayParent || document,
    looperParent = looperParent || document,
    
    initColorButton = function(colorHandler, menu){
        const colorButtonDiv = looperParent.querySelector('#color-button');
        if(!colorButtonDiv){
            return;
        }
        const colorMenuDiv = looperParent.querySelector('#color-submenu');
        const pickColor = function(color){
            colorButtonDiv.style.fill = color;
            colorButtonDiv.style.stroke = color;
            menu.hideSubmenu();
            colorHandler.handle(color);
        };
        menu.initShowSubmenu(colorMenuDiv, colorButtonDiv);
        makeColorMenu(colorMenuDiv, colors, colorHandler.initial, pickColor);
    },
    
    makeColorMenu = function(parentDiv, colors, initialColor, pickColor){
        var selectedColorDiv;
        colors.forEach(function(colLine){
            var lineDiv = document.createElement('div');
            parentDiv.appendChild(lineDiv);
            colLine.forEach(function(color){
                var colorDiv = document.createElement('div');
                colorDiv.style.backgroundColor = color;
                if(color === initialColor){
                    pickColor(initialColor);
                    selectedColorDiv = colorDiv;
                    selectedColorDiv.classList.add('selected');
                }
                colorDiv.addEventListener('click', function(e){
                    selectedColorDiv.classList.remove('selected');
                    selectedColorDiv = e.target;
                    selectedColorDiv.classList.add('selected');
                    pickColor(color);
                });
                lineDiv.appendChild(colorDiv);
            });
        });
    },

    initStrokeButton = function(strokeHandler, menu){
        const strokeButtonDiv = looperParent.querySelector('#stroke-button');
        const strokeMenuDiv = looperParent.querySelector('#stroke-submenu');
        if(!strokeButtonDiv){
            return;
        }
        const strokes =[2, 7, 20, 50, 200, 600].map(function(width, index){
                const assetname = `2_taille_${index + 1}.svg`;
                return {width: width,
                        icon: getAssetString(assetname)};
            });
        const pickStroke = function(stroke){
                strokeButtonDiv.innerHTML = "<img/>";
                strokeButtonDiv.firstChild.src = stroke.icon;
                menu.hideSubmenu();
                strokeHandler.handle(stroke.width);
        };
        menu.initShowSubmenu(strokeMenuDiv, strokeButtonDiv);
        makeStrokeMenu(strokeMenuDiv, strokes,
                       strokeHandler.initial, pickStroke);
    },

    makeStrokeMenu = function(parentDiv, strokes, initialWidth, pickStroke){
        var activeButton;
        strokes.forEach(function(stroke){
            var strokeXButtonDiv = document.createElement('div'),
                strokeXIcon = document.createElement('img');
            strokeXIcon.src = stroke.icon;
            strokeXButtonDiv.appendChild(strokeXIcon);
            if(stroke.width === initialWidth){
                pickStroke(stroke);
                activeButton = strokeXButtonDiv;
                activeButton.classList.add('active');
            }
            strokeXButtonDiv.addEventListener('click', function(e){
                if(activeButton){
                    activeButton.classList.remove('active');
                }
                activeButton = strokeXButtonDiv;
                activeButton.classList.add('active');
                pickStroke(stroke);
            });
            parentDiv.appendChild(strokeXButtonDiv);
        });
    },

    initTimingButton = function(timingHandler, menu,
                                newTimingUi, looper, dimension){
        var timingButtonDiv = looperParent.querySelector('#timing-button'),
            timingMenuDiv = looperParent.querySelector('#timing-submenu'),
            timings =[[0.05,0.5],[0.25,1],[0.5,2],[1,2],[1,4],[2,1]]
                .map(function(t, index){
                    return {lifetime: t[0],
                            beat: t[1], 
                            icon: getAssetString(`3_trait_${index+1}.svg`)};
                }),
            pickTiming = function(timing){
                if(timing.icon){
                    timingButtonDiv.innerHTML = "";
                    const img = document.createElement("img");
                    img.src = timing.icon;
                    timingButtonDiv.appendChild(img);
                }
                menu.hideSubmenu();
                timingHandler.handle(timing);
            };
        menu.initShowSubmenu(timingMenuDiv, timingButtonDiv);
        if(newTimingUi){
            var timingLooper = makeTimingMenu(timingMenuDiv,
                                              timingHandler.initial,
                                              pickTiming, looper, dimension),
                update = function(config){
                    if('speed' in config){
                        timingLooper.setSpeed(config.speed);
                    }
                };
            return update;
            
        }else{
            makeTimingMenu0(timingMenuDiv, timings,
                            timingHandler.initial, pickTiming);
            return function(){};
        }
    },

    
    makeTimingMenu = function(parentDiv, initialT, pickTiming,
                              looper, dimension){
        var activeDisplay,
            timingLooper,
            canvasParent = document.createElement('div'),
            canvas = document.createElement('canvas'),
            buttonTable = document.createElement('table'),
            displayTable, 
            findDisplay = function(buttonTd){
                return displayTable.querySelector('tr>td.'+buttonTd.className);
            },
            beats = [6, 3, 2, 1, 1/2],
            lifetimes = [0.05, 0.1, 0.25, 0.50, 1, 2],
            timings = beats.map(function(beat){
                return lifetimes.map(function(lifetime){
                    return {lifetime: lifetime * 1000, beat: beat * 1000};
                });
            });
        window.dt = displayTable;
        canvasParent.appendChild(canvas);
        canvasParent.style.position = 'absolute';
        buttonTable.style.position = 'absolute';
        buttonTable.style.borderCollapse = 'collapse';
        buttonTable.style.height = dimension.height + "px";
        buttonTable.style.width = dimension.width + "px";
        displayTable = buttonTable.cloneNode();
        displayTable.style.backgroundColor = 'white';
        parentDiv.appendChild(displayTable);
        parentDiv.appendChild(canvasParent);
        parentDiv.appendChild(buttonTable);
        timingLooper = looper.makeTimingDemo(canvas,
                                             timings, dimension);
        timings.forEach(function(beats, beatIndex){
            var buttonRow = document.createElement('tr');
            buttonTable.appendChild(buttonRow);
            var displayRow = document.createElement('tr');
            displayTable.appendChild(displayRow);
            beats.forEach(function(timing, timingIndex){
                var buttonTd = document.createElement('td');
                buttonTd.classList.add('b'+beatIndex+'l'+timingIndex);
                var displayTd = buttonTd.cloneNode();
                displayTd.style.border = 'solid #dddddd 1px';
                if(timing.lifetime === (initialT.lifetime) * 1000 &&
                   timing.beat === (initialT.beat * 1000) )
                {
                    pickTiming({lifetime: timing.lifetime/1000,
                                beat: timing.beat/1000});
                    activeDisplay = displayTd;
                    activeDisplay.classList.add('active');
                }
                buttonTd.addEventListener('click', function(e){
                    if(activeDisplay){
                        activeDisplay.classList.remove('active');
                    }
                    activeDisplay = findDisplay(buttonTd);
                    activeDisplay.classList.add('active');
                    pickTiming({lifetime: timing.lifetime/1000,
                                beat: timing.beat/1000});
                });
                buttonRow.appendChild(buttonTd);
                displayRow.appendChild(displayTd);
            });
        });
        return timingLooper;
    },
    
    makeTimingMenu0 = function(parentDiv, timings, initialT, pickTiming){
        var activeButton;
        timings.forEach(function(timing, timingIndex){
            var timingXButtonDiv = document.createElement('div'),
                timingXIcon = document.createElement('img');
            timingXIcon.src = timing.icon;
            timingXButtonDiv.classList.add('old');
            timingXButtonDiv.appendChild(timingXIcon);
            if(timing.lifetime === initialT.lifetime &&
               timing.beat === initialT.beat )
            {
                pickTiming(timing);
                activeButton = timingXButtonDiv;
                activeButton.classList.add('active');
            }
            timingXButtonDiv.addEventListener('click', function(e){
                if(activeButton){
                    activeButton.classList.remove('active');
                }
                activeButton = timingXButtonDiv;
                activeButton.classList.add('active');
                pickTiming(timing);
            });
            parentDiv.appendChild(timingXButtonDiv);
        });
    },
    initSpeedButtons = function(setSpeed, menu){
        var pauseButtonDiv = looperParent.querySelector('#pause-button'),
            rewindButtonDiv = looperParent.querySelector('#rewind-button'),
            forwardButtonDiv = looperParent.querySelector('#forward-button'),
            allButtons = [pauseButtonDiv, rewindButtonDiv, forwardButtonDiv],
            icons = ['6_play.svg', '6_pause.svg'],
            speed = 1,
            determineActiveButton = function(speed){
                if(speed === 0 || speed === 1){
                    return null;
                }else if(speed > 1){
                    return forwardButtonDiv;
                }else{
                    return rewindButtonDiv;
                }
            },
            set = function(s){
                speed = s;
                setSpeed(s);
                var buttonIndex = speed ? 1 : 0,
                    activeButton = determineActiveButton(s);
                const encodedIcon = getAssetString(icons[buttonIndex]);
                // note: we must clear the div to allow new src to be set
                pauseButtonDiv.innerHTML = "<img/>";
                pauseButtonDiv.firstChild.src = encodedIcon;
                allButtons.filter(b => !!b).forEach(function(button){
                    if(button === activeButton){
                        button.classList.add('active');
                    }else{
                        button.classList.remove('active');
                    }
                });
                menu.hideSubmenu();
            },
            incr = function(direction){
                var increase = speed === 0;
                increase = increase || Math.sign(speed)==Math.sign(direction); 
                var delta;
                if(Math.abs(speed) <= 0.125){
                    delta = direction * 0.125; //slomo
                }else{
                    delta = increase ? speed : speed * -0.5 ;
                }
                set(speed + delta); 
            },
            togglePause = function(){
                speed = speed ? 0 : 1;
                set(speed);
            };
        setSpeed(speed);
        pauseButtonDiv.addEventListener('click', togglePause);
        if(rewindButtonDiv){
            rewindButtonDiv.addEventListener('click', function(){incr(-1);});
        }
        if(forwardButtonDiv){
            forwardButtonDiv.addEventListener('click', function(){incr(1);});
        }
    },

    initControlButtons = function(controls, menu){
        var clearButtonDiv = looperParent.querySelector('#clear-button'),
            undoButtonDiv = looperParent.querySelector('#undo-button'),
            redoButtonDiv = looperParent.querySelector('#redo-button'),
            exportButtonDiv = looperParent.querySelector('#export-button');
        clearButtonDiv.addEventListener('click', function(){
            menu.hideSubmenu();
            controls.clear();
        });
        undoButtonDiv.addEventListener('click', function(){
            menu.hideSubmenu();
            controls.undo();
        });
        redoButtonDiv.addEventListener('click', function(){
            menu.hideSubmenu();
            controls.redo();
        });
    },

    showDialog = function (contentDiv){
        var dialogMenuDiv = looperParent.querySelector('#dialog-submenu');
        if(dialogMenuDiv.firstChild){
            dialogMenuDiv.removeChild(dialogMenuDiv.firstChild);
        }
        dialogMenuDiv.appendChild(contentDiv);
    },
    
    initDialogButton = function(menu, dialogButtonId, content){
        var dialogMenuDiv = looperParent.querySelector('#dialog-submenu'),
            dialogButtonDiv = document.getElementById(dialogButtonId),
            contentDiv = document.createElement('div'),
            beforeShow = function(){ showDialog(contentDiv); };
            contentDiv.innerHTML = content;
        menu.initShowSubmenu(dialogMenuDiv, dialogButtonDiv, beforeShow);
    },
    
    init = function(looper){
        var menu = theMenu || makeMenu(overlayParent);
        initColorButton({initial: looper.getLineColor(), 
                         handle: function(c){ looper.setLineColor(c); }},
                         menu);
        initStrokeButton({initial: looper.getStrokeWidth(),
                          handle: function(w){ looper.setStrokeWidth(w); }},
                          menu);

        var updateTiming = initTimingButton(
            {initial: {lifetime: 0.5, beat:2},
             makeTimingDemo: looper.makeTimingDemo,
             handle: function(t){
                 looper.setLifetime(t.lifetime * 1000);
                 looper.setBeat(t.beat * 1000);}},
            menu,
            newTiming, looper, dimension);
        
        initControlButtons({clear: looper.clear,
                            undo: actions.undo,
                            redo: actions.redo
                           }, menu);
        var setSpeed = function(speed){
            looper.setSpeed(speed);
            updateTiming({speed: speed});
        };
        initSpeedButtons(setSpeed, menu);
        const cssList = makeExportAndInfoUi && makeExportAndInfoUi({menu, looper, overlayParent, looperParent});

        const galleryButton = document.getElementById('gallery-button');
        if(showGallery){
            galleryButton?.classList.remove('hidden');
            console.log(galleryButton?.parentNode);
        }else{
            galleryButton?.classList.add('hidden');
        }
        return cssList;
    };
    return init(looper);
};

export function makeMenu(overlayParent) {

    var selectedSubmenuDiv = null,
        overlayDiv = overlayParent.querySelector('#overlay'),
        activeMenuButton,
        showSubmenu = function(submenuDiv, button){
            hideSubmenu();
            activeMenuButton = button;
            activeMenuButton.classList.add('active');
            overlayDiv.classList.remove('hidden');
            selectedSubmenuDiv = submenuDiv;
            selectedSubmenuDiv.classList.remove('hidden');
        },
        hideSubmenu = function(){
            overlayDiv.classList.add('hidden');
            if(activeMenuButton){
                activeMenuButton.classList.remove('active');
            }
            if(selectedSubmenuDiv){
                selectedSubmenuDiv.classList.add('hidden');
                selectedSubmenuDiv = null;
            }
        },
        isSubmenuShown = function(submenuDiv){
            return selectedSubmenuDiv === submenuDiv;
        },
        initShowSubmenu = function(menuDiv, buttonDiv, beforeShow){
            var showThisSubmenu = function(){
                if(isSubmenuShown(menuDiv)){
                    hideSubmenu();
                }else{
                    if(beforeShow){
                        beforeShow();
                    }
                    showSubmenu(menuDiv, buttonDiv);
                }
            };
            menuDiv.classList.add('hidden');
            // menuDiv.addEventListener('click', hideSubmenu);
            buttonDiv?.addEventListener('click', showThisSubmenu);
            return showThisSubmenu;
        };
    overlayDiv.addEventListener('click', hideSubmenu);
    return {initShowSubmenu: initShowSubmenu,
            hideSubmenu: hideSubmenu};
};