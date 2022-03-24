import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/Layout';
import { MainRouter } from './routes/MainRouter';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <MainRouter />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
