import { ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme/theme';

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  const map = new Map(JSON.parse(localStorage.getItem('app-cache') || '[]'))

  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    localStorage.setItem('app-cache', appCache)
  })

  // We still use the map for write & read for performance.
  return map
}


ReactDOM.render(
  <React.StrictMode>
    <SWRConfig value={{ provider: localStorageProvider, revalidateIfStale: false, revalidateOnFocus: false }}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement
);

reportWebVitals();

