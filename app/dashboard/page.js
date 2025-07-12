'use client';

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Overview from '@/components/Overview';
import Appointments from '@/components/Appointments';
import Records from '@/components/Records';
import Profile from '@/components/Profile';
import { useAuth } from '@/lib/useAuth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [appointmentTab, setAppointmentTab] = useState('upcoming');

  const tabs = ['overview', 'appointments', 'records', 'profile'];

  const handleBookAppointment = () => {
    router.push('/book-appointment');
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push('/sign-in');
    }
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <>
      <Head>
        <title>Dashboard - DoctorBuddy</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <i className="fas fa-heart text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-600">Welcome back, {user?.email || 'User'}!</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-bell text-xl text-gray-500 hover:text-gray-700"></i>
                <i className="fas fa-cog text-xl text-gray-500 hover:text-gray-700"></i>
                <img
                  src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <button onClick={() => signOut(auth)} className="text-sm text-red-500 hover:underline">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`tab-button flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  <i
                    className={`fas ${
                      tab === 'overview'
                        ? 'fa-user'
                        : tab === 'appointments'
                        ? 'fa-calendar-alt'
                        : tab === 'records'
                        ? 'fa-file-medical'
                        : 'fa-cog'
                    }`}
                  ></i>
                  <span className="capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'overview' && <Overview />}
          {activeTab === 'appointments' && (
            <Appointments
              activeSubTab={appointmentTab}
              onChangeTab={setAppointmentTab}
              onBookAppointment={handleBookAppointment}
            />
          )}
          {activeTab === 'records' && <Records />}
          {activeTab === 'profile' && <Profile />}
        </div>
      </div>
    </>
  );
}


// You can define <Overview />, <Appointments />, <Records />, and <Profile /> as components in the same file or separate components under `components/` folder
