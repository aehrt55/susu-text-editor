import React, { Component } from 'react';
import Editor from 'susu-text-editor';
import logo from './logo.svg';
import styles from './App.css';
import data from './data';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div style={{ textAlign: 'left' }}>
          <Editor data={data} />
        </div>
      </div>
    );
  }
}

export default App;
