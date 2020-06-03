import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Row = ({ isHidden, children, gridTemplateColumns, className }) => (
    <div
        className={cn(`${className} blocks-row`, {
            hidden: isHidden
        })}
        style={{
            ...(gridTemplateColumns ? { gridTemplateColumns } : {})
        }}>
        {children}
    </div>
);

Row.propTypes = {
    gridTemplateColumns: PropTypes.string,
    isHidden: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.sting
};

Row.defaultProps = {
    isHidden: false,
    className: ''
};

export default Row;
