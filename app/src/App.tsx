import React from 'react';
import logo from './panel.jpg';
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
      </div>
    );
  }
}

export default App;
