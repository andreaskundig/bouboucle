const simpleCSS = `
:root {
  --font-family: Arial, Helvetica, sans-serif;
  --font-size: 21px;
}

html {
    font-family: var(--font-family);
    font-size: var(--font-size);
    box-sizing: border-box;
}

.hidden { display: none !important;}
.menu > div, #stroke-submenu > div, #timing-submenu > div {
    margin: 0;
    display: inline-block;
}
.menu > div:active, #stroke-submenu > div:active, #timing-submenu > div:active {
    background-color: #bbbbbb;
}

.menu {
    display:flex;
    width: 100%;
    background-color: white;
    height: 80px;
    > * {
        flex:1;
    }
}

#stroke-submenu > div, #timing-submenu > div.old {
    width: 16.66666%; /* 6 buttons */
}

.menu > div > img,
.menu svg,
.menu > div > div,
#color-button > svg,
#stroke-submenu > div > img,
#timing-submenu > div > img
 {
    width: 100%;
    height: 39px;
}
.menu > .looper-menu-button {
    border-bottom: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: center;
}
.active {
    background-color:#dddddd;
}
#overlay{
    position: absolute;
    top: 80px;
    bottom: 0;
    width: 100%;
    z-index: 99;
    background-color: rgba(255,255,255,0.7);
}
.submenu{
    position: absolute;
    width: 100%;
    top: 80px;
    z-index: 100;
    background-color: white;
}
#color-submenu {
    background-color: #eeeeee;
}
#color-submenu > div {
    height: 40px;
}
#color-submenu > div > div{
    display: inline-block;
    width:5.2632%;
    height: 40px;
}
#color-submenu > div > div.selected{
    box-sizing: border-box;
    border-style: solid;
    border-width: 3.15px 0.29%;
    border-color: white;
}

#export-submenu > div {
    margin-bottom: 40px;
    
}

.dialog-buttons > div{
    display: inline-block;
    margin: 0 50px;
}
.dialog-buttons > div:active{
    background-color: #bbbbbb;
}

#canvas-parent{
    position:absolute;
    width:100%;
    top:80px;
    bottom: 0;
    background-color:#dddddd;
}
#canvas-parent > canvas{
    cursor: crosshair;
    display:block;
    margin: auto;
}

`;

export default simpleCSS;
