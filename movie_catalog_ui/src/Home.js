import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './NavBar';

class Home extends React.Component {

  render() {
    return (
      <div >
        <nav>
          <NavBar />
        </nav>
      </div>
    );
  }
}

export default Home;
