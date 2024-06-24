import '../../css/maincomponents/Star.css';

function Star({ width, height, color, rotation, onClickHandler }) {
  const starStyle = {
    position: 'relative',
    display: 'block',
    width: 0,
    height: 0,
    borderRight: `${width / 2}vw solid transparent`,
    borderBottom: `${height / 2}vh solid ${color}`,
    borderLeft: `${width / 2}vw solid transparent`,
    transform: `rotate(${rotation}deg)`,
  };

  const beforeStyle = {
    borderBottom: `${height / 2}vh solid ${color}`,
    borderLeft: `${width / 6.5}vw solid transparent`,
    borderRight: `${width / 6.5}vw solid transparent`,
    position: 'absolute',
    height: 0,
    width: 0,
    top: `-${height / 1.4}vh`,
    left: `-${width / 2.1}vw`,
    display: 'block',
    content: '""',
    transform: `rotate(-${rotation * 2}deg)`,
  };

  const afterStyle = {
    position: 'absolute',
    display: 'block',
    top: `${height / 8}vh`,
    left: `-${width / 2}vw`,
    width: 0,
    height: 0,
    borderRight: `${width / 2}vw solid transparent`,
    borderBottom: `${height / 2}vh solid ${color}`,
    borderLeft: `${width / 2}vw solid transparent`,
    transform: `rotate(-${rotation * 2}deg)`,
    content: '""',
  };

  return (
    <div className="star-container" onClick={onClickHandler}>
      <div className="star" style={starStyle}>
        <div style={beforeStyle}></div>
        <div style={afterStyle}></div>
      </div>
    </div>
  );
}

export default Star;