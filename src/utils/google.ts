export const { gapi, google } = window;

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const DISCOVERY_DOC = `https://classroom.googleapis.com/$discovery/rest?version=v1&key=${API_KEY}`;
const SCOPES =
  'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students';
export let tokenClient;
let gapiInitied = false;
let gisInited = false;
export let authenticated = false;

export const initGapiClient = () => {
  gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInitied = true;
  console.log('gapiInited', gapiInitied);
};

export const initGIS = () => {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
  console.log('gisInited', gisInited);
};

export const handleAuth = (callback) => {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }

    authenticated = true;

    if (typeof callback === 'function') {
      callback();
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

export const isAuthenticated = () => {
  return authenticated;
};
