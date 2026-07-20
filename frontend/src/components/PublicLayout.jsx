import PublicNavbar from "./PublicNavbar";

function PublicLayout({ children }) {
    return (
        <>
            <PublicNavbar />

            <main className="pt-24">
                {children}
            </main>
        </>
    );
}

export default PublicLayout;