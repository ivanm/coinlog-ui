import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Modal = ({ isActive, children, className }) => {
    return (
        <div
            className={cn(`${className} modal`, {
                'modal-active': isActive
            })}>
            {children}
        </div>
    );
};

Modal.propTypes = {
    isActive: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
};

Modal.defaultProps = {
    isActive: false,
    className: '',
};

export default Modal;
