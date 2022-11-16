import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import BouboucleRunner from './BouboucleRunner';

const animData =
{
  "width": 1024,
  "height": 1286.33,
  "speed": 1,
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
  "backgroundColor": "rgb(0,0,0)"
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <BouboucleRunner animData={animData} />
    </div>
  )
}

export default App
