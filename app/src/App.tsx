import React from 'react';
import logo from './panel.jpg';
import './App.css';
import Draggable from './components/Draggable';

const BG_WIDTH_INCH = 102.7;
const PANEL_HEIGHT_INCH = 36;

interface Size {
  width: number | undefined;
  height: number | undefined;
}

function App() {
  const size: Size = useWindowSize();

  let height = 0;
  if (size.width != null) {
    height = (size.width / BG_WIDTH_INCH) * PANEL_HEIGHT_INCH;
  }

  let widthOffset = 100;
  if (size.width != null) {
    widthOffset = size.width / 4;
  }

  const panels = [1, 2, 3, 4].map(i => {
    return (
      <Draggable key={i} initialPosition={{ x: widthOffset * i, y: height }}>
        <img src={logo} alt={"panel" + i} height={height + "px"} />
      </Draggable>);
  });

  return (
    <div className="App">
      {panels}
    </div>
  );
}

function useWindowSize(): Size {

  const [windowSize, setWindowSize] = React.useState<Size>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default App;
