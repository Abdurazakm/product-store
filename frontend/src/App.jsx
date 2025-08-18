import { useState, useEffect } from 'react';
import { Plus, Store, AlertCircle, Search } from 'lucide-react';
import { productAPI } from './services/api';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';
import Loading from './components/Loading';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll();
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (productData) => {
    try {
      const response = await productAPI.create(productData);
      setProducts(prev => [...prev, response.data]);
      setShowForm(false);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to add product');
      console.error('Error adding product:', err);
    }
  };

  const handleEditProduct = async (productData) => {
    try {
      const response = await productAPI.update(editingProduct._id, productData);
      setProducts(prev => 
        prev.map(p => p._id === editingProduct._id ? response.data : p)
      );
      setEditingProduct(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to update product');
      console.error('Error updating product:', err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await productAPI.delete(productId);
        setProducts(prev => prev.filter(p => p._id !== productId));
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to delete product');
        console.error('Error deleting product:', err);
      }
    }
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setShowForm(false);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MARNA Store</h1>
                <p className="text-sm text-gray-600">Product Management System</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <Loading message="Loading products..." />}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && !error && (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No products found' : 'No products yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No products match "${searchTerm}"` 
                : 'Start by adding your first product to the store'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add Your First Product
              </button>
            )}
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onEdit={openEditForm}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        {/* Product Count */}
        {!loading && products.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            {searchTerm ? (
              <p>Showing {filteredProducts.length} of {products.length} products</p>
            ) : (
              <p>Total: {products.length} products</p>
            )}
          </div>
        )}
      </main>

      {/* Forms */}
      {showForm && (
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={closeForm}
          isEditing={false}
        />
      )}

      {editingProduct && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleEditProduct}
          onCancel={closeForm}
          isEditing={true}
        />
      )}
    </div>
  );
}

export default App;
