function Layout({ children }) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <header className="p-4 bg-white shadow text-center text-xl font-semibold">
          🎸 Guitar Shop
        </header>
        <main className="p-4">{children}</main>
        <footer className="p-4 bg-white text-center text-sm text-gray-500 border-t">
          © 2025 Guitar Shop
        </footer>
      </div>
    );
  }
  
  export default Layout;
 