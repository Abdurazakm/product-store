import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all fields." };
        }
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            const data = await res.json();
            
            // Check if the response data is a valid product object and not an array.
            // This is the line that's causing the error. The fix is below.
            if (data.success && data.data) {
                set((state) => ({ products: [...state.products, data.data] }));
                return { success: true, message: "Product created successfully" };
            } else {
                return { success: false, message: data.message || "Failed to create product." };
            }
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
    fetchProducts: async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            set({ products: data.data });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            // update the ui immediately, without needing a refresh
            set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            const data = await res.json();
            if (!data.success) return { success: false, message: data.message };

            // update the ui immediately, without needing a refresh
            set((state) => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product)),
            }));
            return { success: true, message: data.message };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "An unexpected error occurred." };
        }
    },
}));
