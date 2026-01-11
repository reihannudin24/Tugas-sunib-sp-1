import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import productService from '../services/productService';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const fetchProduct = useCallback(async () => {
        try {
            setLoading(true);
            const data = await productService.getProductById(id);
            setProduct(data);
        } catch (err) {
            setError('Product not found');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const handleSubmit = async (productData) => {
        try {
            setSubmitting(true);
            setError(null);
            await productService.updateProduct(id, productData);
            navigate(`/products/${id}`);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to update product');
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center py-20">
                    <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center justify-center py-20">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link to="/products" className="hover:text-blue-600 transition-colors">Shop</Link>
                <span>/</span>
                <Link to={`/products/${id}`} className="hover:text-blue-600 transition-colors">{product.name}</Link>
                <span>/</span>
                <span className="text-gray-900">Edit</span>
            </nav>

            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Product</h1>
                <p className="text-gray-500">Update the product details below</p>
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
                    initialData={product}
                    onSubmit={handleSubmit}
                    isLoading={submitting}
                    submitLabel="Save Changes"
                />
            </div>

            {/* Back Link */}
            <div className="text-center mt-6">
                <Link to={`/products/${id}`} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    ← Back to Product
                </Link>
            </div>
        </div>
    );
};

export default EditProduct;
