import Sidebar from "../components/sidebar";
export default function DashboardLayout({
  children,
  mobileSidebarOpen,
  toggleMobileSidebar,
  handleLogout,
  user
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-purple-900 text-white transform ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:hidden z-40`}
        aria-hidden={!mobileSidebarOpen}
      >
        <Sidebar handleLogout={handleLogout} />
      </div>

      {/* Main Layout Grid */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-[256px_1fr]">
        {/* Desktop Sidebar */}
        <div className="hidden md:block bg-purple-900 text-white">
          <Sidebar handleLogout={handleLogout} />
        </div>
        
        {/* Content Area */}
        <div className="flex flex-col">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex justify-between items-center px-6 py-4">
              <div className="flex items-center gap-4 md:hidden">
                <button 
                  className="text-gray-600"
                  onClick={toggleMobileSidebar}
                  aria-label={mobileSidebarOpen ? "Close menu" : "Open menu"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h1 className="text-lg font-bold text-purple-900">HerLingua</h1>
              </div>
              
              <div className="hidden md:block">
                <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              </div>
              
              {user && (
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="font-medium text-gray-800">{user.displayName || user.email}</p>
                    <p className="text-sm text-gray-500">German A1 Level</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 font-medium">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <button 
                    className="md:hidden" 
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMobileSidebar}
          aria-hidden="true"
        />
      )}
    </div>
  );
}