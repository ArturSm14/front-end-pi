import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Consultas from "./pages/Consultas";
import Medicos from "./pages/Medicos";

function App() {
  
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/consultas" element={<Consultas />}/>
          <Route path="/medicos" element={<Medicos />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
