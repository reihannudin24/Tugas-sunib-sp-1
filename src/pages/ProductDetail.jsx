import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import productService from '../services/productService';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const handleDelete = async () => {
        try {
            setDeleting(true);
            await productService.deleteProduct(id);
            navigate('/products', { replace: true });
        } catch (err) {
            setError('Failed to delete product');
            console.error(err);
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/600x600?text=No+Image';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:3000/${imagePath}`;
    };

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-center py-20">
                    <svg className="animate-spin h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                <Link to="/products" className="hover:text-blue-600 transition-colors">Shop</Link>
                <span>/</span>
                <span className="text-gray-900">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Product Image */}
                <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                    <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="max-w-full max-h-96 object-contain"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                        }}
                    />
                </div>

                {/* Product Info */}
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">New Product</p>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                    <div className={"border-b border-gray-200 mb-4"}>

                    </div>
                    {/* Price */}
                    <div className="text-3xl font-bold text-gray-900 mb-6">
                        {formatPrice(product.price)}
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase mb-2">Description</h3>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description || 'No description available.'}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4 mb-6">
                        <Link
                            to={`/products/edit/${id}`}
                            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                        >
                            Edit Product
                        </Link>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="flex-1 border border-red-500 text-red-500 py-3 px-6 rounded-lg font-medium hover:bg-red-50 transition-colors"
                        >
                            Delete Product
                        </button>
                    </div>

                    <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        ← Back to Shop
                    </Link>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product?</h3>
                            <p className="text-gray-500 mb-6">
                                Are you sure you want to delete "{product.name}"? This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    disabled={deleting}
                                    className="flex-1 py-2 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                                >
                                    {deleting ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
