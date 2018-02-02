import React from 'react';
import personService from './service/personsService';
import Puhelinluettelo from './components/Puhelinluettelo';
import './index.css'



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: null
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
    console.log('jou')
    this.setState({ filter: event.target.value })
  }

  handleDelete = (person) => {
    
    console.log('poistettiin')
    //const person = this.state.persons.filter(p => p.id !== id)
    //console.log(id)
    return () => {
      if (window.confirm(`Haluatko varmasti poistaa henkilön ${person.name}?`)) {
        personService
          .remove(person.id)
          .then(res => {
            this.setState({
              persons: this.state.persons.filter(p => p.id !== person.id),
              message: `${person.name} poistettiin`
            })
            
          })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 5000)  
      }
     
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
              newNumber: '',
              message: `${personObject.name} lisättiin onnistuneesti`
            })
          })
          setTimeout(() => {
            this.setState({
              message: null
            })
          }, 5000)  
      } else {
        if (window.confirm(`kyseinen hekilö löytyy, update?`)){
          const person = this.state.persons.find(p => p.name === personObject.name)
          this.updatePerson(person.id)
        } else {
          this.setState({
            newName: '',
            newNumber: ''
          })
        }
        //alert('kyseinen nimi löytyy jo')
        
      }
  }

  updatePerson = (id) => {
    console.log('hei')
    
      console.log('ollaanko täällä')
      const personToUpdate = this.state.persons.find(p => p.id === id)
      const changedPerson = { ...personToUpdate, number: this.state.newNumber }

      personService
        .update(id, changedPerson)
        .then(newP => {
          
          this.setState({
            persons: this.state.persons.map(person => person.id !== id ? person : changedPerson),
            newName: '',
            newNumber: '',
            message: `numero ${changedPerson.number} vaihdettiin henkilölle ${changedPerson.name} onnistuneesti`
          })
        })
        .catch(error => {
          alert(`henkilo ${changedPerson.name} on jo valitettavasti poistettu palvelusta`)
          console.log(changedPerson.name)
          
        })
        setTimeout(() => {
          this.setState({
            message: null
          })
        }, 5000)  
    
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
