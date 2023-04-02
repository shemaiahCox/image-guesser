import { useState, useEffect, useRef } from "react";

import Tile from "./components/Tile";

// TODOS
  // Add more images 

function App() {
  const [seconds, setSeconds] = useState(15)
  const [state, setState] = useState('start')
  let intervalIdRef = useRef()

  useEffect(() => {
    if (state === 'countdown' && seconds > 0) {
      intervalIdRef.current = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
    } else if (seconds === 0) {
      setState('reveal')
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  })

  function handleTileClick(e) {
    e.target.style.backgroundColor = 'transparent';
    e.target.style.border = 'none';
    e.target.style.backgroundImage = 'none';
  }

  function handleStartClick() {
    setState('countdown');
  }

  function handleRevealClick() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
      tile.style.backgroundColor = 'transparent';
      tile.style.border = 'none';
      tile.style.backgroundImage = 'none';
    });
  }

  // Creates tiles
  let tiles = []
  for (let i = 0; i < 101; i++) {
    tiles.push(<Tile key={i} handleTileClick={handleTileClick}/>)
  }

  return (
    <div className="App">
      {
        state === 'start' ?
        <div className="start-intro">
          <h1>Guess the image in 15 seconds</h1>
          <button className="start-button" onClick={handleStartClick}>Start</button>
        </div>
        : state === 'countdown' ?
          <h1 className="seconds">{seconds}s</h1>
        : state === 'reveal' ?
        <div className="reveal">
          <h1>Times up!</h1>
          <button className="reveal-button" onClick={handleRevealClick}>Reveal</button>
        </div>
        : null
      }
      
      <div className="image-container"></div>
      <div className="tile-container">
        {tiles}
      </div>
    </div>
  );
}

export default App;
