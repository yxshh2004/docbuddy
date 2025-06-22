// components/Overview.js
export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Next Appointment" value="Today" description="2:30 PM with Dr. Sarah Johnson" icon="fa-calendar-alt" />
        <Card title="Total Consultations" value="12" description="This year" icon="fa-video" />
        <Card title="Health Score" value="85%" description="Good health indicators" icon="fa-heart" />
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
            <i className="fas fa-plus mr-2"></i> Book New
          </button>
        </div>
        <div className="p-6 space-y-4">
          {/* Appointment Cards */}
          <AppointmentCard
            name="Dr. Sarah Johnson"
            specialty="Cardiologist"
            date="2024-01-15"
            time="2:30 PM"
            status="confirmed"
            icon="fa-video"
          />
          <AppointmentCard
            name="Dr. Michael Chen"
            specialty="Dermatologist"
            date="2024-01-18"
            time="10:00 AM"
            status="pending"
            icon="fa-comments"
          />
        </div>
      </div>

      {/* Recent Records */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Recent Health Records</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All <i className="fas fa-chevron-right ml-1"></i>
          </button>
        </div>
        <div className="p-6 space-y-3">
          <Record title="Blood Test Results" doctor="Dr. Emily Rodriguez" date="2024-01-10" />
          <Record title="Chest X-Ray" doctor="Dr. James Wilson" date="2024-01-05" />
          <Record title="Prescription - Antibiotics" doctor="Dr. Emily Rodriguez" date="2024-01-10" />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, description, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <i className={`fas ${icon} text-gray-400 text-2xl`}></i>
    </div>
  );
}

function AppointmentCard({ name, specialty, date, time, status, icon }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow transition">
      <div className="flex items-center space-x-4">
        <img src="https://via.placeholder.com/48" className="w-12 h-12 rounded-full object-cover" alt={name} />
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
          <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
            <span><i className="fas fa-calendar-alt mr-1"></i>{date}</span>
            <span><i className="fas fa-clock mr-1"></i>{time}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>{status}</span>
        <button className="text-blue-600 hover:text-blue-800 p-2 border border-gray-300 rounded">
          <i className={`fas ${icon}`}></i>
        </button>
      </div>
    </div>
  );
}

function Record({ title, doctor, date }) {
  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow transition">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <i className="fas fa-file-medical text-blue-600"></i>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{doctor} • {date}</p>
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <i className="fas fa-download"></i>
      </button>
    </div>
  );
}
