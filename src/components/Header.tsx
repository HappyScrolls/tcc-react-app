import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <h1>My React App</h1>
        </header>
    );
};

const headerStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
};

export default Header;
