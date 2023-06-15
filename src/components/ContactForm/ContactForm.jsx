import React, { useState } from 'react';
import css from './ContactForm.module.css';

import { MdOutlinePersonAdd } from 'react-icons/md';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form className={css.contact_form} action="" onSubmit={handleSubmit}>
      <label className={css.form_label} htmlFor="name">
        Name{' '}
      </label>
      <input
        className={css.form_input}
        onChange={handleChange}
        value={name}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <label className={css.form_label} htmlFor="number">
        Number
      </label>
      <input
        className={css.form_input}
        onChange={handleChange}
        value={number}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      ></input>

      <button className={css.form_btn} type="submit">
        <MdOutlinePersonAdd className={css.btn_icon} />
        Add contact
      </button>
    </form>
  );
}
