import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }
    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }
    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (
        <div>
            <h1>{kurssi}</h1>
            <p>{osa1.nimi}, {osa1.tehtavia}</p>
            <p>{osa2.nimi}, {osa2.tehtavia}</p>
            <p>{osa3.nimi}, {osa3.tehtavia}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

