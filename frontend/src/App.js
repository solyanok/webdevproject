import React from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './components/Boards';
import Navbar from './Navbar'
import Create from './components/Create'

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
       <div>Logo</div>
       <div>Search bar</div>
       <div>User account</div>
      </header>
        <Router>
          <Navbar />
    <Routes>
    <Route path='/' element={<Boards /> } />
    <Route path='/boards/add' element={<Create /> } />

    </Routes>
  </Router>
 

    </div>
  );
}

export default App;
