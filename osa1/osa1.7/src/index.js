import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            huonoArvo: 0
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

    render() {
        
        const ka = Math.round(((this.state.hyva + this.state.huonoArvo) / (this.state.huono + this.state.hyva + this.state.neutraali)) * 10) / 10
        const prosentti = (this.state.hyva / (this.state.huono + this.state.hyva + this.state.neutraali)) * 100
        const rounded = Math.round(prosentti * 10) / 10

        const Keskiarvo = () => {
            console.log(ka)
            return (
                <div>
                    <p>Keskiarvo {ka}</p>
                </div>
            )
            
        }

        const Positiiviset = () => {
            return (
                <div>
                    <p>positiivisia {rounded} %</p>
                </div>
            )
            
        }

        return (
            <div>
                <h1>anna palautetta</h1>
                <button onClick={this.clickHyva}>hyvä</button>
                <button onClick={this.clickNeutraali}>neutraali</button>
                <button onClick={this.clickHuono}>huono</button>
                <h1>statistiikka</h1>
                <p>hyvä {this.state.hyva}</p>
                <p>neutraali {this.state.neutraali}</p>
                <p>huono {this.state.huono}</p>
                <Keskiarvo />
                <Positiiviset />

            </div>
        )
    }
}

ReactDOM.render(
<App />, document.getElementById('root')
);

