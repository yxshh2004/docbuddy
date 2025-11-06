'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export default function SelectDoctorPage() {
  const searchParams = useSearchParams();
  const specialization = searchParams.get('specialization');
  const mode = searchParams.get('mode'); // "video" or "chat"
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const contact = searchParams.get('contact'); 

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Example doctor data with mode availability
    const allDoctors = [
      {
        name: 'Dr. Aarti Sharma',
        specialty: 'Cardiology',
        experience: '12 years',
        rating: 4.8,
        availability: 'Mon–Fri, 10 AM – 6 PM',
        mode: 'video',
      },
      {
        name: 'Dr. Ravi Singh',
        specialty: 'Cardiology',
        experience: '8 years',
        rating: 4.6,
        availability: 'Mon–Sat, 9 AM – 5 PM',
        mode: 'video',
      },
      {
        name: 'Dr. Meera Patel',
        specialty: 'General Physician',
        experience: '5 years',
        rating: 4.5,
        availability: 'Daily, 9 AM – 8 PM',
        mode: 'video',
      },
      {
        name: 'Dr. Sanjay Verma',
        specialty: 'General Physician',
        experience: '9 years',
        rating: 4.7,
        availability: 'Daily, 10 AM – 7 PM',
        mode: 'chat',
      },
    ];

    // Filter doctors by specialization and mode
    const filtered = allDoctors.filter(
      (doc) => doc.specialty === specialization && doc.mode === mode
    );
    setDoctors(filtered);
  }, [specialization, mode]);

  const handlePayAndStart = (doctor) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key
        amount: 10000, // ₹100 in paise
        currency: 'INR',
        name: 'DoctorBuddy',
        description: `Consultation with ${doctor.name} (${doctor.mode})`,
        handler: async function (response) {
          try {
            await addDoc(collection(db, 'paymentLogs'), {
              doctorName: doctor.name,
              doctorSpecialty: doctor.specialty,
              experience: doctor.experience,
              mode: doctor.mode,
              patientName: name,
              patientEmail: email,
              patientContact: contact,
              paymentId: response.razorpay_payment_id,
              amount: 100,
              paidAt: Timestamp.now(),
            });
            alert(`✅ Payment Successful! Consultation started with ${doctor.name}`);
          } catch (error) {
            console.error('Error saving payment log:', error);
          }
        },
        prefill: {
          name: name || '',
          email: email || '',
          contact: contact || '',
        },
        theme: { color: '#1e40af' },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    };
    script.onerror = () => {
      alert('Failed to load Razorpay. Please try again later.');
    };
    document.body.appendChild(script);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        Select Doctor ({specialization} - {mode === 'video' ? 'Video Call' : 'Chat'})
      </h2>

      {doctors.length === 0 && <p className="text-gray-500">No doctors available for this selection.</p>}

      {doctors.map((doc, idx) => (
        <div key={idx} className="border p-4 rounded mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{doc.name}</h3>
            <p>{doc.specialty}</p>
            <p>{doc.experience} experience</p>
            <p>Availability: {doc.availability}</p>
            <p className="text-sm text-gray-500">Mode: {doc.mode === 'video' ? 'Video Call' : 'Chat'}</p>
            <div className="flex items-center text-yellow-500">
              {Array.from({ length: Math.round(doc.rating) }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
              <span className="ml-2 text-gray-600">{doc.rating}</span>
            </div>
          </div>
          <Button
            className="bg-green-600 text-white"
            onClick={() => handlePayAndStart(doc)}
          >
            Pay ₹100 & Start
          </Button>
        </div>
      ))}
    </div>
  );
}


