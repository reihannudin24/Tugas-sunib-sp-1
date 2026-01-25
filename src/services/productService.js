import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const productService = {
    // Get all products
    getAllProducts: async () => {
        const response = await axios.get(`${API_URL}/api/products`);
        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        return response.data;
    },

    // Create new product (with image) - Protected
    createProduct: async (productData) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        const response = await axios.post(`${API_URL}/api/products`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        });
        return response.data;
    },

    // Update product (with optional image) - Protected
    updateProduct: async (id, productData) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        const response = await axios.put(`${API_URL}/api/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders()
            },
        });
        return response.data;
    },

    // Delete product - Protected
    deleteProduct: async (id) => {
        const response = await axios.delete(`${API_URL}/api/products/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    },
};

export default productService;

