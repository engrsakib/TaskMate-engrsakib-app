'use client';
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Spinner = () => {
  const data = [
    { option: 'Work' },
    { option: 'Study' },
    { option: 'Relax' },
    { option: 'Exercise' },
    { option: 'Family' },
    { option: 'Art and Craft' },
    { option: 'Sports' },
    { option: 'Meditation' },
  ];

  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
    };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
  onStopSpinning={() => {
    setMustSpin(false);
    alert(`Selected Task: ${data[prizeNumber].option}`);
  }}
/>
<button className="btn btn-wide btn-success p-3" onClick={handleSpinClick} style={{ marginTop: '20px' }}>
  Spin
</button>
    </div>
  );
};

export default Spinner;