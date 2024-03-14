export const { gapi, google } = window;

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH2_CLIENT_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const DISCOVERY_DOC = `https://classroom.googleapis.com/$discovery/rest?version=v1&key=${API_KEY}`;
const SCOPES =
  'https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students';
let tokenClient: google.accounts.oauth2.TokenClient;
let gapiInitied = false;
let gisInited = false;

let accessToken = '';

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
    callback: (tokenResponse: google.accounts.oauth2.TokenResponse) => {},
  });
  gisInited = true;
  console.log('gisInited', gisInited);
};

export const handleAuth = (callback: () => void) => {
  //@ts-ignore
  tokenClient.callback = async (
    tokenResponse: google.accounts.oauth2.TokenResponse
  ) => {
    if (tokenResponse.error !== undefined) {
      throw tokenResponse;
    }

    accessToken = tokenResponse.access_token;
    callback();
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

export const handleDeauth = async (callback: () => void) => {
  const url = `https://oauth2.googleapis.com/revoke?token=${accessToken}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to revoke access token');
  }

  callback();
};
