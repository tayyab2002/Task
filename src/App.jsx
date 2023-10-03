import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const handleBox = (boxIndex) => {
    if (!selectedBoxes.includes(boxIndex)) {
      setSelectedBoxes([...selectedBoxes, boxIndex]);
      setTimeout(()=>[
      setSelectedBoxes()
      ],1000)
    }
  };

  useEffect(() => {
    // console.log('Working ');
    if (selectedBoxes.length > 0) {
      const timer = setTimeout(() => {
        const copySelectedBoxes = [...selectedBoxes];
        copySelectedBoxes.forEach((boxIndex) => {
          const updatedBoxes = selectedBoxes.filter((selectedBox) => selectedBox !== boxIndex);
          setSelectedBoxes(updatedBoxes);
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedBoxes]);

  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6].map((boxIndex) => {
        return (
          <div
            key={boxIndex}
            className={`box 
            ${selectedBoxes.includes(boxIndex) ? 'bgc' : ''}`}
            onClick={() => handleBox(boxIndex)}
          >
            Item{boxIndex}
          </div>
        )
      })}
    </div>
  );
};
export default App;
