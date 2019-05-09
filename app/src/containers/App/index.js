import React, {Component} from 'react';
import styles from './App.module.css';
import Login from '../../screens/Login'

function App() {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
}

export default App;