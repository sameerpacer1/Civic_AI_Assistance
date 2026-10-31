import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Civic AI Assistant | Smart Urban Grievance & Infrastructure Verifier',
  description:
    'Built by Team HEXCELERATE for Hacktober HackDays 2026. Powered by Cloudinary AI: Automatic citizen face redaction (e_pixelate_faces) and 80%+ bandwidth compression for Delhi NCR municipal authorities.',
  keywords: [
    'Civic Tech',
    'Cloudinary AI',
    'Face Redaction',
    'Smart Cities',
    'Delhi NCR',
    'Infrastructure Verifier',
    'Team HEXCELERATE',
    'Hacktober HackDays 2026',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <Script src="/face-api.js" strategy="beforeInteractive" />
      </head>
      <body className="min-h-screen bg-slate-950 font-sans antialiased text-slate-900 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

