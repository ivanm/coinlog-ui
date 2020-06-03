import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Row = ({
    isHidden,
    children,
    gridTemplateColumns,
    className,
    id,
    style
}) => (
    <div
        id={id}
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
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object
};

Row.defaultProps = {
    isHidden: false,
    className: '',
    style: {}
};

export default Row;
