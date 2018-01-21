import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {

    if (props.hyva === 0 && props.neutraali === 0 && props.huono === 0) {
        return (
            <div> 
                <p>ei yhtään palautetta annettu</p>
            </div>
        )
    }

    return (
        <div>
            <p>hyvä {props.hyva}</p>
            <p>neutraali {props.neutraali}</p>
            <p>huono {props.huono}</p>
            <p>keskiarvo {props.ka}</p>
            <p>positiivisia {props.prossa}</p>
        </div>
    )
}

const Statistic = ({ text, result}) => (
    <div>
        <p>{text} {result}</p>
    </div>
)

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
        }
    }

    clickHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1
        })
    }

    clickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1
        })
    }

    clickHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
            huonoArvo: this.state.huonoArvo - 1
        })
    }

    clickHandler = (arvo) => {
        return () => {
            this.setState((prevState) => ({
                
               [arvo]: prevState[arvo] + 1 
                
                
            }))
        }
        
    }

    render() {
        
        const ka = Math.round(((this.state.hyva - this.state.huono) / (this.state.huono + this.state.hyva + this.state.neutraali)) * 10) / 10
        const prosentti = (this.state.hyva / (this.state.huono + this.state.hyva + this.state.neutraali)) * 100
        const rounded = Math.round(prosentti * 10) / 10
        const hyva = this.state.hyva
        const neutraali = this.state.neutraali
        const huono = this.state.huono

        return (
            <div>
                <h1>anna palautetta</h1>
                <Button 
                    handleClick={this.clickHandler('hyva')}
                    text="hyva"
                />
                <Button 
                    handleClick={this.clickHandler('neutraali')}
                    text="neutraali"
                />
                <Button 
                    handleClick={this.clickHandler('huono')}
                    text="huono"
                />
                <h1>statistiikka</h1>
                <Statistics 
                    hyva={hyva}
                    neutraali={neutraali}
                    huono={huono}
                    ka={ka}
                    prossa={rounded}
                />
            </div>
        )
    }
}

ReactDOM.render(
<App />, document.getElementById('root')
);

