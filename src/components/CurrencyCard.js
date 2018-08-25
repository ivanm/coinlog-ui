import React from "react";

class CurrencyCard extends React.Component {

    render() {
        const { code, trends, currentTrend} = this.props;
        const trend = trends[currentTrend];
        const trendClass = trend > 0 ? 'green-trend' : 'red-trend';

        return(
            <div className="currency-card">
                <div className="currency-code">
                    <a href="#">{code}</a>
                </div>
                <div className={"currency-trend "+trendClass}>
                    {trend > 0 ? "+":""}{trend}%
                </div>
            </div>
        )
    }
}
export default CurrencyCard;
