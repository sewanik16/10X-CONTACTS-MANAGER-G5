import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
 import Signup from './Project/Form/Signup';
import Login from './Project/Form/Login';
import Contact from './Project/Contact/Contact';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/userContact" element={<Contact/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
