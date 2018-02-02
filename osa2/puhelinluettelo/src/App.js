import React from 'react';
import axios from 'axios';
import personService from './service/personsService';
import Puhelinluettelo from './components/Puhelinluettelo';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  handlePersonChange = (event) => {
      console.log(event.target.value)
      this.setState({
          newName: event.target.value
      })
  }

  handleNumberChange = (event) => {
    console.log(event.target.value)
    this.setState({
      newNumber: event.target.value
    })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  handleDelete = (id) => {
    
    console.log('poistettiin')
    const person = this.state.persons.filter(p => p.id !== id)
    console.log(id)
    if (window.confirm(`poistetaanko ${person.name}?`)) {
        personService
          .remove(id)
          .then(person => {
            const persons = this.state.persons.filter(p => p.id !== id)
            this.setState({
              persons: persons
            })
          }) 
    }
  }

  addPerson = (event) => {
      event.preventDefault()
      const personObject = {
          name: this.state.newName,
          number: this.state.newNumber
      }

      const nameExist = () => (
          this.state.persons.some(
            n => n.name.toLowerCase() === personObject.name.toLowerCase())
      )

      if (!nameExist()) {
        personService
          .create(personObject)
          .then(response => {
            this.setState({
              persons: this.state.persons.concat(response),
              newName: '',
              newNumber: ''
            })
          })
      } else {
        alert('kyseinen nimi löytyy jo')
        this.setState({
          newName: '',
          newNumber: ''
        })
      }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  render() {
    console.log('render')
    return (
      <Puhelinluettelo props={this} />
    )
  }
}

export default App
