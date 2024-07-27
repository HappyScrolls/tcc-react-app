import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>&copy; 2024 My React App. All rights reserved.</p>
        </footer>
    );
};

const footerStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
};

export default Footer;
