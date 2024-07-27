import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <h1>정처기 찢었다!!</h1>
        </header>
    );
};

const headerStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#9b9b9b',
    color: '#fff',
    textAlign: 'center',
};

export default Header;
