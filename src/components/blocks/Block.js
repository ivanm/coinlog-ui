import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Block = ({ isCentered, onClick, children, width, height, className }) => {
    return (
        <div
            className={cn(`${className} block`, {
                'block-centered': isCentered,
                'clickable': onClick
            })}
            style={{
                ...(width ? { width } : {}),
                ...(height ? { height } : {})
            }}
            onClick={onClick}>
            {children}
        </div>
    );
};

Block.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    isCentered: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.sting
};

Block.defaultProps = {
    isClickable: false,
    isCentered: true,
    className: '',
    height: '33px',
};

export default Block;
