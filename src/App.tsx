import './App.css';

import { useEffect } from 'react';

import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';
import { Button } from './components/ui/button';

import { Auth } from '@/components/auth';
import { QuizAssignment } from '@/components/quiz-assignment';

import { gapi, google, initGapiClient, initGIS } from './utils/google';

function App() {
  // Google API Initialization 👇🏻
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
      <ThemeProvider>
        <div className='absolute top-0 left-0'>
          <ModeToggle />
        </div>
        {/* Main Container */}
        <main className='flex flex-col justify-center items-center text-left'>
          <Auth />
          {/* <QuizAssignment /> */}
        </main>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
