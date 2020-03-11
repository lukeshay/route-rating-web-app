import 'react-toastify';
import App from './App';
import React from 'react';
import StoreCombiner from './StoreCombiner';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { GymsStore } from './context/gyms/gymsStore';
import { UserStore } from './context/user/userStore';
import { ViewStore } from './context/view/viewStore';

const Main: React.FC = (): JSX.Element => {
  return process.env.NODE_ENV === 'development' ? (
    <StoreCombiner stores={[GymsStore, UserStore, ViewStore]}>
      <HashRouter>
        <App />
      </HashRouter>
    </StoreCombiner>
  ) : (
    <StoreCombiner stores={[GymsStore, UserStore, ViewStore]}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreCombiner>
  );
};

export default Main;
