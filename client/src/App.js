import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/userList';
import Test from './components/test';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Test></Test>
        <img src={logo} className="App-logo" alt="logo" />
        <UserList></UserList>
      </header>
    </div>
  );
}

export default App;
