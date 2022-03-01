// src/App.js
import { useState } from "react";
import "./App.css";
import contactsArray from './contacts.json';

function App() {
  const fiveContacts = contactsArray.slice(5, 10);
  const [contacts, setContacts] = useState(fiveContacts);
  console.log(contacts);

  function addRandomContact() {
    let randomIndex = Math.floor(Math.random()*contactsArray.length);
    const randomContact = contactsArray[randomIndex];
    if(contacts.includes(randomContact)){
      addRandomContact();
    } else {
      setContacts(contacts => [...contacts, randomContact]);
    }
  };

  function sortPopularity(){
    const popularityArray = contacts.slice().sort((contact1, contact2) => {
      if(contact1.popularity>contact2.popularity) {
        return -1;
      } else return 1;
    });

    setContacts(popularityArray);
  };

  function sortName(){
    const popularityArray = contacts.slice().sort((contact1, contact2) => {
      if(contact1.name>contact2.name) {
        return 1;
      } else return -1;
    });

    setContacts(popularityArray);
  };

  function deleteContact(id){
    setContacts(contacts.filter((contact) => {
      return contact.id!==id;
    }));
  };

  return (
    <div className="App">
      <button onClick={addRandomContact} >Add Random Contact</button>
      <button onClick={sortPopularity} >Sort by popularity</button>
      <button onClick={sortName} >Sort by name</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td><img src={contact.pictureUrl} alt='' style={{height: '100px', width: 'auto'}} /></td>
            <td>{contact.name}</td>
            <td>{contact.popularity.toFixed(2)}</td>
            <td>{contact.wonOscar && '🏆'}</td>
            <td>{contact.wonEmmy && '🏆'}</td>
            <td><button onClick={() => (deleteContact(contact.id))}>Delete</button></td>
          </tr>
        ))}
      </table>
    </div>
  );
}
export default App;