import React from 'react';
import { useState } from 'react';
import './Previewer.css';
import Upright from '../../assets/Casillas 2.jpg';
import PinkUpright from '../../assets/Dockendorf.png';

import reactLogo from '../../assets/react.svg';



const Previewer = () => {
  const [shape, setShape] = useState(null); {/* Heart Shape, Angel Carved, Standard Upright, */}
  const [cemetery, setCemetery] = useState(null); {/* Which Cemetery is the stone going to? */}
  const [shapeTop, setShapeTop] = useState(null); {/* Serp Top, Oval Top, Apex, Roof Top, Flat Top, 3/4 Serp, 1/2 Serp, 1/2 Oval, Offset Roof */}
  const [type, setType] = useState(null); {/* Upright, Slant, Hickey, Flush Marker, Natural Stone, Bench, Bronze */}
  const [color, setColor] = useState(null); {/* Impala Black, Barre Grey, North American Pink, etc. */}
  const [finishes, setFinishes] = useState(null); {/* Polished, BRP, Stippled, Steeled, Sawed */}
  const [letteringStyle, setLetteringStyle] = useState(null); {/* Skinfrosted, Deep Cut, Raised, Hand Tooled, Outlined, etc. */}
  const [baseFinishes, setBaseFinishes] = useState(null); {/* Polished, BRP, Stippled, Steeled, Sawed */}
  const [baseType, setBaseType] = useState(null); {/* Beveled, Chamfer, Standard, Scotia, Polished Margin */}
  const [base, setBase] = useState(null); {/* Yes or No? */}
  const [size, setSize] = useState(null); {/* Single Wide, Double Wide */}
  const [etching, setEtching] = useState(null);{/* Yes or No? */}
  const [carving, setCarving] = useState(null);{/* Shape Carved Florals, Flat Carved, Deep Carved Florals, Carved Portrait */}
  const [porcelainPhoto, setPorcelainPhoto] = useState(null);{/* Yes or No? */}
  const [vase, setVase] = useState(null);{/* Yes or No? */}
  



  function resetSelections() {
    setShape(null);
    setCemetery(null);
    setShapeTop(null);
    setType(null);
    setColor(null);
    setFinishes(null);
    setLetteringStyle(null);
    setBaseFinishes(null);
    setBaseType(null);
    setBase(null);
    setSize(null);
    setEtching(null);
    setCarving(null);
    setPorcelainPhoto(null);
    setVase(null);
  }

  const imageMap = {
    Upright: {
      _default: Upright,
      North_American_Pink : {
        _default: PinkUpright,
        Upright : {
          _default: PinkUpright,
          Yes : {
            _default: PinkUpright,
            Standard: {
              _default: PinkUpright,
              Polished_Top_Rock_Pitch_All_Sides: {
                _default: PinkUpright,
                Single : {
                  _default: PinkUpright,
                  Polished_Front_and_Back_Rock_Pitch_Sides_and_Top: {
                    
                  },
                  Polished_Front_Back_and_Top_Rock_Pitch_Sides: {},
                  Polished_All_Sides: {},
                  Steeled_Front_and_Back_Rock_Pitch_Sides_and_Top: {},
                  Steeled_Front_Back_and_Top_Rock_Pitch_Sides: {},
                  Steeled_All_Sides: {},
                },
                Double : {},
              },
              Polished_Top_Rock_Pitch_Front_and_Sides: {},
              Polished_Top_Rock_Pitch_Front: {},
              Polished_Top_Smooth_All_Sides: {},
            },
            Beveled: {},
            Chamfer: {},
            Scotia: {},
            Polished_Margin: {},
            Undersize_Base: {},
            Center_Base: {},
            Partial_Base: {},
            Split_Base: {},
          },
          No : {},
        },
        Carved_Angel : {},
        Heart_Shape : {},
        Custom_Shape : {},

      },
      Canadian_Pink : {},
      Impala_Black : {},
      Jet_Black : {},
      India_Red : {},
      Bahama_Blue : {},
      Barre_Grey : {},
      Indian_Aurora : {},
      Paradiso : {},
      Cats_Eye : {},
      Black_Galaxy : {},
      Coffee_Brown :  {},
      Evergreen : {},
      Tropical_Green : {},
      Blue_Pearl : {}

  }};


   const [selection, setSelection] = useState({
    type : null,
    color : null,
    shape : null,
    base : null,
    baseType : null,
    baseFinishes : null,
    size : null,
    finishes : null,
    shapeTop : null,
    letteringStyle : null,
    etching : null,
    carving : null,
    porcelainPhoto : null,
    vase : null,
   });

  const imageSrc = 
    resolvePreview(ImageBitmap, selection);



  return (
    <>
    <h1>Welcome to the Headstone Previewer</h1>
    <div className="previewer-container">
      <div className='Preview-Options'></div>
      <div className='Preview-Images'>
        <img id='Stone' src={imageSrc} alt="" />
        <p>This combination has not been created yet.</p>
        <p>{shape}</p>
        <p>{color}</p>

      <button onClick={resetSelections}>Reset Options</button>
      <button onClick={(e) => setShape(e.target.innerHTML)}>Upright</button>
      <button onClick={(e) => setColor(e.target.innerHTML)}>Pink</button>
      <button onClick={(e) => setColor(e.target.innerHTML)}>Black</button>

      
      </div>
    </div>
    </>
  );
}

export default Previewer;
