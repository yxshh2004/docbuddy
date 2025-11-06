'use client';
import { useEffect, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import doctors from '../../doctors.json';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    specialization: '',
    date: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const router = useRouter();

  const specializationList = [
    'General Physician', 'Pediatrics', 'Cardiology', 'Endocrinology',
    'Gastroenterology', 'Hematology', 'Neurology', 'Oncology',
    'Pulmonology', 'Rheumatology', 'ENT', 'Radiology',
    'Dermatology', 'Psychiatrist', 'Obstetrics and Gynecology', 'Ophthalmology'
  ];

  // 🔹 Watch auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        alert('Please sign in to book an appointment.');
        router.push(`/sign-in?redirect=/book-appointment`);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // 🔹 Filter doctors when specialization changes
  useEffect(() => {
    if (formData.specialization) {
      const filtered = doctors.filter(doc =>
        doc.specialization?.toLowerCase() === formData.specialization.toLowerCase()
      );
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors([]);
    }
  }, [formData.specialization]);

  // 🔹 Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!user) throw new Error('You must be signed in to book.');

      const appointment = {
        userId: user.uid,
        ...formData,
        status: 'upcoming',
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, 'appointments'), appointment);

      // ✅ Notify API
      await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: user.email,
          specialization: formData.specialization,
          date: formData.date,
        }),
      });

      setSuccess(true);
      setFormData({ name: '', phone: '', city: '', specialization: '', date: '' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  // 🔹 Book directly with selected doctor + slot
  const bookWithDoctor = async () => {
    if (!user) return alert('Please sign in first.');
    if (!selectedSlot) return alert('Please select a slot.');

    const appointment = {
      userId: user.uid,
      ...formData,
      date: formData.date || new Date().toISOString().split('T')[0],
      slot: selectedSlot,
      doctor: {
        name: selectedDoctor.name,
        specialization: selectedDoctor.specialization,
        clinic: selectedDoctor.clinicName,
        address: selectedDoctor.address,
      },
      status: 'upcoming',
      createdAt: Timestamp.now(),
    };

    await addDoc(collection(db, 'appointments'), appointment);

    // ✅ Notify API
    await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: user.email,
        doctor: selectedDoctor.name,
        slot: selectedSlot,
        date: appointment.date,
      }),
    });

    alert(`✅ Appointment booked with Dr. ${selectedDoctor.name}`);
    setSelectedDoctor(null); // Close modal
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-10 rounded shadow">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Book Appointment</h1>

      {success && <p className="text-green-600 text-center mb-4">✅ Appointment booked successfully!</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <select name="specialization" value={formData.specialization} onChange={handleChange} required className="w-full border rounded px-4 py-2">
          <option value="" disabled>Select Doctor Specialization</option>
          {specializationList.map((spec, index) => (
            <option key={index} value={spec}>{spec}</option>
          ))}
        </select>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border rounded px-4 py-2" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-4">
          Book Appointment
        </button>
      </form>

      {/* Suggested doctors list */}
      {filteredDoctors.length > 0 && (
        <div className="mt-6 border rounded p-4 bg-gray-50">
          <p className="text-lg font-semibold mb-3">Suggested Doctors:</p>
          <ul className="space-y-4">
            {filteredDoctors.map((doc, idx) => (
              <li key={idx} className="p-3 border rounded bg-white shadow flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={doc.image} alt={doc.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.specialization} - {doc.clinicName}</p>
                    <p className="text-xs text-gray-500">{doc.address}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoctor(doc)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Doctor Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setSelectedDoctor(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <div className="flex space-x-4">
              <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-24 h-24 rounded-full object-cover" />
              <div>
                <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
                <p>{selectedDoctor.specialization}</p>
                <p>Age: {selectedDoctor.age || '50'}</p>
                <p>Experience: {selectedDoctor.experience} </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block font-semibold">Select Available Slot:</label>
              <select
                className="border rounded px-3 py-2 w-full mt-1"
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value)}
              >
                <option value="">Choose a time</option>
                {selectedDoctor.slots?.length ? (
                  selectedDoctor.slots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))
                ) : (
                  <>
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                    <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                    <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                    <option value="03:00 PM - 03:30 PM">03:00 PM - 03:30 PM</option>
                  </>
                )}
              </select>
            </div>

            <button
              onClick={bookWithDoctor}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Select
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

