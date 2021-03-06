import React from 'react';
import logo from './panel.jpg';
import './App.css';
import Draggable from './components/Draggable';

const BG_WIDTH_INCH = 102.7;
const BG_HEIGHT_INCH = 77;
const PANEL_HEIGHT_INCH = 36;

interface Size {
  width: number | undefined;
  height: number | undefined;
}

function App() {
  const size: Size = useWindowSize();

  let height = 0;
  if (size.width != null && size.height != null) {
    const panelHeightFromWidth = (size.width / BG_WIDTH_INCH) * PANEL_HEIGHT_INCH;
    const pnaleHeightFromHeight = (size.height / BG_HEIGHT_INCH) * PANEL_HEIGHT_INCH;
    if (panelHeightFromWidth < pnaleHeightFromHeight) {
      height = panelHeightFromWidth;
    } else {
      height = pnaleHeightFromHeight;
    }
  }

  const panels = [1, 2, 3, 4].map(i => {
    return (
      <Draggable key={i} initialPosition={{ x: 0, y: height }}>
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
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default App;
