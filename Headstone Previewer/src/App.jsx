import { useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Previewer from './Components/Previewer/Previewer.jsx'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Previewer />} />
        </Routes>
      </BrowserRouter>
                  <form
      name="Submission"
      method="POST"
      data-netlify="true"
      className="PreviewForm"
    >
      {/* Required hidden input for Netlify */}
      <input type="hidden" name="form-name" value="Submission" />

      {/* Basic selections */}
      <div>
        <input type="text" name="Image" value={SelectionImage} readOnly />
        <input type="text" name="Type" value={typeSelected} readOnly />
        <input type="text" name="Shape" value={shapeSelected} readOnly />
        <input type="text" name="Color" value={colorSelected} readOnly />
      </div>

      {/* Button-controlled inputs */}
      <div>
        <button
          type="button"
          onClick={() => setVase(vase === "Vase" ? "" : "Vase")}
          className={vase === "Vase" ? "Selected" : ""}
        >
          Vase
        </button>
        <input type="text" name="Vase Selection" value={vase} readOnly />
      </div>

      <div>
        <button
          type="button"
          onClick={() => setEtching(etching === "Etching" ? "" : "Etching")}
          className={etching === "Etching" ? "Selected" : ""}
        >
          Etching
        </button>
        <input type="text" name="Etching Selection" value={etching} readOnly />
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            setBronzeEmblem(
              bronzeEmblem === "Bronze Emblem" ? "" : "Bronze Emblem"
            )
          }
          className={bronzeEmblem === "Bronze Emblem" ? "Selected" : ""}
        >
          Bronze Emblem
        </button>
        <input
          type="text"
          name="Bronze Emblem Selection"
          value={bronzeEmblem}
          readOnly
        />
      </div>

      <div>
        <button
          type="button"
          onClick={() =>
            setPorcelainPhoto(
              porcelainPhoto === "Porcelain Photo" ? "" : "Porcelain Photo"
            )
          }
          className={porcelainPhoto === "Porcelain Photo" ? "Selected" : ""}
        >
          Porcelain Photo
        </button>
        <input
          type="text"
          name="Porcelain Photo Selection"
          value={porcelainPhoto}
          readOnly
        />
      </div>

      {/* Wording textarea */}
      <div>
        <textarea
          name="Wording"
          placeholder="All the wording that you would like to try to fit on the stone"
          value={wording}
          onChange={(e) => setWording(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <button type="submit">Submit Options</button>
    </form>
    </>
  )
}

export default App
