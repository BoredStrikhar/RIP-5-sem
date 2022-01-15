import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { PageAddCountry } from 'pages/PageAddManufacturer';
import { PageAddHotel } from 'pages/PageAddProduct';
import { PageCountries } from 'pages/PageManufacturers';
import { PageCountry } from 'pages/PageManufacturer';
import { PageEdit } from 'pages/PageEdit';
import { PageEditCountry } from 'pages/PageEditManufacturer';
import { PageMain } from 'pages/PageMain';
import { PageProduct } from 'pages/PageProduct';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/product" />} />

        <Route path="/product" element={<PageMain />} />
        <Route path="/product/add" element={<PageAddHotel />} />
        <Route path="/product/:id/edit" element={<PageEdit />} />
        <Route path="/product/:id" element={<PageProduct />} />

        <Route path="/manufacturer" element={<PageCountries />} />
        <Route path="/manufacturer/add" element={<PageAddCountry />} />
        <Route path="/manufacturer/:id/edit" element={<PageEditCountry />} />
        <Route path="/manufacturer/:id" element={<PageCountry />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
