import React from 'react'
import Persons from './Persons'
import AddMember from './AddMember'
import Notification from './Notification'


const Puhelinluettelo = ({ props }) => (
    <div>
        <h1>Puhelinluettelo</h1>
        <div >
        <Notification message={props.state.message} />
        </div>
        
        rajaa näytettäviä: <input value={props.state.filter} onChange={props.handleFilterChange} />
        <AddMember value={props.state.newName}
          value2={props.state.newNumber}
          change={props.handlePersonChange}
          change2={props.handleNumberChange}
          submit={props.addPerson}/>
        <h2>Numerot</h2>
        <Persons persons={props.state.persons} 
          filter={props.state.filter}
          handleDelete={props.handleDelete} />
    </div>
)

export default Puhelinluettelo
