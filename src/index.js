import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
// import { PersistGate } from 'redux-persist/integration/react';

import Phonebook from './Phonebook';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Phonebook />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
);
