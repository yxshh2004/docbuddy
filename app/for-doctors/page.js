'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function DoctorRegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    degree: '',
    specialization: '',
    experience: '',
    clinicLocation: '',
    contactNumber: '',
    email: '',
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic') {
      setForm((prev) => ({ ...prev, profilePic: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!isValidEmail(form.email)) {
      return setError('Invalid email address.');
    }
    if (!isValidPhone(form.contactNumber)) {
      return setError('Invalid contact number. Must be 10 digits.');
    }

    try {
      await addDoc(collection(db, 'doctors'), {
        ...form,
        profilePic: form.profilePic ? form.profilePic.name : null,
        createdAt: Timestamp.now(),
      });
      setSuccess(true);
      setStep(2);
    } catch (err) {
      setError('Error saving data: ' + err.message);
    }
  };

  const loadRazorpay = (plan) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      const options = {
        key: 'rzp_test_YourKeyHere', // Replace with your Razorpay Key
        amount: plan === 'monthly' ? 200000 : 2200000,
        currency: 'INR',
        name: 'DoctorBuddy',
        description: `${plan === 'monthly' ? '1 Month' : '1 Year'} Subscription`,
        handler: function (response) {
          // Handle payment success
          router.push('/doctor-dashboard');
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.contactNumber,
        },
        theme: {
          color: '#2563EB',
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    document.body.appendChild(script);
  };

  if (step === 2) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded space-y-6">
        <h2 className="text-3xl font-bold text-blue-600">🩺 About Us</h2>
        <p>
          At DoctorBuddy, we bring together a team of highly qualified and experienced doctors dedicated to providing accessible,
          reliable, and patient-first healthcare. Our platform connects patients with trusted medical professionals across various specialties — anytime, anywhere.
        </p>
        <p>
          Our mission is to make healthcare more convenient by enabling online appointment booking, virtual consultations,
          and easy follow-ups, all in one place.
        </p>
        <h3 className="text-xl font-semibold">👨‍⚕ Our Doctors:</h3>
        <ul className="list-disc list-inside">
          <li>Are certified professionals with years of experience in clinical practice</li>
          <li>Represent diverse medical fields such as General Medicine, Pediatrics, Dermatology, Gynecology, Mental Health, and more</li>
          <li>Follow ethical medical practices and personalized care</li>
        </ul>
        <h3 className="text-xl font-semibold">🌐 What We Offer:</h3>
        <ul className="list-disc list-inside">
          <li>Verified doctors with ratings and reviews</li>
          <li>Instant online consultations or scheduled in-clinic visits</li>
          <li>Easy access to medical advice, prescriptions, and reports</li>
          <li>Transparent pricing and secure booking</li>
        </ul>
        <h3 className="text-xl font-semibold">💙 Our Commitment:</h3>
        <p>
          We are committed to putting your health first. Whether it’s a common cold or a long-term health concern,
          our doctors are here to guide you every step of the way — with professionalism, empathy, and care.
        </p>
        <p className="font-semibold text-blue-600">Your health, our priority.</p>

        <div className="flex justify-end pt-4">
          <Button onClick={() => setStep(3)} className="bg-blue-600 hover:bg-blue-700 text-white">Next</Button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded space-y-4">
        <h2 className="text-2xl font-bold text-center text-blue-600">Choose Your Plan</h2>
        <div className="space-y-4">
          <div className="border rounded p-4 shadow hover:shadow-md cursor-pointer">
            <h3 className="text-lg font-semibold">🗓️ 1 Month Plan</h3>
            <p className="text-gray-700">Access for 30 days</p>
            <p className="text-blue-600 font-bold">₹2,000</p>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full" onClick={() => loadRazorpay('monthly')}>Pay & Start</Button>
          </div>
          <div className="border rounded p-4 shadow hover:shadow-md cursor-pointer">
            <h3 className="text-lg font-semibold">📅 1 Year Plan</h3>
            <p className="text-gray-700">Access for 365 days</p>
            <p className="text-blue-600 font-bold">₹22,000</p>
            <Button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white w-full" onClick={() => loadRazorpay('yearly')}>Pay & Start</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Welcome Doctor!</h2>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}
      {success && <p className="text-green-600 text-center mb-4">✅ Doctor profile saved successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Dr. Full Name" required />
        <Input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree (e.g., MBBS, MD)" required />
        <Input name="specialization" value={form.specialization} onChange={handleChange} placeholder="Specialization" required />
        <Input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience (e.g., 10 years)" required />
        <Input name="clinicLocation" value={form.clinicLocation} onChange={handleChange} placeholder="Clinic Location" required />
        <Input name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="Contact Number (10 digits)" required />
        <Input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" required />

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input type="file" name="profilePic" accept="image/*" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer" />
        </div>

        <div className="flex justify-between pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Save</Button>
          <Button type="button" onClick={() => setStep(2)} variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">Next</Button>
        </div>
      </form>
    </div>
  );
}
