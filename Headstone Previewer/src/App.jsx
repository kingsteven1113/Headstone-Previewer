import { useState } from 'react'
import { Route, BrowserRouter } from 'react-router-dom' 
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Previewer from './components/Previewer.jsx'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Route path="/" element={<Previewer />} />
        
      </BrowserRouter>
    </>
  )
}

export default App
