import './App.css';

import { useEffect } from 'react';

import { QuizAssignment } from '@/components/quiz-assignment';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';
import { Button } from './components/ui/button';

function App() {
  // Google API Initialization START

  // Destruct from the browser window object
  const { gapi, google } = window;

  const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const DISCOVERY_DOC = `https://classroom.googleapis.com/$discovery/rest?version=v1&key=${API_KEY}`;
  const SCOPES = 'https://www.googleapis.com/auth/classroom.courses.readonly';

  let tokenClient;
  let gapiInitied = false;
  let gisInited = false;

  useEffect(() => {
    // onload
    const initGoogleAPI = () => {
      if (gapi) {
        gapi.load('client', initGapiClient);
      }
    };

    // onload
    const initGoogleIdentityServices = () => {
      if (google) {
        initGIS();
      }
    };

    initGoogleAPI();
    initGoogleIdentityServices();
  }, []);

  const initGapiClient = () => {
    gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInitied = true;
    console.log('gapiInited', gapiInitied);
  };

  const initGIS = () => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    gisInited = true;
    console.log('gisInited', gisInited);
  };

  const handleAuth = () => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  };
  // Google API Initialization END

  // Google Classroom API
  const listCourses = async () => {
    try {
      const response = await gapi.client.classroom.courses.list({
        pageSize: 10, // Maximum number of courses to return
      });

      console.log('Courses:', response.result.courses);
    } catch (error) {
      console.error('Error listing courses:', error);
    }
  };

  return (
    <>
      <ThemeProvider>
        <div className='absolute top-0 left-0'>
          <ModeToggle />
        </div>
        <div className='space-x-4'>
          <Button onClick={handleAuth}>Auth</Button>
          <Button onClick={listCourses}>Get Courses</Button>
        </div>
        {/* Main Container */}
        <main className='flex justify-center items-center text-left'>
          <QuizAssignment />
        </main>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
