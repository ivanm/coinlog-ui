import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Block = ({ isCentered, onClick, children }) => {
    return (
        <div
            className={cn('block', {
                'block-centered': isCentered,
                'block-clickable': onClick
            })}
            onClick={onClick}>
            {children}
        </div>
    );
};

Block.propTypes = {
    isCentered: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node
};

Block.defaultProps = {
    isClickable: false,
    isCentered: true
};

export default Block;
