import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Block from './Block';

const BlockSelect = ({
    label,
    options,
    selectedValue,
    setSelectedValue,
    className,
    onEnter,
    onExit
}) => {
    const [active, setActive] = useState(false);
    const handleParentClick = () => {
        if (active) {
            setActive(false);
            onExit();
        } else {
            setActive(true);
            onEnter();
        }
    };
    const handleChildrenClick = value => {
        setSelectedValue(value);
        setActive(false);
        onExit();
    };
    return (
        <Fragment>
            <div
                style={{
                    zIndex: 2
                }}>
                <Block className={className} onClick={handleParentClick}>
                    {label}
                    <span className="title-dot">: </span>
                    {options.find(({ value }) => value == selectedValue).name}
                </Block>
                {active && (
                    <div
                        className="block-select-options"
                        style={{
                            height: 100,
                            overflow: 'auto'
                        }}>
                        {options.map(({ name, value }) => (
                            <Block
                                key={value}
                                onClick={() => {
                                    handleChildrenClick(value);
                                }}>
                                {label}
                                <span className="title-dot">: </span>
                                {name}
                            </Block>
                        ))}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

BlockSelect.propTypes = {
    label: PropTypes.string,
    options: PropTypes.array,
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    setSelectedValue: PropTypes.func,
    className: PropTypes.string,
    onEnter: PropTypes.func,
    onExit: PropTypes.func
};

BlockSelect.defaultProps = {
    className: ''
};

export default BlockSelect;
