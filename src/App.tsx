import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import WeatherLayout from "./components/MainLayout/WeatherLayout";


function App() {
    return (
        <div className="App">
            <Header/>
            <WeatherLayout/>
        </div>
    );
}

export default App;
