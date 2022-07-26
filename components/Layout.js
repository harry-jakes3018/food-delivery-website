import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
    return (
        <div>
            <Header />
            <Footer />
        </div>
    );
}

export default Layout;
