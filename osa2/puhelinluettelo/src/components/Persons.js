import React from 'react'
import Person from './Person'

const Persons = ({ persons, filter, handleDelete }) => (

    <div>
        <table>
          <tbody>
            {persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)
                .map(person => 
                    <Person key={person.name} 
                            person={person}
                            handleDelete={handleDelete}/>
                )}
          </tbody>
        </table>
    </div>
)

export default Persons