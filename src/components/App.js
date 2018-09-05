import React from "react";
import CurrencyCard from './CurrencyCard';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dataActions from '../redux/actions/dataActions';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currencies: ['BTC','ETH','NANO','EOS','XRP','BCH','ETC'],
            fiatCurrency: 'USD',
            orderOptions: [
                {id: 'price', name: 'price'},
                {id: 'trend', name: 'trend'},
                {id: 'name', name: 'name'}
            ],
            sortOptions: [
                {id: 'asc', name: 'asc'},
                {id: 'desc', name: 'desc'}
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
    }

    componentDidMount() {
        const { currencies, fiatCurrency} = this.state;
        this.props.dataActions.fetchCryptocompare(currencies, fiatCurrency);
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
        const { fiatCurrency, orderOptions, order, sortOptions, sort, trendOptions, trend, showOptions, selectedCurrency } = this.state;
        const orderOption = orderOptions.find(el => el.id == order),
            sortOption = sortOptions.find(el => el.id == sort),
            trendOption = trendOptions.find(el => el.id == trend);

        return(
            <div className="container">
                <div className="left-pane">
                    <div className="multi-card-container-3f">
                        <div className="card">
                        </div>
                        <div className="card">
                        </div>
                        <div className="card">
                        </div>
                    </div>
                    <div className="multi-card-container grid-1fr-1fr">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    <a href="#" onClick={ this._toggleOptions }>coinlog<span className="title-dot">.</span>sh</a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    api: <a className="important-link" target="_blank" href="https://min-api.cryptocompare.com/">cryptocompare</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="multi-card-container grid-1fr-1fr-1fr">
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    order: <a href='#' onClick={this._changeOrder}>{orderOption.name}</a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    sort: <a href='#' onClick={this._changeSort}>{sortOption.name}</a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-wrapper">
                                <div className="card-content">
                                    trend: <a href='#' onClick={this._changeTrend}>{trendOption.name}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        (data.currencies && data.currencies.length > 0) && data.currencies.map( (o, index) =>
                        <CurrencyCard {...o}
                            fiatCurrency={ fiatCurrency }
                            key={ index }
                            onClickCurrency={ e => this._handleCurrencyClick(e, o.name) }
                            selected={ (selectedCurrency == o.name) }
                        />
                        )
                    }
                    <div className={`modal ${(showOptions? 'active': '')}`}>
                        <div className="multi-card-container grid-1fr-1fr">
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        <a href="#" onClick={ this._toggleOptions }>settings</a>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-wrapper">
                                    <div className="card-content">
                                        version: 0.1.0 alpha
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
