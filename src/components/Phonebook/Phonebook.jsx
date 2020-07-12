import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import ContactForm from '../ContactForm';
import Section from '../../common/Section';
import Filter from '../Filter';
import ContactList from '../ContactList';

import storage from '../../utils/localStorageSave';

import 'react-toastify/dist/ReactToastify.css';

class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    this.loadContacts();
  }

  componentDidUpdate() {
    this.saveContacts();
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

  saveContacts = () => {
    storage.save('contacts', this.state.contacts);
  };

  loadContacts = () => {
    const contacts = storage.get('contacts');

    if (contacts) {
      this.setState({ contacts });
    }
  };

  render() {
    const { contacts } = this.state;
    return (
      <>
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
      </>
    );
  }
}

export default Phonebook;
