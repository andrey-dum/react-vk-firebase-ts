import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthProvider';
import { Layout } from './layout/Layout';
import { MainRouter } from './routes/MainRouter';



function App() {


  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
