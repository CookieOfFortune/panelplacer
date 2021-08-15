import React from 'react';
import Position from '../shared/Position';
import $ from 'jquery';
import CSS from 'csstype';

type Props = {
  initialPosition: Position;
};

type State = {
  currentPosition: Position;
  relativePosition: Position;
  dragging: boolean;
};

class Draggable extends React.Component<Props, State> {
  reference: HTMLDivElement | null = null;

  state: State = {
    currentPosition: this.props.initialPosition,
    dragging: false,
    relativePosition: {
      x: 0,
      y: 0,
    }
  }

  componentDidUpdate = (props: Props, state: State) => {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('touchend', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('touchmove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('touchend', this.onMouseUp);
    }
  }

  onMouseDown = (e: MouseEvent | TouchEvent) => {
    if (e instanceof MouseEvent && e.button !== 0) {
      return;
    }

    if (this.reference == null) {
      return;
    }

    const offset = $(this.reference).offset();
    let offsetPosition: Position = {
      x: 0,
      y: 0,
    }
    if (offset) {
      offsetPosition = {
        x: offset.left,
        y: offset.top,
      }
    }
    this.setState({
      dragging: true,
      relativePosition: this.getNewPosition(e, offsetPosition),
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp = (e: MouseEvent | TouchEvent) => {
    this.setState({
      dragging: false,
    });
    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!this.state.dragging) {
      return;
    }

    this.setState({
      currentPosition: this.getNewPosition(e, this.state.relativePosition),
    });

    e.stopPropagation();
    e.preventDefault();
  }

  render = () => {
    const style: CSS.Properties = {
      position: 'absolute',
      left: this.state.currentPosition.x + 'px',
      top: this.state.currentPosition.y + 'px',
    };

    return (<div
      ref={el => this.reference = el}
      style={style}
      onMouseDown={(e) => this.onMouseDown(e.nativeEvent)}
      onTouchStart={(e) => this.onMouseDown(e.nativeEvent)}>
      {this.props.children}
    </div>);
  }

  getNewPosition = (e: MouseEvent | TouchEvent, position: Position): Position => {
    if (e instanceof MouseEvent) {
      const newPosition = {
        x: e.pageX - position.x,
        y: e.pageY - position.y,
      };
      return newPosition;
    }
    if (e instanceof TouchEvent) {
      const newPosition = {
        x: e.touches[0].pageX - position.x,
        y: e.touches[0].pageX - position.y,
      };
      return newPosition;
    }
    return position;
  }
}

export default Draggable;
