export default function Appointments({ activeSubTab, onChangeTab, onBookAppointment }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={onBookAppointment} // ✅ Uses prop function
        >
          <i className="fas fa-plus mr-2"></i> Book New Appointment
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200 p-2 flex space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeSubTab === 'upcoming' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => onChangeTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              activeSubTab === 'past' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
            onClick={() => onChangeTab('past')}
          >
            Past
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-500">
            Content for <strong>{activeSubTab}</strong> appointments will go here.
          </p>
        </div>
      </div>
    </div>
  );
}

