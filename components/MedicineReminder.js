'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'; // ✅ removed where()
import { db } from '@/lib/firebase';

export default function MedicineReminder() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // ✅ Fetch ALL medicines for testing
        const snapshot = await getDocs(collection(db, 'medicines'));
        const meds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMedicines(meds);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) return <p>Loading medicine reminders...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-blue-600 mb-4">💊 Medicine Reminders</h2>

      {medicines.length === 0 ? (
        <p className="text-gray-500 text-sm">No medicine reminders assigned yet.</p>
      ) : (
        <ul className="space-y-3">
          {medicines.map((med) => (
            <li key={med.id} className="border p-3 rounded-md bg-gray-50">
              <p className="font-bold text-gray-900">{med.medicineName}</p>
              <p className="text-sm text-gray-600">🩺 Given by: {med.doctorName}</p>
              <p className="text-sm text-gray-600">⏰ Time to Take: {med.time}</p>
              <p className="text-sm text-gray-600">🦠 For: {med.disease || 'Not specified'}</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

