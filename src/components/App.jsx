import React, { Component } from 'react';

import Phonebook from '../components/Phonebook';
import Wrapper from '../common/Wrapper';

import ThemeContext from '../context/ThemeContext';
import { themeConfig } from '../context/ThemeContext';

import storage from '../utils/localStorageSave';
import './App.scss';

class App extends Component {
  state = {
    theme: 'light',
  };

  componentDidMount() {
    this.loadTheme();
  }

  componentDidUpdate() {
    this.saveTheme();
  }

  toggleTheme = this.toggleTheme.bind(this);

  toggleTheme() {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  }

  saveTheme = () => {
    storage.save('theme', this.state.theme);
  };

  loadTheme = () => {
    const theme = storage.get('theme');

    if (theme) {
      this.setState({ theme });
    }
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          type: this.state.theme,
          config: themeConfig[this.state.theme],
        }}
      >
        <Wrapper title="Phonebook" toggleTheme={this.toggleTheme}>
          <Phonebook />
        </Wrapper>
      </ThemeContext.Provider>
    );
  }
}

export default App;
