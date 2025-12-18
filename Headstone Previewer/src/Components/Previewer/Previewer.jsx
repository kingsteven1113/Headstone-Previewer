import React from 'react';
import { useState } from 'react';
import './Previewer.css';

const Previewer = () => {
  const [shape, setShape] = useState(null); {/* Heart Shape, Angel Carved, Standard Upright, */}
  const [cemetery, setCemetery] = useState(null); {/* Which Cemetery is the stone going to? */}
  const [shapeTop, setShapeTop] = useState(null); {/* Serp Top, Oval Top, Apex, Roof Top, Flat Top, 3/4 Serp, 1/2 Serp, 1/2 Oval, Offset Roof */}
  const [type, setType] = useState(null); {/* Upright, Slant, Hickey, Flush Marker, Natural Stone, Bench, Bronze */}
  const [color, setColor] = useState(null); {/* Impala Black, Barre Grey, North American Pink, etc. */}
  const [finishes, setFinishes] = useState(null); {/* Polished, BRP, Stippled, Steeled, Sawed */}
  const [letteringstyle, setLetteringStyle] = useState(null); {/* Skinfrosted, Deep Cut, Raised, Hand Tooled, Outlined, etc. */}
  const [basefinishes, setBaseFinishes] = useState(null); {/* Polished, BRP, Stippled, Steeled, Sawed */}
  const [basetype, setBaseType] = useState(null); {/* Beveled, Chamfer, Standard, Scotia, Polished Margin */}
  const [base, setBase] = useState(null); {/* Yes or No? */}
  const [size, setSize] = useState(null); {/* Single Wide, Double Wide */}
  const [etching, setEtching] = useState(null);{/* Yes or No? */}
  const [carving, setCarving] = useState(null);{/* Shape Carved Florals, Flat Carved, Deep Carved Florals, Carved Portrait */}
  const [porcelainPhoto, setPorcelainPhoto] = useState(null);{/* Yes or No? */}
  const [vase, setVase] = useState(null);{/* Yes or No? */}
  


  return (
    <>
    <h1>Welcome to the Headstone Previewer</h1>
    <div className="previewer-container">
      <div className='Preview-Options'></div>
      <div className='Preview-Images'>
        <img src="" alt="" />
        <p>Hello</p>
      </div>
    </div>
    </>
  );
}

export default Previewer;
