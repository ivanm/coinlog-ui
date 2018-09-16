export const changePercentage = (data) => {
    if (!data) {
        return 0;
    }
    return(-(100- (data.close[(data.close.length - 1)]*100/data.open[0])));
}

export const latestPrice = (data) => {
    return(data.close[(data.close.length - 1)]);
}
