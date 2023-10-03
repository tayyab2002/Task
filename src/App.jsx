import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [clickedOrder, setClickedOrder] = useState([]); //add sequence here like [3,2,4,5,1,6] 
  const [timeoutId, setTimeoutId] = useState(null);

  const handleBox = (boxIndex) => {
    clearTimeout(timeoutId); // Clear the previous timeout
    const updatedSelectedBoxes = [...selectedBoxes, boxIndex];
    setSelectedBoxes(updatedSelectedBoxes);
    setClickedOrder([...clickedOrder, boxIndex]);

    const newTimeoutId = setTimeout(() => {
      setSelectedBoxes([]);
      setTimeoutId(null);
    }, 4000);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    if (clickedOrder.length > 0) {
      const timer = setTimeout(() => {
        const highlightTimer = setInterval(() => {
          if (clickedOrder.length === 0) {
            clearInterval(highlightTimer);
          } else {
            const nextItem = clickedOrder.pop();
            setSelectedBoxes([nextItem]);
          }
        }, 1000);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [clickedOrder]);

  return (
    <div className="App">
      {[1, 2, 3, 4, 5, 6].map((boxIndex) => {
        return (
          <div
            key={boxIndex}
            className={`box ${selectedBoxes.includes(boxIndex) ? 'bgc' : ''}`}
            onClick={() => {
              handleBox(boxIndex);
              setTimeout(() => {
                setSelectedBoxes([]);
              }, 1000);
            }}
          >
            Item{boxIndex}
          </div>
        );
      })}
    </div>
  );
};

export default App;
