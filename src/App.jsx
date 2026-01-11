import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/products" replace />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/products/edit/:id" element={<EditProduct />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
