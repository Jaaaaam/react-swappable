import React, { Component } from 'react';
import Swappable from './components/SwappableComponent'
import './App.css';

class App extends Component {
    sampleCustomFunction() {
        alert('TEST')
    }
    render() {
        return (
            <div>
                <Swappable id='1' content="#1" customFunc={() => this.sampleCustomFunction()}/>
                <Swappable id='2' content="#2"/>
                <Swappable id='3' content="#3"/>
            </div>
        );
    }
}

export default App;
