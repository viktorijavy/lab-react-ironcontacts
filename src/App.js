import contactData from './contacts.json'
import './App.css';
import React, { useState } from 'react'
import ContactList from './ContactList';
import Searchfield from './Searchfield';

function App() {

  const [contacts, setContacts] = useState(contactData.slice(0, 5))
  //console.log(contacts)

  const [query, setQuery] = useState('')

  const addContact = () => {
    let randomContact = contactData[Math.floor(Math.random() * contactData.length)]

    if (contacts.find(contact => contact.id === randomContact.id)) {
      if(contacts.length < contactData.length) {
        addContact()
      }
      return
    }
    setContacts(contacts => [randomContact, ...contacts])
  }

  const sortByName = () => {
    const sorted = [...contacts]
    sorted.sort((a, b) => a.name.localeCompare(b.name))
    setContacts(sorted)
  }

  const sortByPopularity = () => {

    const sorted = [...contacts]
    sorted.sort((a, b) => b.popularity - a.popularity)
    setContacts(sorted)
  }

  const deleteContact = (contactId) => {
   
    setContacts(contacts.filter(contact => contact.id !== contactId))
  }

  return (
    <div className="App">

      <h1>IronContacts</h1>


      <div className="Add-btn">
        <Searchfield setQueryProp={setQuery} />

        <button onClick={addContact} >Add random contact </button>
        <button onClick={sortByName}> Sort by name</button>
        <button onClick={sortByPopularity}>Sort by popularity</button>
      </div>
      <table className="Table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>

          <ContactList contacts={contacts} deleteContactProp={deleteContact} queryProp={query} />
        </tbody>
      </table>

    </div>
  );
}

export default App;
