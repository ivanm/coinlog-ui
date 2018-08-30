import React from "react";

class CurrencyCard extends React.Component {

    render() {
        const { code, trend, priceFormatted, fiatCurrency } = this.props;
        const trendClass = trend > 0 ? 'green-trend' : 'red-trend';

        return(
            <div className="currency-card">
                <div className="currency-code">
                    <a href="#">{code}</a>
                </div>
                <div className={"currency-price"}>
                   {priceFormatted}
                </div>
                <div className={"currency-trend "+trendClass}>
                    {trend > 0 ? "+":""}{trend}%
                </div>
            </div>
        )
    }
}
export default CurrencyCard;
