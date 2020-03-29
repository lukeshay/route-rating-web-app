import 'react-toastify';
import App from './App';
import React from 'react';
import StoreCombiner from './StoreCombiner';
import { HashRouter } from 'react-router-dom';
import { GymsStore } from './context/gyms/gymsStore';
import { UserStore } from './context/user/userStore';
import { ViewStore } from './context/view/viewStore';

const Main: React.FC = (): JSX.Element => (
  <StoreCombiner stores={[GymsStore, UserStore, ViewStore]}>
    <HashRouter>
      <App />
    </HashRouter>
  </StoreCombiner>
);

export default Main;
