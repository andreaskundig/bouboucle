import paper from 'paper';
import { makeLooper } from '@andreaskundig/looper';

const foregroundImage =
      document.getElementById('bouboucle-foreground-image');
const scale = 500 /foregroundImage.naturalHeight
const animData =
{
  "width": foregroundImage.naturalWidth * scale,
  "height": foregroundImage.naturalHeight * scale,
  "speed": 0.5,
  "lineData": [{
      "start": 1536824533767,
      "last": 2136,
      "beat": 500,
      "lifetime": 250,
      "color": "#E91E63",
      "multiPeriod": 1,
      "strokeWidth": 20,
      "times": [0, 119, 140],
      "segments": [[283, 126], [283, 133], [283, 139]
      ]}
  ],
  "backgroundColor": "rgb(200,255,200)"
};
const canvas = document.getElementById('bouboucle-canvas');
const graphics = { canvas, paper };
const looper = makeLooper(
  { graphics,
    foregroundImage});
looper.importData(animData);
looper.setLineColor('red')
looper.start();
