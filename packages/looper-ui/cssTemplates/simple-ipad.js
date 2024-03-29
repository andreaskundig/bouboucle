const simpleIpadCSS = `

@media all and (device-width: 1024px) and (orientation:landscape) {
/* for some reason this does not work
@media all and (device-height: 768px) and (device-width: 1024px) and (orientation:landscape) { */
    .menu > div {
        width: 114px; /*(/ 1024 9.0) 113.777*/
    }
    .menu > div:last-child {
        width:  112px; /* (- 1024 (* 8  114)) */
    }
    #color-submenu > div > div{
        /* width:54px; /\* (/ 1024 19.0) 53.89 *\/ */
        width:56px; 
        margin:-1px
    }
    #color-submenu > div > div:last-child{
        /* width:52px; /\* (- 1024 (* 18 54)) 70  *\/ */
        width:54px; 
    }
    #color-submenu > div > div.selected{
        box-sizing: border-box;
        border-style: solid;
        border-width: 3px;
        border-color: white;
    }
    #color-submenu > div > div.selected:last-child{
        width: 46px; /* (* .0467 1024) 47.82 */
    }
    #canvas-parent > canvas{
        height: 688px; /* (- 768 80) */
        width: 100%;
        background-color:blue;
    }
}
`;

export default simpleIpadCSS;
