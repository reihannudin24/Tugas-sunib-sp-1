import axios from 'axios';

const API_URL = 'http://localhost:3000/api/products';

const productService = {
    // Get all products
    getAllProducts: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    // Get product by ID
    getProductById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    // Create new product (with image)
    createProduct: async (productData) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        const response = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Update product (with optional image)
    updateProduct: async (id, productData) => {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('price', productData.price);
        formData.append('description', productData.description);
        if (productData.image) {
            formData.append('image', productData.image);
        }

        const response = await axios.put(`${API_URL}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Delete product
    deleteProduct: async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },
};

export default productService;
