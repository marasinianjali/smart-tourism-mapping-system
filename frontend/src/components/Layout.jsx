import Navbar from "./Navbar";

function Layout({ children }) {
    return (
        <div>
            <Navbar />

            <main className="max-w-5xl mx-auto p-6">
                {children}
            </main>
        </div>
    );
}

export default Layout;