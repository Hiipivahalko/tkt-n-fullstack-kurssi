import React from 'react';
import ReactDOM from 'react-dom';
import Kurssi from './components/Kurssi';

const App = ({ kurssit }) => {

    

    return (
        <div>
            {kurssit.map(osa => <Kurssi key={osa.id} kurssi={osa} />)}
        </div>
    )
}

export default App