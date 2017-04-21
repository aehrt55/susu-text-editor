import React, { Component } from 'react';
import Editor from 'susu-text-editor';
import logo from './logo.svg';
import styles from './App.css';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={styles.intro}>
          {Editor}
        </p>
      </div>
    );
  }
}

export default App;
