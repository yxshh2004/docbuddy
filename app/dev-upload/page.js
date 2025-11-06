'use client';
import { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DevUpload() {
  useEffect(() => {
    const upload = async () => {
      const specializations = [
        "General Physician", "Pediatrics", "Cardiology", "Endocrinology",
        "Gastroenterology", "Hematology", "Neurology", "Oncology", "Pulmonology",
        "Rheumatology", "ENT", "Radiology", "Dermatology", "Psychiatrist",
        "Obstetrics and Gynecology", "Ophthalmology"
      ];

      for (const name of specializations) {
        await addDoc(collection(db, 'specializations'), { name });
      }

      alert('✅ Specializations uploaded!');
    };

    upload();
  }, []);

  return (
    <div className="p-6 text-green-600 text-center">
      Uploading doctor specializations to Firestore…
    </div>
  );
}
