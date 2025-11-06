'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function StartConsultationForm() {
  const router = useRouter();

  const specializations = [
    'General Physician', 'Pediatrics', 'Cardiology', 'Endocrinology',
    'Gastroenterology', 'Hematology', 'Neurology', 'Oncology',
    'Pulmonology', 'Rheumatology', 'ENT', 'Radiology',
    'Dermatology', 'Psychiatrist', 'Obstetrics and Gynecology', 'Ophthalmology'
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    specialization: '',
    mode: 'video',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.contact || !formData.specialization) {
      return setError('All fields are required.');
    }
    if (!isValidEmail(formData.email)) {
      return setError('Invalid email format.');
    }
    if (!isValidPhone(formData.contact)) {
      return setError('Phone number must be 10 digits.');
    }

    try {
      await addDoc(collection(db, 'consultations'), {
        ...formData,
        createdAt: Timestamp.now(),
      });

      setSuccess(true);

      // Redirect to select doctor page with query params
      router.push(
        `/select-doctor?specialization=${encodeURIComponent(formData.specialization)}&mode=${formData.mode}&name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&contact=${encodeURIComponent(formData.contact)}`
      );

    } catch (err) {
      setError('Error saving data: ' + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Start QUICK Consultation
      </h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">
        ✅ Request submitted successfully!
      </p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
        <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <Input name="contact" value={formData.contact} onChange={handleChange} placeholder="Your Contact Number" required />

        {/* Specialization Dropdown */}
        <div>
          <label className="block font-medium mb-2">Specialization</label>
          <select
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- Select Specialization --</option>
            {specializations.map((spec, idx) => (
              <option key={idx} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Mode of Consultation</label>
          <RadioGroup
            defaultValue="video"
            onValueChange={(value) => setFormData((prev) => ({ ...prev, mode: value }))}
            className="flex space-x-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="video" id="video" />
              <label htmlFor="video">Video Call</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="chat" id="chat" />
              <label htmlFor="chat">Chat</label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}




 


