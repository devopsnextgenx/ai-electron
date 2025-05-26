import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ContentFrame from './ContentFrame/ContentFrame';
import './App.css';
import About from './About/About';

const App = () => {
  return (
    <Router>
      <Header />
      <div className='app-frame'>
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;