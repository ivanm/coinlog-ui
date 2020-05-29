import React from 'react';
import PropTypes from 'prop-types';

const CurrencyCard = ({
    name,
    trendFormatted,
    trend,
    priceFormatted,
    onClickCurrency,
    selected,
    style
}) => {
    const trendClass = trend > 0 ? 'green-trend' : 'red-trend';
    return (
        <div
            onClick={onClickCurrency}
            className={
                'currency-card link-hover' + (selected ? ' card-selected' : '')
            }
            style={style}>
            <div className="currency-code link-hover-underline">
                <span className="currency-selector">{selected && '▸ '}</span>
                {name}
            </div>
            <div className={'currency-price'}>{priceFormatted}</div>
            <div className={'currency-trend ' + trendClass}>
                {trend > 0 && '+'}
                {trendFormatted}%
            </div>
        </div>
    );
};

CurrencyCard.propTypes = {
    name: PropTypes.string,
    trendFormatted: PropTypes.string,
    trend: PropTypes.number,
    priceFormatted: PropTypes.string,
    onClickCurrency: PropTypes.func,
    selected: PropTypes.bool,
    style: PropTypes.object
};

export default CurrencyCard;
