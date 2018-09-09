import React from 'react';
import Plot from 'react-plotly.js';
import CurrencyCard from './CurrencyCard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../redux/actions/dataActions';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: ['BTC','ETH','NANO','EOS','XRP','BCH','XLM','VEN','LTC','XMR','DASH'],
            fiatCurrency: 'USD',
            orderOptions: [
                {id: 'price', name: 'price'},
                {id: 'trend', name: 'trend'},
                {id: 'name', name: 'name'}
            ],
            sortOptions: [
                {id: 'asc', name: '▼'},
                {id: 'desc', name: '▲'}
            ],
            trendOptions: [
                {id: '24h', name: '24h'},
                {id: '1h', name: '1h'},
                {id: '7d', name: '7d'}
            ],
            order: 'trend',
            sort: 'desc',
            trend: '24h',
            showOptions: false,
            selectedCurrency : null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            prevState.order != this.state.order ||
            prevState.sort != this.state.sort ||
            prevState.trend != this.state.trend
        ) {
            this.props.dataActions.orderCurrencies(this.state.order, this.state.sort);
        }
        if (this.state.selectedCurrency && prevState.selectedCurrency != this.state.selectedCurrency) {
            this.props.dataActions.fetch24ByCurrency(this.state.selectedCurrency, this.state.fiatCurrency);
        }
    }

    componentDidMount() {
        const { currencies, fiatCurrency} = this.state;
        this._resize();
        window.addEventListener("resize", this._resize.bind(this));
        this.props.dataActions.fetchCryptocompare(currencies, fiatCurrency);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resize.bind(this));
    }

    _resize = () => {
        this.setState({ viewPortHeight: window.innerHeight });
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

        this.setState({
            trend: trendOptions[(trendIndex == (trendOptions.length-1) ? 0 : trendIndex+1)].id
        });
    }

    _toggleOptions = () => {
        this.setState({ showOptions: !this.state.showOptions });
    }

    _handleCurrencyClick = (e, selectedCurrency) => {
        this.setState({ selectedCurrency: (this.state.selectedCurrency != selectedCurrency) ? selectedCurrency : null });
    }

    render() {

        const { data } = this.props;
        const { fiatCurrency, orderOptions, order, sortOptions, sort, trendOptions, trend, showOptions, selectedCurrency, viewPortHeight} = this.state;
        const orderOption = orderOptions.find(el => el.id == order),
            sortOption = sortOptions.find(el => el.id == sort),
            trendOption = trendOptions.find(el => el.id == trend);

        const rangeDates = data.historic24[selectedCurrency] ?
                    [ data.historic24[selectedCurrency].date[0], data.historic24[selectedCurrency].date[data.historic24[selectedCurrency].date.length] ] : [];

        const layoutGraph = {
            width: '400',
            dragmode: 'zoom',
            margin: {
                r: 10,
                t: 25,
                b: 40,
                l: 60
            },
            font: {
                family: 'monospace'
            },
            showlegend: false,
            xaxis: {
                showGrid: false,
                showLine: false,
                autorange: true,
                gridcolor: '#474746',
                domain: [0, 1],
                range: rangeDates,
                rangeslider: { visible: false },
                title: 'Date',
                type: 'date'
            },
            yaxis: {
                showLine: false,
                showGrid: false,
                autorange: true,
                gridcolor: '#474746',
                domain: [0, 1],
                range: [114.609999778, 137.410004222],
                type: 'linear'
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)'
        };

        const dataGraph = data.historic24[selectedCurrency] ? [{
            x: data.historic24[selectedCurrency].date,
            close: data.historic24[selectedCurrency].close,
            decreasing: {line: {color: '#af4d4d', width:0}},
            high: data.historic24[selectedCurrency].high,
            increasing: {line: {color: '#5ea35e', width: 0}},
            line: {color: 'red'},
            low: data.historic24[selectedCurrency].low,
            open: data.historic24[selectedCurrency].open,
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            hoverlabel: { bgcolor: '#2a2b2d', font: { family: 'monospace', color: '#bfc4cc' } }
        }] : [];

        return(
            <div className="container" style={{ height: viewPortHeight }}>
                <div className="left-pane">
                    <div className="multi-card-container grid-3fr-3fr-1fr-1fr" style={{ gridTemplateColumns: '1fr 1fr 50px'}}>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    coinlog<span className="title-dot">.</span>sh
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    api: <a className="important-link" target="_blank" href="https://min-api.cryptocompare.com/">cryptocompare🗗</a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div onClick={ this._toggleOptions } className="card-content link-hover">
                                   ⚙
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card-container grid-1fr-1fr-1fr">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeOrder}>
                                    <span className="link-hover-underline">order: {orderOption.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeSort}>
                                    <span className="link-hover-underline">sort: {sortOption.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeTrend}>
                                    <span className="link-hover-underline">trend: {trendOption.name}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card-container" style={{ gridTemplateColumns: '1fr 200px' }}>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    <a href="#" onClick={ this._toggleOptions }>search:</a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                   view: cards
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-wrapper">
                    {
                        (data.currencies && data.currencies.length > 0) && data.currencies.map( (o, index) =>
                            <CurrencyCard {...o}
                                style={ (index == 0)? { margin: '0px 5px 5px 5px' } : undefined}
                                fiatCurrency={ fiatCurrency }
                                key={ index }
                                onClickCurrency={ e => this._handleCurrencyClick(e, o.name) }
                                selected={ (selectedCurrency == o.name) }
                            />
                        )
                    }
                    </div>
                    <div className={`modal ${(showOptions? 'active': '')}`}>
                        <div className="multi-card-container" style={{ gridTemplateColumns: '1fr 1fr 50px'}}>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        settings
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                       v: 0.1.0 alpha
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div onClick={ this._toggleOptions } className="card-content link-hover">
                                        ⬅
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="multi-card-container grid-1fr-1fr-1fr">
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        <a className="active-link"href='#' onClick={this._changeOrder}>api</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        <a href='#' onClick={this._changeSort}>display</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        <a href='#' onClick={this._changeTrend}>about</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-pane">
                    <div className="main-pane-wrapper">
                        <div className="main-content">
                            <div className="big-chart">
                                { selectedCurrency &&
                                    <Plot
                                        data= { dataGraph }
                                        layout={ layoutGraph }
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        data: state.data
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dataActions: bindActionCreators(dataActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
