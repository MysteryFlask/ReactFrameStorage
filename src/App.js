import React, { useState, useEffect } from 'react';
import Iframe from 'react-iframe';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import './style.css';

function App() {
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const storedFrames = JSON.parse(localStorage.getItem('frames')) || [];
    setFrames(storedFrames);
  }, []);

  const addFrame = () => {
    const url = prompt('Enter the URL of the website:');
    if (url) {
      const newFrame = { url };
      setFrames([...frames, newFrame]);
      localStorage.setItem('frames', JSON.stringify([...frames, newFrame]));
    }
  };

  const clearFrames = () => {
    setFrames([]);
    localStorage.removeItem('frames');
  };

  const removeFrame = (frame) => {
	const index = frames.indexOf(frame);
	console.log(index)
	const updatedFrames = [...frames.slice(0, index), ...frames.slice(index + 1)];
	console.log(updatedFrames)
	setFrames(updatedFrames);
	localStorage.setItem('frames', JSON.stringify(updatedFrames));
  };


  return (
    <div>
      <div className="input-container">
        <button onClick={addFrame}>Add Frame</button>
        <button onClick={clearFrames}>Clear Frames</button>
      </div>
      <div className="frame-container">
        {frames.map((frame, index) => (
          <Draggable key={index} handle=".drag-handle">
            <ResizableBox
              defaultSize={{ width: 400, height: 400 }}
              minWidth={100}
              minHeight={100}
              handleStyles={{ bottomLeft: { cursor: 'se-resize' } }}
              handleComponent={{ bottomLeft: <div className="resize-handle" /> }}
            >
              <div className="frame">
                <div className="drag-handle"></div>
                <button className="close-button" onClick={() => removeFrame(frame)}>X</button>
                <Iframe url={frame.url} />
              </div>
            </Resizable>
          </Draggable>
        ))}
      </div>
    </div>
  );
}

export default App;
