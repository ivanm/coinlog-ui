import React from 'react';
import PropTypes from 'prop-types';
import CurrencyBlock from './CurrencyBlock';
import Block from './blocks/Block';

const CurrencyBlocks = ({
    data,
    historicKey,
    fiatCurrency,
    onCurrencyClick,
    selectedCurrency
}) => (
    <Block
        className="bg-color-backround-darker"
        style={{
            paddingTop: 5,
            marginLeft: 9,
            marginRight: 9,
            overflow: 'auto',
            display: 'block',
            height: 'auto'
        }}>
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
    </Block>
);

CurrencyBlocks.propTypes = {
    data: PropTypes.object,
    historicKey: PropTypes.string,
    fiatCurrency: PropTypes.string,
    onCurrencyClick: PropTypes.func,
    selectedCurrency: PropTypes.string
};

export default CurrencyBlocks;
