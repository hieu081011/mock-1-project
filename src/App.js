import './App.css';
import { useState,useEffect } from 'react';
import { login ,getQuestions} from './api';
import Router from './Router/Router';
import Header from './Components/Header';
function App() {
  return (
    <div className="App">
        <Header/>
        <Router/>
    </div>
  );
}

export default App;
