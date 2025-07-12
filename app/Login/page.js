export const metadata = {
  title: "login - Doctor Buddy",
};

export default function loginPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow">
        <div className="text-xl font-bold">
          <i className="fas fa-stethoscope mr-2"></i>Doctor Buddy
        </div>
        <div className="space-x-6 text-lg">
          <a href="/login" className="hover:underline">
            <i className="fas fa-sign-in-alt mr-1"></i>login
          </a>
          <a href="/book-appointment" className="hover:underline">
            <i className="fas fa-calendar-plus mr-1"></i>Book
          </a>
          <a href="/view-history" className="hover:underline">
            <i className="fas fa-history mr-1"></i>History
          </a>
        </div>
      </nav>

      {/* Login Form */}
      <div className="max-w-md mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

