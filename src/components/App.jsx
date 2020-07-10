import React, { Component } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';

import ThemeContext from '../context/ThemeContext';
import { themeConfig } from '../context/ThemeContext';

import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import localStorageFunc from '../utils/localStorageSave';
import './App.scss';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    theme: 'light',
  };

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate() {
    this.saveData();
  }

  toggleTheme = this.toggleTheme.bind(this);

  toggleTheme() {
    this.setState({
      theme: this.state.theme === 'dark' ? 'light' : 'dark',
    });
  }

  handleAddContact = ({ name, number }) => {
    const { contacts } = this.state;

    if (contacts.some(contact => contact.name === name)) {
      toast.warn(`${name} is already in contacts`);

      return;
    }

    if (!name || !number) {
      toast.warn(`Please enter the contact name and number`);

      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [
        ...contacts,
        {
          id: uuidv4(),
          name,
          number,
        },
      ],
    }));
  };

  handleFilterChange = ({ filter }) => {
    this.setState({
      filter,
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContacts = filter
      ? contacts.filter(contact => contact.name.includes(filter))
      : contacts;

    return filteredContacts;
  };

  handleRemoveContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  saveData = () => {
    localStorageFunc.save('phonebook', this.state.contacts);
    localStorageFunc.save('theme', this.state.theme);
  };

  loadData = () => {
    const contacts = localStorageFunc.get('phonebook');
    const theme = localStorageFunc.get('theme');

    if (contacts) {
      this.setState({ contacts });
    }

    if (theme) {
      this.setState({ theme });
    }
  };

  render() {
    const { contacts } = this.state;

    return (
      <ThemeContext.Provider
        value={{
          type: this.state.theme,
          config: themeConfig[this.state.theme],
        }}
      >
        <Wrapper title="Phonebook" toggleTheme={this.toggleTheme}>
          <ContactForm onAdd={this.handleAddContact} />

          <Section title="Contacts">
            {contacts.length >= 2 && (
              <Filter onFilterChange={this.handleFilterChange} />
            )}
            <ContactList
              contacts={this.filterContacts()}
              onRemove={this.handleRemoveContact}
            />
          </Section>
          <ToastContainer position="top-center" />
        </Wrapper>
      </ThemeContext.Provider>
    );
  }
}

export default App;
