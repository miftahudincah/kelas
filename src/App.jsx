import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register'; // Import halaman Register
import Courses from './components/Couerses';
import TryForFree from './components/TryForFree';
function App() {
  return (
    <Router>
      <div className="App bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        {/* Menggunakan kelas-kelas Tailwind CSS untuk gradient purple */}
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Tambahkan route untuk halaman Register */}
            {/* Tambahkan route lain di sini */}
            <Route path="/HTMLForBeginners" element={<Courses />} />
          
            <Route path="/TryForFree" element={<TryForFree/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
