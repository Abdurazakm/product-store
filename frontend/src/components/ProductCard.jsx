import { Edit3, Trash2, DollarSign } from 'lucide-react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="relative w-full h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Product+Image';
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-900 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-green-600 mr-1" />
          <span className="text-2xl font-bold text-green-600">
            {product.price}
          </span>
        </div>
        
        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          
          <button
            onClick={() => onDelete(product._id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
      
      <div className="px-6 pb-2 text-xs text-gray-500">
        Added: {new Date(product.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ProductCard;
