import React from 'react'


const Person = ({ person, handleDelete }) => {
    return (
        <tr >
                <th><p>{person.name}</p></th>
                <th><p>{person.number}</p></th>
                <th><button onClick={handleDelete(person)}>poista</button></th>
        </tr>
    )
}

export default Person