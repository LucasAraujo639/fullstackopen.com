import React, { useEffect, useState } from 'react';
import persons_services from './services/persons_services';
import './index.css'

const Message = ({text, clases}) => {
  if (text === null) {
    return null
  }

  return (
    <div className={clases}>
    {text}
    </div>
  )
};

const Button = ({action, text, type}) => (
  <button type={type} onClick={action}>{text}</button>
);

const Filter = ({ filteredName, handleFilteredNameChange }) => (
  <div>Filter shown with <input value={filteredName} onChange={handleFilteredNameChange}/> </div>
);
const Parts = ({text, value, handleNewChange}) => (
<div>
  {text}
  <input value={value} onChange={handleNewChange}/>
</div>
);

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => (
  <form onSubmit={addPerson}>
    <Parts text="name: " value={newName} handleNewChange={handleNameChange}/>
    <Parts text = "number: " value={newNumber} handleNewChange={handleNumberChange}/>
    <Button type="submit" text="add"/>
  </form>
);

const Persons = ({ personsToFilter, deleteButton }) => (
  <div>
    {personsToFilter.map((person) => 
      <div key={person.id}>
        {person.name} {person.phone}
        <Button text="delete" action={() => deleteButton(person.id)}/>
        </div>
    )}
  </div>
);

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber] = useState('');
  const [ filteredName, setFilteredName] = useState('');
  const [messageChange, setMessageChange] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(()=> {
    persons_services
    .getAll()
    .then(initialPersons =>{
      console.log(initialPersons)
      setPersons(initialPersons)
    })
    
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilteredNameChange = (event) => setFilteredName(event.target.value);

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, phone: newNumber };
    const repeatedName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
  

    if (repeatedName != undefined) {
      const confirmed = window.confirm(`${newName} } is already added to phonebook, replace the old number with a new one?`);
      if(confirmed){
        persons_services
        .update(repeatedName.id, newPerson)
        .then(personResponse =>{
          console.log(personResponse)
          //Se hace un mapeo porque necesito cambiar los datos de uno existente
          //Esto dice que para cada elemento n se verifica si es diferente al nombre repetido se devuelve el elemento original o sino se devuelve el elemento modificado que se obtiene de la respuesta del backend
          setPersons(persons.map(n => n.id !== repeatedName.id? n : personResponse ))
          setNewName('')
          setNewNumber('')
          setMessageChange(`number of ${newName} is changed`)
          setTimeout(() => {
            setMessageChange(null)
          }, 3000)
        })
        .catch(error => {
          setMessageError(`Information of ${newName} has already been removed from server`)
        })
        setTimeout(() => {
          setMessageError(null)
        }, 3000)
      }
    } else {
      persons_services
      .create(newPerson)
      .then(person => {
        setPersons([...persons, person])
        setNewName("")
        setNewNumber("")
        setMessageChange(`Successfully added ${newName}`)
        setTimeout(() => {
          setMessageChange(null)
        }, 3000)
      })
    }
  };

  const personsToFilter = persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()));
  
  const deleteButton = (id)=>{
    console.log("asdasd")
    const person = persons.find( e => e.id === id)
    console.log(person)
    if(window.confirm(`Delete ${person.name}`)){
      persons_services
    .remove(id)
    .then(() => {
      setPersons(persons.filter(p => p.id !== id))
    })
    } 
  }
  return (
    <div>
      <h2>Phonebook</h2>
      {messageChange && <Message clases="success" text={messageChange} />}
      <Message classes="error" text={messageError} />
      <Filter filteredName={filteredName} handleFilteredNameChange={handleFilteredNameChange} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons personsToFilter={personsToFilter}
      deleteButton={deleteButton}
      />
    </div>
  );
}

export default App;