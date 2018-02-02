import React from 'react';
import axios from 'axios'



const FilterCountry = ({ value, change }) => {
  return (
    <div>
      <form>
      find countries:<input
                        value={value}
                        onChange={change} /><br/>
      </form>
      
    </div>
  )
}


const Countries = ({ countries }) => {
  const maat = countries.state.countries.filter(country => {
    return(country.name.toLowerCase().includes(countries.state.filter.toLowerCase()))
  })
  console.log(maat.length)
  console.log(maat[0])
  if (maat.length > 9) {
    return (
      <div><p>too many maches, specify another filter</p></div>
    )
  } else if (maat.length === 1) {
    return (
      <div>
        {maat.map(maa => 
          <div key={maa.name}>
            <h1>{maa.name}</h1>
            <p>capital: {maa.capital}</p>
            <p>population: {maa.population}</p>
            <img src={maa.flag} height={150} width={250} alt={maa.name} />
          </div>)}
      </div>
    )
  } else if (maat.length < 10) {
    return (
      <div>
        {maat.map(country => 
        <div key={country.name} onClick={countries.handleClick}>
          <p >{country.name}</p>
        </div>)}
        
      </div>
    )
  }

  return (
    <p></p>
  )
}

//console.log(allReadyFiltered)


  


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: '',
      maa: true
    }
  }

  handleFilterChange = (event) => {
    this.setState({ 
      filter: event.target.value,
      maa: false
    })
  }

  handleClick = (maa) => {
    let country = maa.target.innerHTML
    this.setState({ filter: country})
  }

  componentDidMount() {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({ countries: response.data })
    })
  }

  render() {
    return (
      <div >
        <FilterCountry value={this.state.filter} change={this.handleFilterChange}/>
        <Countries countries={this}/>
      </div>
    );
  }
}

export default App;
