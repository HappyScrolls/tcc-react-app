import React, {ReactNode} from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={layoutStyle}>
            <Header />
            <main style={mainStyle}>{children}</main>
            <Footer />
        </div>
    );
};
const layoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
};

const mainStyle: React.CSSProperties = {
    flex: 1,
    padding: '20px',
};

export default Layout;
