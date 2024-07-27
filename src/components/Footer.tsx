import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>&copy; 2024년 다 잘 될거야!</p>
        </footer>
    );
};

const footerStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 0',
    backgroundColor: '#9b9b9b',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
};

export default Footer;
