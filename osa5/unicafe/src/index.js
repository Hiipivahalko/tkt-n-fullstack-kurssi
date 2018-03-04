import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './counterReducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)

const Statistiikka = () => {
  
  const state = store.getState()
  const palautteita = Object.keys(state).reduce((sum, nyk) => sum + state[nyk], 0)
  const positiivisia = (state.good / palautteita) * 100
  const keskiarvo = (state.good - state.bad) / palautteita

  console.log(state)

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{state.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{state.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{state.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={e => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
    </div >
  )
}



class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  
  

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderoi = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
}


renderoi()
store.subscribe(renderoi)