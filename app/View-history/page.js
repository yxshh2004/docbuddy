export const metadata = {
  title: "View History - Doctor Buddy",
};

export default function ViewHistoryPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow">
        <div className="text-xl font-bold">
          <i className="fas fa-stethoscope mr-2"></i>Doctor Buddy
        </div>
        <div className="space-x-6 text-lg">
          <a href="/login" className="hover:underline">
            <i className="fas fa-sign-in-alt mr-1"></i>Login
          </a>
          <a href="/book-appointment" className="hover:underline">
            <i className="fas fa-calendar-plus mr-1"></i>Book
          </a>
          <a href="/view-history" className="hover:underline">
            <i className="fas fa-history mr-1"></i>History
          </a>
        </div>
      </nav>

      {/* History Table */}
      <div className="max-w-4xl mx-auto mt-12 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Appointment History</h2>
        <table className="min-w-full text-left border">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Doctor</th>
              <th className="py-2 px-4 border">Specialization</th>
              <th className="py-2 px-4 border">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="py-2 px-4 border">2025-06-10</td>
              <td className="py-2 px-4 border">Dr. Sharma</td>
              <td className="py-2 px-4 border">Cardiology</td>
              <td className="py-2 px-4 border text-green-600 font-semibold">Completed</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border">2025-06-15</td>
              <td className="py-2 px-4 border">Dr. Mehta</td>
              <td className="py-2 px-4 border">Dermatology</td>
              <td className="py-2 px-4 border text-yellow-600 font-semibold">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

