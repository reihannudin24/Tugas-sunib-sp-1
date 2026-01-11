import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';

const AddProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (productData) => {
        try {
            setLoading(true);
            setError(null);
            await productService.createProduct(productData);
            navigate('/products');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add product');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link to="/products" className="hover:text-blue-600 transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-gray-900">Add Product</span>
            </nav>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
                <p className="text-gray-500">Fill in the details below to add a new product</p>
            </div>

            {/* Error Alert */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                    <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-red-700">{error}</span>
                </div>
            )}

            {/* Form Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">
                <ProductForm
                    onSubmit={handleSubmit}
                    isLoading={loading}
                    submitLabel="Add Product"
                />
            </div>

            {/* Back Link */}
            <div className="text-center mt-6">
                <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    ← Back to Shop
                </Link>
            </div>
        </div>
    );
};

export default AddProduct;
