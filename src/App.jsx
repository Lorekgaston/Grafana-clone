import React from 'react';

import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import PageLayout from './components/PageLayout/PageLayout';

function App() {
  return (
    <Layout>
      <PageLayout title='Dashboard'>
        <Dashboard />
      </PageLayout>
    </Layout>
  );
}

export default App;
