'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function UploadDoctors() {
  const [status, setStatus] = useState('');

  const handleUpload = async () => {
    try {
      setStatus('Uploading...');
      
      const res = await fetch('/doctors.json');
      const doctors = await res.json();

      for (const doc of doctors) {
        await addDoc(collection(db, 'doctors'), doc);
      }

      setStatus('✅ Doctors uploaded successfully to Firestore!');
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded text-center">
      <h1 className="text-xl font-bold mb-4">Upload Doctors to Firestore</h1>
      <button 
        onClick={handleUpload} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload Doctors
      </button>
      <p className="mt-4 text-gray-600">{status}</p>
    </div>
  );
}
