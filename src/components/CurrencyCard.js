import React from "react";

class CurrencyCard extends React.Component {

    render() {
        const { name, trendFormatted, trend, priceFormatted, fiatCurrency, onClickCurrency, selected, style, testVal } = this.props;
        const trendClass = trend > 0 ? 'green-trend' : 'red-trend';

        return(
            <div onClick={onClickCurrency} className={"currency-card link-hover"+(selected ? " card-selected" : "")} style={ style }>
                <div className="currency-code link-hover-underline">
                    <span className="currency-selector">{ selected && "▸ " }</span>{name}
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
