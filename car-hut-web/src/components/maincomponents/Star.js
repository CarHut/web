import React, { useEffect, useState } from 'react';
import '../../css/maincomponents/Star.css';

const Star = ({ width = 50, height = 50, color = 'gold', rotation = 0, onClickHandler, hoverState = false }) => {

  const [currentWidth, setCurrentWidth] = useState(0);
  const [currentHeight, setCurrentHeight] = useState(0);

  const handleResize = () => {
      if (window.innerWidth <= 600) {
          setCurrentWidth(width.smallSize);
          setCurrentHeight(height.smallSize);
      } else if (window.innerWidth <= 1350) {
          setCurrentWidth(width.mediumSize);
          setCurrentHeight(height.mediumSize);
      } else {
          setCurrentWidth(width.standardSize);
          setCurrentHeight(height.standardSize);
      }
  }

  useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => {
          window.removeEventListener('resize', handleResize);
      }
  }, []);

  const points = [
    { x: 50, y: 0 },
    { x: 61, y: 35 },
    { x: 98, y: 35 },
    { x: 68, y: 57 },
    { x: 79, y: 91 },
    { x: 50, y: 70 },
    { x: 21, y: 91 },
    { x: 32, y: 57 },
    { x: 2, y: 35 },
    { x: 39, y: 35 },
  ]
    .map(point => `${point.x},${point.y}`)
    .join(' ');

  return (
    <div className="star-container-object" onClick={onClickHandler} style={hoverState ? {cursor: "pointer"} : {cursor: "default"}}>
      <svg
        className="star-object"
        width={currentWidth}
        height={currentHeight}
        viewBox="0 0 100 100"
        style={{ transform: `rotate(${rotation}deg)`, display: 'block' }}
      >
        <polygon points={points} fill={color} />
      </svg>
    </div>
  );
};

export default Star;