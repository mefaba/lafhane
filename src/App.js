import React from 'react';
import './App.scss';
import NavbarUnit from './components/NavbarUnit';
import GameTableUnit from './components/GameTable/GameTableUnit';

function App() {
  return (
    <div className="App">
      <NavbarUnit/>
      <GameTableUnit/>
    </div>
  );
}

export default App;
