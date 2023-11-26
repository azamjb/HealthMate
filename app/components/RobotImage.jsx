import React, { useState } from 'react';

const RobotImage = ({ typedText }) => {
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 400, y: 400 });

  const handleDragStart = (e) => {
    setDragging(true);
    // Record the initial mouse position
    setPosition({
      ...position,
      diffX: e.screenX - position.x,
      diffY: e.screenY - position.y,
    });
  };

  const handleDragging = (e) => {
    if (dragging) {
      // Update the position as the mouse moves
      setPosition({
        ...position,
        x: e.screenX - position.diffX,
        y: e.screenY - position.diffY,
      });
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  const modalStyle = {
    position: 'fixed',
    left: `${position.x}px`,
    top: `${position.y}px`,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 245, 207, 255)',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '200px',
    textAlign: 'center',
    cursor: 'move',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    margin: '0 auto',
  };

  return (
    <div
      style={modalStyle}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragging}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      <img src="/ergobot.png" alt="Popup Image" style={imageStyle} />
      <p style={{ color: 'black', fontWeight: 'bold', marginTop: '10px' }}>
        {typedText}
      </p>
    </div>
  );
};

export default RobotImage;
