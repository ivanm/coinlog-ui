import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Column = ({ isHidden, children, gridTemplateRows }) => (
    <div
        className={cn('blocks-column', {
            hidden: isHidden
        })}
        style={{
            ...(gridTemplateRows ? { gridTemplateRows } : {})
        }}>
        {children}
    </div>
);

Column.propTypes = {
    gridTemplateRows: PropTypes.string,
    isHidden: PropTypes.bool,
    children: PropTypes.node
};

Column.defaultProps = {
    isHidden: false
};

export default Column;
