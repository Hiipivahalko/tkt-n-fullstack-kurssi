import React from 'react';
import ReactDOM from 'react-dom';

const Osa = ({ pala }) => {
    return (
        <li>{pala.nimi}, {pala.tehtavia}</li>
    )
}

const Yhteensa = ({ palat }) => {

    const reducer = (total, pala) => total + pala.tehtavia;

    console.log(palat.reduce(reducer, 0))
    return (
        <p>yhteensä {palat.reduce(reducer, 0)} tehtävää</p>
    )
}

const Sisalto = ({ osat }) => {
    return (
        <ul>
            {osat.map(pala => <Osa key={pala.id} pala={pala} />)}
        </ul>
    )
}

const Otsikko = ({ nimi }) => {
    return (
        <h1>{nimi}</h1>
    )
}

const Kurssi = ({ kurssi }) => {
    return (
        <div>
            <Otsikko nimi={kurssi.nimi} />
            <Sisalto osat={kurssi.osat} />
            <Yhteensa palat={kurssi.osat} />
        </div>
    )
}

export default Kurssi