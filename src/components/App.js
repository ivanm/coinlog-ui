import React from "react";
import CurrencyCard from './CurrencyCard';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencyData: null,
            currencies: ['BTC','ETH','NANO','EOS','XRP','BCH','ETC'],
            fiatCurrency: 'USD',
            orderOptions: [
                {id: 'price', name: 'Price'},
                {id: 'trend', name: 'Trend'},
                {id: 'name', name: 'Name'}
            ],
            sortOptions: [
                {id: 'asc', name: 'ASC'},
                {id: 'desc', name: 'DESC'}
            ],
            trendOptions: [
                {id: '24h', name: '24H'},
                {id: '1h', name: '1H'},
                {id: '7d', name: '7D'}
            ],
            order: 'trend',
            sort: 'asc',
            trend: '24h'
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.order != this.state.order ||
            prevState.sort != this.state.sort
        ) {
            this._orderCurrencyData();
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
                    currencyData.push({
                        trend: json['RAW'][currency][fiatCurrency]['CHANGEPCT24HOUR'],
                        trendFormatted: json['RAW'][currency][fiatCurrency]['CHANGEPCT24HOUR'].toFixed(2),
                        name: currency,
                        price: json['RAW'][currency][fiatCurrency]['PRICE'],
                        priceFormatted: json['DISPLAY'][currency][fiatCurrency]['PRICE']
                    });
                }
                this.setState({ currencyData });
                this._orderCurrencyData()
            });
    }

    _changeOrder = () => {
        const { orderOptions, order } = this.state,
            orderIndex = orderOptions.findIndex((el) => el.id == order);

        this.setState({
            order: orderOptions[(orderIndex == (orderOptions.length-1) ? 0 : orderIndex+1)].id
        });
    }

    _changeSort = () => {
        const { sortOptions, sort } = this.state,
            sortIndex = sortOptions.findIndex((el) => el.id == sort);

        this.setState({
            sort: sortOptions[(sortIndex == (sortOptions.length-1) ? 0 : sortIndex+1)].id
        });
    }

    _changeTrend = () => {
        const { trendOptions, trend } = this.state,
            trendIndex = trendOptions.findIndex((el) => el.id == trend);

        this.setState(
            { trend: trendOptions[(trendIndex == (trendOptions.length-1) ? 0 : trendIndex+1)].id },
            this._orderCurrencyData()
        );
    }

    _orderCurrencyData = () => {
        const { order, sort, currencyData } = this.state;

        const ascOrder = (a, b) => { return isNaN(a[order]) ? a[order].localeCompare(b[order]): (a[order] - b[order]) },
            descOrder = (a, b) => { console.log('descOrderF'); return isNaN(a[order]) ? b[order].localeCompare(a[order]): (b[order] - a[order]) },
            orderFunc = (sort == 'asc') ? ascOrder : descOrder;

        this.setState({
            currencyData: currencyData.sort( orderFunc )
        });
    }

    render() {

        const { currencyData, fiatCurrency, orderOptions, order, sortOptions, sort, trendOptions, trend } = this.state;
        const orderOption = orderOptions.find(el => el.id == order),
            sortOption = sortOptions.find(el => el.id == sort),
            trendOption = trendOptions.find(el => el.id == trend);

        return(
            <div className="container">
                <div className="left-pane">
                    <div className="nav-title">
                        coinlog<span className="title-dot">.</span>sh
                    </div>
                    <div className="nav-title">
                        |  Order: <a href='#' onClick={this._changeOrder}>{orderOption.name}</a>  |  Sort: <a href='#' onClick={this._changeSort}>{sortOption.name}</a>  |  Trend: <a href='#' onClick={this._changeTrend}>{trendOption.name}</a>  |
                    </div>
                    {
                        currencyData && currencyData.map( (o, index) =>
                            <CurrencyCard {...o} fiatCurrency={ fiatCurrency } key={ index }/>
                        )
                    }
                </div>
                <div className="main-pane">
                    <div className="main-pane-wrapper">
                        <div className="big-chart">
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default App;
