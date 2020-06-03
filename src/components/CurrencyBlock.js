import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Block from './blocks/Block';

const CurrencyBlock = ({
    name,
    trendFormatted,
    trend,
    priceFormatted,
    onClickCurrency,
    selected
}) => {
    const trendClass = trend > 0 ? 'green-trend' : 'red-trend';
    return (
        <Block
            onClick={onClickCurrency}
            isCentered
            className={cn('clickable-no-underline mx-2 mb-2 py-2 h-auto', {
                'block-selected': selected
            })}
            height="auto">
            <div className="flex-column-wrapper">
                <div className="currency-code">
                    <span className="selector">
                        {selected && '▸ '}
                    </span>
                    {name}
                </div>
                <div className={'currency-price'}>{priceFormatted}</div>
                <div className={'currency-trend ' + trendClass}>
                    {trend > 0 && '+'}
                    {trendFormatted}%
                </div>
            </div>
        </Block>
    );
};

CurrencyBlock.propTypes = {
    name: PropTypes.string,
    trendFormatted: PropTypes.string,
    trend: PropTypes.number,
    priceFormatted: PropTypes.string,
    onClickCurrency: PropTypes.func,
    selected: PropTypes.bool
};

export default CurrencyBlock;
