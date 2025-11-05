import React from 'react';
import { useState } from 'react';
import './Previewer.css';

const Previewer = () => {
  const [shape, setShape] = useState(null);
  const [cemetery, setCemetery] = useState(null);
  const [shapeTop, setShapeTop] = useState(null);
  const [type, setType] = useState(null);
  const [color, setColor] = useState(null);
  const [finishes, setFinishes] = useState(null);
  const [letteringstyle, setLetteringStyle] = useState(null);
  const [basefinishes, setBaseFinishes] = useState(null);
  const [basetype, setBaseType] = useState(null);
  


  return (
    <>
    <h1>Welcome to the Headstone Previewer</h1>
    <div className="previewer-container">
      <div className='Preview-Options'></div>
      <div className='Preview-Images'></div>
    </div>
    </>
  );
}

export default Previewer;
