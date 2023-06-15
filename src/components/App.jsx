import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from './ContactForm/ContactForm';
import ContactsList from './ContactsList/ContactsList';
import Filter from './Filter/Filter';

// const INITIAL_CONTACTS = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ]
// };

const STORAGE_KEY = 'contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    try {
      const arrContacts = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (arrContacts) {
        setContacts(arrContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const submitForm = ({ name, number }) => {
    if (findContacts(name).length) {
      // Notiflix.Notify.failure(`${name} is already in contacts.`);
      toast.error(`${name} is already in contacts.`);
    } else {
      const id = nanoid();

      setContacts([...contacts, { id, name, number }]);
    }
  };

  const changeFilter = e => setFilter(e.target.value);

  const findContacts = name => {
    const normalizFilter = name.toLowerCase();

    return contacts.filter(el => {
      return el.name.toLowerCase().includes(normalizFilter);
    });
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(el => el.id !== contactId));
  };

  const visibleContacts = findContacts(filter);

  return (
    <>
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={submitForm}></ContactForm>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter}></Filter>
        {visibleContacts.length > 0 && (
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={deleteContact}
          ></ContactsList>
        )}
      </div>

      <ToastContainer />
    </>
  );
}
