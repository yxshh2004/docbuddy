export default function Profile() {
  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm border p-6">
      <div className="border-b border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
      </div>

      <div className="flex items-center space-x-4">
        <img src="https://via.placeholder.com/80" className="w-20 h-20 rounded-full object-cover" alt="Profile" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-600">john.doe@email.com</p>
          <button className="mt-2 border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded-md text-sm">
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection title="Personal Information" fields={{
          'Full Name': 'John Doe',
          Email: 'john.doe@email.com',
          Phone: '+1 (555) 123-4567'
        }} />
        <ProfileSection title="Medical Information" fields={{
          'Date of Birth': 'January 15, 1990',
          'Blood Type': 'O+',
          Allergies: 'Penicillin, Shellfish'
        }} />
      </div>

      <div className="flex justify-end space-x-4">
        <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md">Cancel</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Save Changes</button>
      </div>
    </div>
  );
}

function ProfileSection({ title, fields }) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      {Object.entries(fields).map(([label, value]) => (
        <div key={label} className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="p-2 border border-gray-300 rounded-md bg-gray-50">{value}</div>
        </div>
      ))}
    </div>
  );
}
