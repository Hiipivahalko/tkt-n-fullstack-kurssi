import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const kurssi = 'Half Stack -sovellukehitys'
    const osat = [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14
        }
    ]

    return (
        <div>
            <h1>{kurssi}</h1>
            <p>{osat[0].nimi}, {osat[0].tehtavia}</p>
            <p>{osat[1].nimi}, {osat[1].tehtavia}</p>
            <p>{osat[2].nimi}, {osat[2].tehtavia}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));