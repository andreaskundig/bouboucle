import { Menu, Looper } from '../types';
import "./ModalContent";

const colors: string[][] = [
    ['#ffebee', '#FCE4EC', '#F3E5F5', '#EDE7F6', '#E8EAF6', '#E3F2FD', '#E1F5FE', '#E0F7FA', '#E0F2F1', '#E8F5E9', '#F1F8E9', '#F9FBE7', '#FFFDE7', '#FFF8E1', '#FFF3E0', '#FBE9E7', '#EFEBE9', 'white', /*'#FAFAFA',*/ '#ECEFF1'],
    ['#ffcdd2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8', '#F5F5F5', '#CFD8DC'],
    ['#ef9a9a', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA', '#90CAF9', '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7', '#C5E1A5', '#E6EE9C', '#FFF59D', '#FFE082', '#FFCC80', '#FFAB91', '#BCAAA4', '#EEEEEE', '#B0BEC5'],
    ['#e57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB', '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784', '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F', '#E0E0E0', '#90A4AE'],
    ['#ef5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0', '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A', '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#8D6E63', '#BDBDBD', '#78909C'],
    ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'],
    ['#e53935', '#D81B60', '#8E24AA', '#5E35B1', '#3949AB', '#1E88E5', '#039BE5', '#00ACC1', '#00897B', '#43A047', '#7CB342', '#C0CA33', '#FDD835', '#FFB300', '#FB8C00', '#F4511E', '#6D4C41', '#757575', '#546E7A'],
    ['#d32f2f', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F', '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C', '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00', '#E64A19', '#5D4037', '#616161', '#455A64'],
    ['#c62828', '#AD1457', '#6A1B9A', '#4527A0', '#283593', '#1565C0', '#0277BD', '#00838F', '#00695C', '#2E7D32', '#558B2F', '#9E9D24', '#F9A825', '#FF8F00', '#EF6C00', '#D84315', '#4E342E', '#424242', '#37474F'],
    ['#b71c1c', '#880E4F', '#4A148C', '#311B92', '#1A237E', '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20', '#33691E', '#827717', '#F57F17', '#FF6F00', '#E65100', '#BF360C', '#3E2723', 'black',/*'#212121'*/ '#263238']
];

const CSS = `
color-content {
    background-color: #eeeeee;

    div > div {
        display: inline-block;
        width:5.2632%;
        height: 40px;
    }

    div > div.selected{
        margin:  3.15px 0.29%;
        width: 4.67%;
        height: 34px;
    }
}
`;

class ColorContent extends HTMLElement {
    #looper!: Looper;
    menu?: Menu;
    button?: HTMLElement;
    css = CSS;

    get looper(): Looper{
        return this.#looper;
    }

    set looper(looper:Looper){
        this.#looper = looper;
        this.pickColor(looper.getLineColor());
        this.makeColorMenu();
    }

    pickColor (color: string){
        this.button?.setAttribute("color", color);
        this.menu?.hideSubmenu();
        this.looper?.setLineColor(color);
    };

    makeColorMenu(){
        if(this.firstChild){
            // build html only once
            return;
        }

        let selectedColorDiv: HTMLElement|null = null;
        const initialColor: string|undefined = this.looper?.getLineColor();
        colors.forEach((colLine: string[]) => {
            var lineDiv = document.createElement('div');
            this.appendChild(lineDiv);
            colLine.forEach((color)=>{
                var colorDiv = document.createElement('div');
                colorDiv.style.backgroundColor = color;
                if(color === initialColor){
                    this.pickColor(initialColor);
                    selectedColorDiv = colorDiv;
                    selectedColorDiv.classList.add('selected');
                }
                colorDiv.addEventListener('click', (e)=>{
                    selectedColorDiv?.classList.remove('selected');
                    selectedColorDiv = e.target as HTMLElement;
                    selectedColorDiv.classList.add('selected');
                    this.pickColor(color);
                });
                lineDiv.appendChild(colorDiv);
            });
        });
    }
}

customElements.define("color-content", ColorContent);
