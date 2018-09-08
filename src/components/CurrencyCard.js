import React from "react";

class CurrencyCard extends React.Component {

    render() {
        const { name, trendFormatted, trend, priceFormatted, fiatCurrency, onClickCurrency, selected } = this.props;
        const trendClass = trend > 0 ? 'green-trend' : 'red-trend';

        return(
            <div className="currency-card">
                <div className="currency-code">
                    <span className="currency-selector">{ selected && "▸" }</span> <a href="#" onClick={onClickCurrency}>{name}</a>
                </div>
                <div className={"currency-price"}>
                   {priceFormatted}
                </div>
                <div className={"currency-trend "+trendClass}>
                    { (trend > 0) && "+" }{trendFormatted}%
                </div>
            </div>
        )
    }
}
export default CurrencyCard;
