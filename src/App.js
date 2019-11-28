import React from 'react';
import './App.css';
import Header from './Components/header';
import Homepage from './Pages/homepage'

class App extends React.Component {
  state = {}
  render() { 
    return (
      <div>
        <Header/>
        <Homepage/>
      </div>
    );
  }
}
 
export default App;