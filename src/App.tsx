import './App.css'

import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Informative from './pages/Informative'
import RelatorioQuarentena from './pages/Relatorio'

function App() {


 return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/informative" element={<Informative />} />
      <Route path="/relatorio" element={<RelatorioQuarentena />} />
      
      
    </Routes>  )
}

export default App
