import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import productService from '../services/productService';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter & Sort states
    const [sortOption, setSortOption] = useState('default');
    const [priceRange, setPriceRange] = useState(10000000);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await productService.getAllProducts();
            setProducts(data);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filtered and sorted products (client-side)
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            );
        }

        // Filter by price range
        result = result.filter(product => product.price <= priceRange);

        // Sort
        switch (sortOption) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                // Keep original order
                break;
        }

        return result;
    }, [products, sortOption, priceRange, searchQuery]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Show website</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {loading ? 'Loading...' : `SHOWING ${filteredProducts.length} RESULTS`}
                    </p>
                </div>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="default">DEFAULT SORTING</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                    <Link
                        to="/products/add"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                        + Add Product
                    </Link>
                </div>
            </div>

            <div className="flex gap-8">
                {/* Main Content */}
                <div className="flex-1">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <p className="text-gray-500">Loading products...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <p className="text-gray-500 mb-4">{error}</p>
                            <button
                                onClick={fetchProducts}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-1">
                                {products.length === 0 ? 'No products yet' : 'No products match your filters'}
                            </h3>
                            <p className="text-gray-500 mb-4">
                                {products.length === 0
                                    ? 'Get started by adding your first product'
                                    : 'Try adjusting your search or filter criteria'}
                            </p>
                            {products.length === 0 ? (
                                <Link
                                    to="/products/add"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    + Add Product
                                </Link>
                            ) : (
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setPriceRange(10000000);
                                        setSortOption('default');
                                    }}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    {/* Search */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Search products</h3>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Filter by Price */}
                    <div className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Filter by price</h3>
                        <div className="space-y-3">
                            <input
                                type="range"
                                min="0"
                                max="10000000"
                                step="100000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Rp 0</span>
                                <span>{formatPrice(priceRange)}</span>
                            </div>
                            <button
                                onClick={() => setPriceRange(10000000)}
                                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                                RESET PRICE
                            </button>
                        </div>
                    </div>

                    {/* Featured Products */}
                    {products.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Featured products</h3>
                            <div className="space-y-4">
                                {products.slice(0, 4).map(product => (
                                    <Link
                                        key={product._id}
                                        to={`/products/${product._id}`}
                                        className="flex items-center gap-3 group"
                                    >
                                        <img
                                            src={product.image?.startsWith('http') ? product.image : `http://localhost:3000/${product.image}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-contain bg-gray-50 rounded"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                                            }}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {product.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatPrice(product.price)}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;
