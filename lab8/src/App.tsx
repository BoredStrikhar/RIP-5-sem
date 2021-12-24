import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageMain } from 'pages/PageMain';
import { PageProduct } from 'pages/PageProduct';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageMain />} />
        <Route path="/products/:id" element={<PageProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
