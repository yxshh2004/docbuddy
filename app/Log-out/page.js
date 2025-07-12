'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Clear session/localStorage or cookies
    localStorage.removeItem('user');     // Example: remove user session
    localStorage.removeItem('token');    // Example: remove auth token

    // ✅ Redirect to login or home after logout
    router.replace('/sign-in');          // change to '/' if you prefer homepage
  }, [router]);

  return (
    <div className="text-center mt-20 text-lg text-gray-600">
      Logging out...
    </div>
  );
}
