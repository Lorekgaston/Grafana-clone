import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Alarms from './pages/Alarms/Alarms';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import PageLayout from './components/PageLayout/PageLayout';
import { GlobalStateProvider } from './context/alarmscontext';

function App() {
  return (
    <GlobalStateProvider>
      <Layout>
        <Switch>
          <Route exact path='/'>
            <PageLayout title='Dashboard'>
              <Dashboard />
            </PageLayout>
          </Route>
          <Route path='/alarms'>
            <PageLayout title='Alarms'>
              <Alarms />
            </PageLayout>
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Layout>
    </GlobalStateProvider>
  );
}

export default App;
