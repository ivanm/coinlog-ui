import React from 'react';
import PropTypes from 'prop-types';
import CurrencyBlock from './CurrencyBlock';

const CurrencyBlocks = ({
    data,
    historicKey,
    fiatCurrency,
    onCurrencyClick,
    selectedCurrency
}) => (
    <div className="overflow-wrapper">
        {data.currencies.map(
            (currency, index) =>
                data[historicKey][currency] && (
                    <CurrencyBlock
                        {...data[historicKey][currency]}
                        name={currency}
                        fiatCurrency={fiatCurrency}
                        key={index}
                        onClickCurrency={onCurrencyClick(currency)}
                        selected={selectedCurrency == currency}
                    />
                )
        )}
    </div>
);

CurrencyBlocks.propTypes = {
    data: PropTypes.object,
    historicKey: PropTypes.string,
    fiatCurrency: PropTypes.string,
    onCurrencyClick: PropTypes.func,
    selectedCurrency: PropTypes.string
};

export default CurrencyBlocks;
