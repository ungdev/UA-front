import React from 'react';

const BoxContainer = ({ title, children }) => {
    return (
        <div className="box-container">
            <div className="box-title">{title}</div>
            <div className="box-content">
                {children}
            </div>
        </div>
    );  
};

export default BoxContainer;