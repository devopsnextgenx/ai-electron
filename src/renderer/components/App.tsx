import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ContentFrame from './ContentFrame/ContentFrame';
import './App.css';

const App = () => {
  return (
        <div className='app-frame'>
            <Header />
            <ContentFrame />
            <Footer />
        </div>);
};

export default App;
