import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [clickedOrder, setClickedOrder] = useState([]); //add sequence here like [3,2,4,5,1,6] 

  const handleBox = (boxIndex) => {
    const updatedSelectedBoxes = [...selectedBoxes, boxIndex];
    setSelectedBoxes(updatedSelectedBoxes);
    console.log(updatedSelectedBoxes);
    setClickedOrder([...clickedOrder, boxIndex]);
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
