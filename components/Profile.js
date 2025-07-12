'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    bloodType: '',
    allergies: ''
  });
  const [photo, setPhoto] = useState("https://via.placeholder.com/80");
  const [success, setSuccess] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setProfile(snap.data());
        }
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      await updateDoc(doc(db, 'users', user.uid), profile);
      setSuccess(true);
      setShowPreview(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-sm border p-6">
      <div className="border-b border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Profile Settings</h2>
        <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
      </div>

      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
          ✅ Profile updated successfully!
        </div>
      )}

      <div className="flex items-center space-x-4">
        <img src={photo} className="w-20 h-20 rounded-full object-cover" alt="Profile" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{profile.fullName}</h3>
          <p className="text-gray-600">{profile.email}</p>
          <label className="mt-2 inline-block border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 rounded-md text-sm cursor-pointer">
            Change Photo
            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileSection
          title="Personal Information"
          fields={[
            { label: 'Full Name', name: 'fullName', value: profile.fullName },
            { label: 'Email', name: 'email', value: profile.email },
            { label: 'Phone', name: 'phone', value: profile.phone }
          ]}
          onChange={handleChange}
        />
        <ProfileSection
          title="Medical Information"
          fields={[
            { label: 'Date of Birth', name: 'dob', value: profile.dob, type: 'date' },
            { label: 'Blood Type', name: 'bloodType', value: profile.bloodType },
            { label: 'Allergies', name: 'allergies', value: profile.allergies }
          ]}
          onChange={handleChange}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Change Password</h4>
        <input
          type="password"
          name="current"
          placeholder="Current Password"
          value={passwords.current}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="new"
          placeholder="New Password"
          value={passwords.new}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm New Password"
          value={passwords.confirm}
          onChange={handlePasswordChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      {showPreview && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
          <h4 className="font-semibold text-blue-800 mb-2">Preview Changes</h4>
          <p><strong>Full Name:</strong> {profile.fullName}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Date of Birth:</strong> {profile.dob}</p>
          <p><strong>Blood Type:</strong> {profile.bloodType}</p>
          <p><strong>Allergies:</strong> {profile.allergies}</p>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button onClick={() => setShowPreview(true)} className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md">Preview</button>
        <button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Save Changes</button>
      </div>
    </div>
  );
}

function ProfileSection({ title, fields, onChange }) {
  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">{title}</h4>
      {fields.map(({ label, name, value, type = 'text' }) => (
        <div key={name} className="space-y-1">
          <label className="text-sm font-medium text-gray-700" htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      ))}
    </div>
  );
}

