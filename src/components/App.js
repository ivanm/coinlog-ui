import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import CurrencyBlocks from './CurrencyBlocks';
import SettingsModal from './SettingsModal';
import SelectedFieldModal from './SelectedFieldModal';
import MainChart from './MainChart';

// blocks
import Block from './blocks/Block';
import BlockSegment from './blocks/BlockSegment';
import BlockSelect from './blocks/BlockSelect';
import Row from './blocks/Row';
import Column from './blocks/Column';

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshCurrency, orderCurrencies } from '../redux/actions/dataActions';

const App = ({ data, refreshCurrency, orderCurrencies }) => {
    const [filters, setFilters] = useState({
        fiatCurrency: 'USD',
        orderOptions: [
            { id: 'price', name: 'price' },
            { id: 'trend', name: 'trend' },
            { id: 'name', name: 'name' }
        ],
        sortOptions: [
            { id: 'asc', name: '▼' },
            { id: 'desc', name: '▲' }
        ],
        trendOptions: [
            { value: '1h', name: '1h' },
            { value: '24h', name: '24h' },
            { value: '7d', name: '7d' },
            { value: '30d', name: '30d' }
        ],
        order: 'trend',
        sort: 'desc',
        trend: '24h',
        showOptions: false,
        selectedCurrency: null
    });

    const [graphSize, setGraphSize] = useState({
        width: null,
        height: null
    });
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const [currencyCardScrollTop, setCurrencyCardScrollTop] = useState(0);
    const [selectedField, setSelectedField] = useState(null);

    const {
        fiatCurrency,
        orderOptions,
        order,
        sortOptions,
        sort,
        trendOptions,
        trend,
        showOptions,
        selectedCurrency
    } = filters;

    useEffect(() => {
        resize();
        window.addEventListener('resize', () => {
            resize();
        });
        window.addEventListener('load', () => {
            window.history.pushState({}, '');
        });
        window.addEventListener('popstate', () => {
            window.history.pushState({}, '');
        });
        Promise.all(
            data.currencies.map(el => refreshCurrency(el, fiatCurrency, trend))
        );
        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    useEffect(() => {
        orderCurrencies(order, sort, trend);
    }, [sort, order]);

    useEffect(() => {
        orderCurrencies(order, sort, trend);
        Promise.all(
            data.currencies.map(el => refreshCurrency(el, fiatCurrency, trend))
        );
    }, [trend]);

    useEffect(() => {
        resize();
    }, [selectedCurrency]);

    const isMobileView = windowSize.width < 600;
    const isHidingonMobile = isMobileView && selectedCurrency;

    const resize = () => {
        setGraphSize({
            width: document.getElementById('data-viewport')
                ? document.getElementById('data-viewport').offsetWidth - 40
                : graphSize.width,
            height: document.getElementById('data-viewport')
                ? document.getElementById('data-viewport').offsetHeight - 40
                : graphSize.height
        });
        setWindowSize({
            height: window.innerHeight,
            width: window.innerWidth
        });
    };

    const changeOrder = () => {
        const orderIndex = orderOptions.findIndex(el => el.id == order);
        setFilters({
            ...filters,
            order:
                orderOptions[
                    orderIndex == orderOptions.length - 1 ? 0 : orderIndex + 1
                ].id
        });
    };

    const changeSort = () => {
        const sortIndex = sortOptions.findIndex(el => el.id == sort);
        setFilters({
            ...filters,
            sort:
                sortOptions[
                    sortIndex == sortOptions.length - 1 ? 0 : sortIndex + 1
                ].id
        });
    };

    const setTrend = trend => {
        setFilters({
            ...filters,
            trend
        });
    };

    const toggleOptions = () => {
        setFilters({ ...filters, showOptions: !showOptions });
    };

    const handleCurrencyClick = newSelectedCurrency => e => {
        if (isMobileView) {
            if (selectedCurrency) {
                const o = e.target.parentNode;
                setTimeout(() => o.scrollTo(0, currencyCardScrollTop), 1);
            } else {
                setCurrencyCardScrollTop(e.target.parentNode.scrollTop);
            }
        }
        setFilters({
            ...filters,
            selectedCurrency:
                selectedCurrency != newSelectedCurrency
                    ? newSelectedCurrency
                    : null
        });
    };

    const logoClick = () => {
        setFilters({ ...filters, selectedCurrency: null });
    };

    const historicKey = `historic${trend}`;

    const orderOption = orderOptions.find(el => el.id == order);
    const sortOption = sortOptions.find(el => el.id == sort);

    const rangeDates = data[historicKey][selectedCurrency]
        ? [
              data[historicKey][selectedCurrency].date[0],
              data[historicKey][selectedCurrency].date[
                  data[historicKey][selectedCurrency].date.length
              ]
          ]
        : [];

    const layoutGraph = {
        width: graphSize.width,
        height: graphSize.height,
        dragmode: 'zoom',
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 30
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

    const dataGraph = data[historicKey][selectedCurrency]
        ? [
              {
                  x: data[historicKey][selectedCurrency].date,
                  close: data[historicKey][selectedCurrency].close,
                  decreasing: { line: { color: '#af4d4d', width: 1 } },
                  high: data[historicKey][selectedCurrency].high,
                  increasing: { line: { color: '#5ea35e', width: 1 } },
                  line: { color: 'red' },
                  low: data[historicKey][selectedCurrency].low,
                  open: data[historicKey][selectedCurrency].open,
                  type: 'candlestick',
                  xaxis: 'x',
                  yaxis: 'y',
                  hoverlabel: {
                      bgcolor: '#2a2b2d',
                      font: { family: 'monospace', color: '#bfc4cc' }
                  }
              }
          ]
        : [];

    return (
        <Row
            className="default-theme default-font"
            gridTemplateColumns={isMobileView ? '1fr 0fr' : '2fr 3fr'}
            style={{ height: windowSize.height, margin: 0, gridGap: 0 }}>
            <Column
                style={{
                    overflow: 'hidden'
                }}
                gridTemplateRows={
                    isMobileView
                        ? selectedCurrency
                            ? '40px 0px 49px 92px 1fr 40px'
                            : '40px 40px 49px 1fr 40px'
                        : '40px 40px 49px 1fr 40px'
                }>
                <Row gridTemplateColumns="40px 1fr">
                    <Block
                        isCentered
                        className="clickable-no-underline bg-color-title"
                        onClick={selectedCurrency ? logoClick : toggleOptions}>
                        {!selectedCurrency ? ' ☰ ' : '⬅'}
                    </Block>
                    <Block isCentered={false}>
                        <BlockSegment className="bg-color-title px-2">
                            <span onClick={logoClick} className="clickable">
                                <span>
                                    coinlog
                                    <span className="title-dot">.</span>
                                    sh
                                </span>
                            </span>
                        </BlockSegment>
                        <BlockSegment className="block-segment-arrow" />
                    </Block>
                </Row>
                <Row gridTemplateColumns="1fr 1fr 1fr">
                    <Block onClick={changeOrder}>
                        order
                        <span className="title-dot">: </span>
                        {orderOption.name}
                    </Block>
                    <Block onClick={changeSort}>
                        sort
                        <span className="title-dot">: </span>
                        {sortOption.name}
                    </Block>
                    <Block>
                        view<span className="title-dot">: </span>cards
                    </Block>
                </Row>
                <Row
                    gridTemplateColumns="1fr 2fr"
                    style={{ marginBottom: '0.5rem' }}>
                    <BlockSelect
                        label="trend"
                        options={trendOptions}
                        selectedValue={trend}
                        setSelectedValue={setTrend}
                        onEnter={() => {
                            setSelectedField('trend');
                        }}
                        onExit={() => {
                            setSelectedField(null);
                        }}
                    />
                    <Block>
                        api<span className="title-dot">: </span>cryptocompare
                    </Block>
                </Row>
                <CurrencyBlocks
                    data={
                        isHidingonMobile
                            ? {
                                  ...data,
                                  currencies: data.currencies.filter(
                                      currency => currency == selectedCurrency
                                  )
                              }
                            : data
                    }
                    historicKey={historicKey}
                    fiatCurrency={fiatCurrency}
                    onCurrencyClick={handleCurrencyClick}
                    selectedCurrency={selectedCurrency}
                />
                {isHidingonMobile && (
                    <Row
                        gridTemplateColumns="1fr"
                        className="bg-color-secondary"
                        style={{
                            padding: '0.5rem',
                            marginTop: '0.5rem',
                            marginBottom: 0
                        }}>
                        <Block
                            className="bg-color-secondary border-color-secondary"
                            height="auto">
                            <div id="data-viewport">
                                {selectedCurrency &&
                                    graphSize.width &&
                                    graphSize.height && (
                                        <MainChart
                                            dataGraph={dataGraph}
                                            layoutGraph={layoutGraph}
                                        />
                                    )}
                            </div>
                        </Block>
                    </Row>
                )}
                <Row style={{}}>
                    <Block className="bg-color-backround-darker">
                        latest update: 2 min ago
                    </Block>
                </Row>
                <SettingsModal
                    isActive={showOptions}
                    toggleActive={toggleOptions}
                />
                <SelectedFieldModal isActive={!!selectedField} />
            </Column>
            {!isMobileView && (
                <Column gridTemplateRows="1fr" className="bg-color-secondary">
                    <Row gridTemplateColumns="1fr">
                        <Block
                            className="bg-color-secondary border-color-secondary"
                            height="auto"
                            style={{ marginBottom: '0.5rem' }}>
                            <div
                                id="data-viewport"
                                style={{
                                    maxHeight: '70vh'
                                }}>
                                {selectedCurrency &&
                                    graphSize.width &&
                                    graphSize.height && (
                                        <MainChart
                                            dataGraph={dataGraph}
                                            layoutGraph={layoutGraph}
                                        />
                                    )}
                            </div>
                        </Block>
                    </Row>
                </Column>
            )}
        </Row>
    );
};

App.propTypes = {
    data: PropTypes.object.isRequired,
    refreshCurrency: PropTypes.func.isRequired,
    orderCurrencies: PropTypes.func.isRequired
};

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = dispatch => ({
    refreshCurrency: bindActionCreators(refreshCurrency, dispatch),
    orderCurrencies: bindActionCreators(orderCurrencies, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

export { App };
