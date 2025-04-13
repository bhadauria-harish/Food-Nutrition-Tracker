import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TeamInfo from './components/TeamInfo';
import Help from './components/Help';



const App = () => {


  return (
    <>
    <Header />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/teaminfo" element={<TeamInfo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
      </Routes>

    <Footer />
    </>
  )
}

export default App