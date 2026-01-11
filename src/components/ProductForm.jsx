import React, { useState, useEffect } from 'react';

const ProductForm = ({ initialData, onSubmit, isLoading, submitLabel = 'Save Product' }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                price: initialData.price || '',
                description: initialData.description || '',
            });
            if (initialData.image) {
                const imageUrl = initialData.image.startsWith('http')
                    ? initialData.image
                    : `http://localhost:3000/${initialData.image}`;
                setImagePreview(imageUrl);
            }
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Product name is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be greater than 0';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!initialData && !imageFile) newErrors.image = 'Product image is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({
                ...formData,
                image: imageFile
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter product name"
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Price */}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                    Price (IDR)
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.price ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter price"
                    min="0"
                />
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                    placeholder="Enter product description"
                />
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
            </div>

            {/* Image Upload */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image
                </label>
                <label
                    htmlFor="image"
                    className={`block w-full border-2 border-dashed rounded-lg cursor-pointer transition-all hover:border-blue-500 ${errors.image ? 'border-red-500' : 'border-gray-300'
                        }`}
                >
                    {imagePreview ? (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-64 object-contain rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                <span className="text-white font-medium">Change Image</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12">
                            <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-500">Click to upload image</span>
                            <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
                        </div>
                    )}
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                ) : submitLabel}
            </button>
        </form>
    );
};

export default ProductForm;
