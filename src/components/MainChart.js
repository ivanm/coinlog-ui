import React from 'react';
import PropTypes from 'prop-types';
import Plot from 'react-plotly.js';

const MainChart = ({ dataGraph, layoutGraph }) => (
    <Plot data={dataGraph} layout={layoutGraph} />
);

MainChart.propTypes = {
    dataGraph: PropTypes.array,
    layoutGraph: PropTypes.object
};

export default MainChart;
