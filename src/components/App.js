import React from 'react';
import Plot from 'react-plotly.js';
import CurrencyCard from './CurrencyCard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../redux/actions/dataActions';
import { changePercentage } from '../helpers';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            prevState.trend != this.state.trend ||
            JSON.stringify(prevProps.data) != JSON.stringify(this.props.data)
        ) {
            this.props.dataActions.orderCurrencies(this.state.order, this.state.sort);
        }
    }

    componentDidMount() {
        const { fiatCurrency} = this.state;
        this._resize();
        window.addEventListener("resize", this._resize.bind(this));
        window.addEventListener('load', () => {
            window.history.pushState({}, '')
        });
        window.addEventListener('popstate', () => {
            window.history.pushState({}, '')
        });
        Promise.all(this.props.data.currencies.map(el => this.props.dataActions.fetch24ByCurrencyTry(el, this.state.fiatCurrency, this.state.trend)));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._resize.bind(this));
    }

    _resize = () => {
        this.setState({ viewPortHeight: window.innerHeight, viewPortWidth: window.innerWidth });
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

    _logoClick = () => {
        this.setState({ selectedCurrency: null });
    }

    render() {

        const { data } = this.props;
        const { fiatCurrency, orderOptions, order, sortOptions, sort, trendOptions, trend, showOptions, selectedCurrency, viewPortHeight, viewPortWidth} = this.state;
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
            decreasing: {line: {color: '#af4d4d', width:1}},
            high: data.historic24[selectedCurrency].high,
            increasing: {line: {color: '#5ea35e', width: 1}},
            line: {color: 'red'},
            low: data.historic24[selectedCurrency].low,
            open: data.historic24[selectedCurrency].open,
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y',
            hoverlabel: { bgcolor: '#2a2b2d', font: { family: 'monospace', color: '#bfc4cc' } }
        }] : [];

        const mobileView = viewPortWidth < 600,
            mobileCompactView = true,
            hidingOnMobile = (mobileView && selectedCurrency && mobileCompactView);

        return(
            <div className="container" style={{ height: viewPortHeight }}>
                <div className="left-pane" style={ hidingOnMobile ? { gridTemplateRows: '40px 0px 0px 45px 1fr'} : {} }>
                    <div className="multi-card-container grid-3fr-3fr-1fr-1fr" style={{ gridTemplateColumns: '40px 1fr'}}>
                        <div className="card card-arrow-color">
                            <div className="card-wrapper">
                                { !selectedCurrency ?
                                    <div className="card-content link-hover" onClick={ this._toggleOptions }> ☰  </div> :
                                    <div className="card-content link-hover" onClick={ this._logoClick }> ⬅ </div>
                                }
                            </div>
                        </div>
                        <div className="card card-arrow-container">
                            <div className="card-wrapper card-arrow-block">
                                <div className="card-content link-hover">
                                    <span onClick={ this._logoClick } className=""><span>coinlog<span className="title-dot">.</span>sh</span></span>
                                </div>
                            </div>
                            <div className="card-arrow-head">
                            </div>
                        </div>
                    </div>
                    <div className={"multi-card-container grid-1fr"+(hidingOnMobile ? ' hidden-container' : '')}>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeSort}>
                                    search...
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"multi-card-container grid-1fr-1fr-1fr"+(hidingOnMobile ? ' hidden-container' : '')}>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeOrder}>
                                    <span className="link-hover-underline">order<span className="title-dot">: </span>{orderOption.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeSort}>
                                    <span className="link-hover-underline">sort<span className="title-dot">: </span>{sortOption.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    view<span className="title-dot">:</span> cards
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card-container" style={{ gridTemplateColumns: '1fr 2fr'}}>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content link-hover" onClick={this._changeTrend}>
                                    <span className="link-hover-underline">trend<span className="title-dot">: </span>{trendOption.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    api<span className="title-dot">:</span> cryptocompare
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (mobileView && selectedCurrency) ?
                        <div className="main-pane-mobile">
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
                        </div> :
                        <div className="overflow-wrapper" style={ (mobileView && selectedCurrency)? { opacity: 0, height: 0} : {} }>
                            {
                                data.currencies.map( (currency, index) => {
                                    return(
                                        data.historic24[currency] &&
                                        <CurrencyCard {...data.historic24[currency]}
                                            name={currency}
                                            style={ (index == 0)? { margin: '0px 5px 5px 5px' } : undefined}
                                            fiatCurrency={ fiatCurrency }
                                            key={ index }
                                            onClickCurrency={ e => this._handleCurrencyClick(e, currency) }
                                            selected={ (selectedCurrency == currency) }
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                    <div className={`modal ${(showOptions? 'active': '')}`}>
                        <div className="multi-card-container" style={{ gridTemplateColumns: '50px 1fr 1fr'}}>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div onClick={ this._toggleOptions } className="card-content link-hover">
                                        ⬅
                                    </div>
                                </div>
                            </div>
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
