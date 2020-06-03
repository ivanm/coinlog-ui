import React from 'react';
import PropTypes from 'prop-types';
import Modal from './blocks/Modal';
import Row from './blocks/Row';
import Column from './blocks/Column';
import Block from './blocks/Block';

const SettingsModal = ({ isActive, toggleActive }) => (
    <Modal isActive={isActive}>
        <Column gridTemplateRows="2.5rem 2.5rem 1fr" style={{ height: '100%' }}>
            <Row gridTemplateColumns="40px 1fr 1fr">
                <Block onClick={toggleActive}>⬅</Block>
                <Block>settings</Block>
                <Block>v: 0.1.0 alpha</Block>
            </Row>
            <Row gridTemplateColumns="1fr 1fr 1fr">
                <Block>api</Block>
                <Block>display</Block>
                <Block>about</Block>
            </Row>
            <Row>-</Row>
        </Column>
    </Modal>
);

SettingsModal.propTypes = {
    isActive: PropTypes.bool,
    toggleActive: PropTypes.func
};

SettingsModal.defaultProps = {
    isActive: false,
    className: ''
};

export default SettingsModal;
