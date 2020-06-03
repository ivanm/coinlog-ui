import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Column = ({ isHidden, children, gridTemplateRows, className, style }) => (
    <div
        className={cn(`${className} blocks-column`, {
            hidden: isHidden
        })}
        style={{
            ...(gridTemplateRows ? { gridTemplateRows } : {}),
            ...style
        }}>
        {children}
    </div>
);

Column.propTypes = {
    gridTemplateRows: PropTypes.string,
    isHidden: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
};

Column.defaultProps = {
    isHidden: false,
    className: '',
    style: {}
};

export default Column;
