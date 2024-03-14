import './App.css';

import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';

import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';

import { Auth } from '@/components/auth';

import { gapi, google, initGapiClient, initGIS } from './utils/google';

function App() {
  useEffect(() => {
    const initGoogleAPI = () => {
      if (gapi) {
        gapi.load('client', initGapiClient);
      }
    };

    const initGoogleIdentityServices = () => {
      if (google) {
        initGIS();
      }
    };

    initGoogleAPI();
    initGoogleIdentityServices();
  }, []);

  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <div className='absolute top-0 left-0'>
            <ModeToggle />
          </div>
          {/* Main Container */}
          <main className='flex flex-col justify-center items-center text-left'>
            <Auth />
          </main>
          <Toaster />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
