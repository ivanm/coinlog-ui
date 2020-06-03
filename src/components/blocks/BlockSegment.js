import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const BlockSegment = ({ onClick, children, className }) => {
    return (
        <div
            className={cn(`${className} block-segment`, {
                clickable: onClick
            })}
            onClick={onClick}>
            {children}
        </div>
    );
};

BlockSegment.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string
};

BlockSegment.defaultProps = {
    isClickable: false,
    className: ''
};

export default BlockSegment;
