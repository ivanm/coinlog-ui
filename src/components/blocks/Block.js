import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Block = ({
    isCentered,
    onClick,
    children,
    width,
    height,
    className,
    id,
    style
}) => {
    return (
        <div
            id={id}
            className={cn(`${className} block`, {
                'block-centered': isCentered,
                clickable: !!onClick
            })}
            style={{
                ...(width ? { width } : {}),
                ...(height ? { height } : {}),
                ...style
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
    className: PropTypes.string,
    id: PropTypes.string,
    style: PropTypes.object
};

Block.defaultProps = {
    isCentered: true,
    className: '',
    height: '33px',
    style: {}
};

export default Block;
