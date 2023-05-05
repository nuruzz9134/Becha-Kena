import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ProductsContext } from './context/ProductsContext';
import { FilterContextProvider } from './context/Filter_Context';
import { CartProvider } from './context/CartContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ProductsContext>
          <FilterContextProvider>
            <CartProvider>
              <App/>
           </CartProvider>
          </FilterContextProvider>
        </ProductsContext>
      </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
