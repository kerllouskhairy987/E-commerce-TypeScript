// style from bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// main layout
import App from './App.tsx'
// redux
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/index.ts';
import { Provider } from 'react-redux'
// global style
import "@/styles/global.css"

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  // </StrictMode>,
)
