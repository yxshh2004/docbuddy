'use client';

import { useEffect, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    disease: '',
    date: '',
    time: '',
    location: ''
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const address = data.display_name || `Lat: ${latitude.toFixed(3)}, Lon: ${longitude.toFixed(3)}`;
              setFormData((prev) => ({ ...prev, location: address }));
            })
            .catch(() => {
              setFormData((prev) => ({ ...prev, location: `Lat: ${latitude.toFixed(3)}, Lon: ${longitude.toFixed(3)}` }));
            });
        },
        () => {
          console.warn('Location permission denied');
        }
      );
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!user) throw new Error('You must be signed in to book.');

      await addDoc(collection(db, 'appointments'), {
        userId: user.uid,
        ...formData,
        status: 'upcoming',
        createdAt: Timestamp.now()
      });

      setSuccess(true);
      setFormData({ name: '', phone: '', city: '', disease: '', date: '', time: '', location: '' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError(err.message);
    }
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
        <input type="text" name="disease" placeholder="Describe your issue" value={formData.disease} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required className="w-full border rounded px-4 py-2" />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Submit</button>
      </form>
    </div>
  );
}



