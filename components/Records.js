export default function Records() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Health Records</h2>
        <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm">
          <i className="fas fa-download mr-2"></i> Export All
        </button>
      </div>
      <div className="space-y-4">
        {['Blood Test Results', 'Chest X-Ray', 'Prescription - Antibiotics'].map((record, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <i className="fas fa-file-medical text-blue-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{record}</h3>
                <p className="text-gray-600">Dr. Example Name</p>
                <p className="text-sm text-gray-500 mt-1">2024-01-10 • Report</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm">View</button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm">
                <i className="fas fa-download"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
