import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product._id}`);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath) return 'https://via.placeholder.com/300x300?text=No+Image';
        if (imagePath.startsWith('http')) return imagePath;
        return `http://localhost:3000/${imagePath}`;
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg"
        >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
                    }}
                />
                {/* Wishlist Button */}
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">New</p>
                <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {/* Price and Cart */}
                <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-gray-900">
                        {formatPrice(product.price)}
                    </span>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-gray-100 rounded-md hover:bg-blue-600 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
