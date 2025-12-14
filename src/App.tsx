import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informative from './pages/Informative'

function App() {


 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/informative" element={<Informative />} />
      
      
    </Routes>  )
}

export default App
