import React from 'react';
import logo from './logo.svg';
import './App.css';
import Draggable from './components/Draggable';

type Props = {

};

type State = {

};

class App extends React.Component<Props, State> {
  state: State = {};

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Draggable initialPosition={{x: 100, y: 100}}>
            <img src={logo} className="App-logo" alt="logo" />
          </Draggable>
          <Draggable initialPosition={{x: 200, y: 200}}>
            <img src={logo} className="App-logo" alt="logo" />
          </Draggable>
          <Draggable initialPosition={{x: 300, y: 300}}>
            <img src={logo} className="App-logo" alt="logo" />
          </Draggable>
          <Draggable initialPosition={{x: 400, y: 400}}>
            <img src={logo} className="App-logo" alt="logo" />
          </Draggable>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
