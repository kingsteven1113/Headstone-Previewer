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
    </>
  )
}

export default App
