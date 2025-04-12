import './index.css';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { NotificationProvider } from './main/context/NotificationProvider';
import { ProfilePageProvider } from './main/context/ProfileContextProvider';
import reportWebVitals from './reportWebVitals';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GoogleOAuthProvider
    clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
  >
    <React.StrictMode>
      <AuthProvider
        authType={'cookie'}
        authName={'_auth'}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <NotificationProvider>
          <ProfilePageProvider currentPage={0}>
            <BrowserRouter>
              <Provider store={store}>
                <App />
              </Provider>
            </BrowserRouter>
          </ProfilePageProvider>
        </NotificationProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
