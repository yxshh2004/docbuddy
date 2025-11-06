import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DoctorBuddy - Consult Doctors Online | Healthcare Platform',
  description:
    'Connect with certified doctors through secure online consultations. Get expert medical advice from the comfort of your home, 24/7. Book appointments instantly with top healthcare professionals.',
  keywords:
    'online doctor consultation, telemedicine, healthcare, medical advice, doctor appointment, virtual consultation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome (optional) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          integrity="sha512-Fo3rlrZj/k7ujTnHqT+e4f+XW+Q5jKj5wY5hxKIXH9u1bD2qJslv+UJ2+1Sn0vTVZzW5sOEI2A9n3XD/t2ZzYw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        {/* Leaflet CSS for maps */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha512-XQoYMqMTK8LvdlxUMlPSOpF5N1V1DyStHMTM+Pni7sMLU13jwUVJrZOiSmMhz+2F1bQe7pIj7bR4CM4EcF+P1g=="
          crossOrigin=""
        />
      </head>
      <body className={inter.className}>
        
        <main>{children}</main>
      </body>
    </html>
  );
}



