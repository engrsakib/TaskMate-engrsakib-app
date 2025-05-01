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
    <div style={{ textAlign: 'center' }}>
      <h2>Spin Wheel</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
  onStopSpinning={() => {
    setMustSpin(false);
    alert(`Selected Task: ${data[prizeNumber].option}`);
  }}
/>
<button onClick={handleSpinClick} style={{ marginTop: '20px' }}>
  Spin
</button>
    </div>
  );
};

export default Spinner;