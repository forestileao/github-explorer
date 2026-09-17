import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
    <Toaster position="top-right" />
  </>
);

export default App;
