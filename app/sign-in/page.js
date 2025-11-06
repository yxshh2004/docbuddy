'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';
import { FcGoogle } from "react-icons/fc"; // 👈 Google icon

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dob: '',
    contact: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Email/Password Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
        dob: formData.dob,
        contact: formData.contact,
        createdAt: new Date().toISOString(),
      });

      alert('Sign Up Successful!');

      const redirectPath = searchParams.get('redirect') || '/';
      router.push(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  // Social Sign-in
  const handleSocialSignIn = async (provider) => {
    setError('');
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user in Firestore if not exists
      await setDoc(doc(db, 'users', user.uid), {
        fullName: user.displayName || '',
        email: user.email,
        contact: user.phoneNumber || '',
        createdAt: new Date().toISOString(),
      }, { merge: true });

      alert(`Welcome ${user.displayName || 'User'}!`);

      const redirectPath = searchParams.get('redirect') || '/';
      router.push(redirectPath);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">Sign Up</h1>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Email Signup */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <input type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-semibold">
          Sign Up
        </button>
      </form>

      {/* OR Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Social Logins */}
      <div className="space-y-2">
        <button 
          onClick={() => handleSocialSignIn(new GoogleAuthProvider())}
          className="flex items-center justify-center gap-2 w-full border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-100 font-semibold"
        >
          <FcGoogle size={22} /> {/* 👈 Google logo */}
          Continue with Google
        </button>
      </div>
    </div>
  );
}



