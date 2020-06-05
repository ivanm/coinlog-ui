import React from 'react';
import PropTypes from 'prop-types';
import Modal from './blocks/Modal';

const SelectedFieldModal = ({ isActive }) => (
    <Modal isActive={isActive} opacity={0.7} />
);

SelectedFieldModal.propTypes = {
    isActive: PropTypes.bool
};

SelectedFieldModal.defaultProps = {
    isActive: false
};

export default SelectedFieldModal;
