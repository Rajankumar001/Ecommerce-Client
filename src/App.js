
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
function App() {
  return (
    <>
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/contact' element={<Contact/>}/>

</Routes>
    </>
  );
}

export default App;
 