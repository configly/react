import React from 'react';
import './App.css';
import {ConfiglyText, ConfiglyDropdown, ConfiglyContext} from 'configly-react';
import ConfiglyComponent from 'configly-react';

function renderCustom(value) {
  console.log(value);
  return(<span>
    <input type="checkbox" checked={value} />
  </span>);
}

function App() {
  return (
    <ConfiglyContext.Provider value={{apiKey: 'Dem0apiKEY'}}>
      <div className="App">
        <header className="App-header">
          <p>This is an example app for configly.</p>
          <p>This is an example of some text that was fetched dynamically by configly: <span className="blue"><ConfiglyText prop="react-text"/></span></p>
          <p>This is an example of a dropdown rendered dynamically by configly: <ConfiglyDropdown prop="react-dropdown" default={{ a: 'b', c: 'd'}}/> </p>
          <p>This is an example of how you can use our component to fetch any arbitrary JSON objects: <ConfiglyComponent prop="react-custom" render={renderCustom} /> </p>
        </header>
      </div>
    </ConfiglyContext.Provider>
  );
}

export default App;
