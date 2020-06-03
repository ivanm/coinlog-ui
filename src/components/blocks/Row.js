import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Row = ({ isHidden, children, gridTemplateColumns, className, style }) => (
    <div
        className={cn(`${className} blocks-row`, {
            hidden: isHidden
        })}
        style={{
            ...(gridTemplateColumns ? { gridTemplateColumns } : {}),
            ...style
        }}>
        {children}
    </div>
);

Row.propTypes = {
    gridTemplateColumns: PropTypes.string,
    isHidden: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.sting,
    style: PropTypes.object
};

Row.defaultProps = {
    isHidden: false,
    className: '',
    style: {}
};

export default Row;
