const sliderCSS = `
/* http://danielstern.ca/range.css/# */

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  background-color: rgba(0,0,0,0);
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #000000;
  border-radius: 0px;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  border: 2px solid #000000;
  height: 15px;
  width: 15px;
  border-radius: 19px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #0d0d0d;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #000000;
  border-radius: 0px;
  border: 0px solid rgba(0, 0, 0, 0);
}
input[type=range]::-moz-range-thumb {
  border: 2px solid #000000;
  height: 15px;
  width: 15px;
  border-radius: 19px;
  background: #ffffff;
  cursor: pointer;
}
`;

export default sliderCSS;
