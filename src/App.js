// src/App.js
import React from 'react';
import './App.css';
import './tailwind.css';
import GraphComponent from './graph';

function App() {
  return (
    <div className="App">
      <h1>System Entities Relations</h1>
      <GraphComponent />
    </div>
  );
}

export default App;
