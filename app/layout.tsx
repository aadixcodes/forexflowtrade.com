import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Footer2 from '@/components/Footer2';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Forex Flow',
  description: 'Forex Flow Trading',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const path = window.location.pathname;
                const isDashboardOrAdmin = path.startsWith('/dashboard') || path.startsWith('/admin');
                
                if (isDashboardOrAdmin) {
                  const savedTheme = localStorage.getItem('theme');
                  if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', poppins.className)}>
        <Navbar />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* <Footer /> */}
        <Footer2 />
      </body>
    </html>
  );
}
