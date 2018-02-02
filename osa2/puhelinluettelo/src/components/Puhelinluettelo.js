import React from 'react'
import Persons from './Persons'
import AddMember from './AddMember'

const Puhelinluettelo = ({ props }) => (
    <div>
        <h2>Puhelinluettelo</h2>
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
