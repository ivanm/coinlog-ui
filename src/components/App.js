import React from "react";
import CurrencyCard from './CurrencyCard';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyData: null,
            currencies: ['BTC','ETH','NANO','EOS','XRP','BCH','ETC'],
            fiatCurrency: 'USD'
        }
    }

    componentDidMount() {
        const { currencies, fiatCurrency} = this.state,
            currenciesQuery = currencies.join(',');

        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms='+currenciesQuery+'&tsyms='+fiatCurrency)
            .then((response) => response.json())
            .then((json) => {
                let currencyData = [];
                for (let currency in json['RAW']) {
                    console.log(currency);
                    currencyData.push({
                        trend: json['RAW'][currency][fiatCurrency]['CHANGEPCT24HOUR'].toFixed(2),
                        code: currency,
                        price: json['RAW'][currency][fiatCurrency]['PRICE'],
                        priceFormatted: json['DISPLAY'][currency][fiatCurrency]['PRICE']
                    });
                }
                this.setState({ currencyData });
            });
    }

    render() {

        const { currencyData, fiatCurrency } = this.state;

        return(
            <div className="container">
                <div className="left-pane">
                    <div className="nav-title">
                        coinlog<span className="title-dot">.</span>sh
                    </div>
                    {
                        currencyData && currencyData.map( (o, index) =>
                            <CurrencyCard {...o} fiatCurrency={ fiatCurrency } key={ index }/>
                        )
                    }
                </div>
                <div className="main-pane">
                </div>
            </div>
        )
    }
}
export default App;
