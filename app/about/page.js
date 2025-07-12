'use client';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">About Doctor Buddy</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Services</h2>
        <p className="text-gray-700 leading-relaxed">
          Doctor Buddy is your trusted digital health partner. We provide a seamless platform to book online appointments, consult doctors remotely, order medicines, and manage personal health records all in one place. Whether you need a dermatologist, dentist, gynecologist, or a general physician, Doctor Buddy brings healthcare to your fingertips — safe, accessible, and reliable.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Features</h2>
        <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
          <li>Instant online appointment booking with verified doctors</li>
          <li>Video consultations for remote healthcare access</li>
          <li>Upload and store prescriptions, lab reports, and medical files securely</li>
          <li>Daily medication reminders and subscription management</li>
          <li>Access to various specialties and treatments</li>
          <li>Support for multiple languages and family member profiles</li>
          <li>Lab test bookings and medicine home delivery</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Our Belief</h2>
        <p className="text-gray-700 leading-relaxed">
          At Doctor Buddy, we believe that healthcare should be simple, humane, and universally accessible. Everyone deserves quality care — whether from the comfort of their home or in a clinic. Our platform is built with empathy, powered by technology, and driven by the vision to connect patients and doctors with ease, transparency, and trust.
        </p>
      </section>
    </div>
  );
}
