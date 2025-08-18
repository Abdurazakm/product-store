# MARNA Product Store - Full Stack Application

A beautiful, modern product management system built with React.js + Vite (frontend) and Node.js + Express + MongoDB (backend).

## 🚀 Features

- **Beautiful UI**: Modern, responsive design with Tailwind CSS
- **Full CRUD Operations**: Create, Read, Update, Delete products
- **Real-time Search**: Search products by name
- **Image Support**: Add product images via URL
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Smooth loading indicators

## 🛠 Technology Stack

### Frontend
- **React.js 19** - UI Library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend  
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📦 Project Structure

```
MARNA-FULLSTACK/
├── backend/
│   ├── config/
│   │   └── db.js           # Database connection
│   ├── controllers/
│   │   └── product.controller.js  # Product CRUD logic
│   ├── models/
│   │   └── product.model.js       # Product schema
│   ├── routes/
│   │   └── product.route.js       # API routes
│   └── server.js           # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductCard.jsx    # Product display card
│   │   │   ├── ProductForm.jsx    # Add/Edit form
│   │   │   └── Loading.jsx        # Loading component
│   │   ├── services/
│   │   │   └── api.js             # API service layer
│   │   └── App.jsx               # Main app component
│   └── package.json
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
└── package.json           # Main package file
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
npm install --prefix frontend
```

### 2. Environment Setup

Make sure your `.env` file contains:
```
MONGO_URL=mongodb+srv://abdulkem5472:RWfFyIUu3U5ae52B@cluster0.u5lrxhp.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0
```

### 3. Run the Application

**Option 1: Run both servers separately (Recommended for development)**

```bash
# Terminal 1 - Backend server (http://localhost:5000)
npm run backend

# Terminal 2 - Frontend server (http://localhost:5173)
npm run frontend
```

**Option 2: Run backend only**
```bash
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000/api/products

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Product Data Structure

```json
{
  "_id": "unique_id",
  "name": "Product Name",
  "price": 29.99,
  "image": "https://example.com/image.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎯 Usage

1. **View Products**: All products are displayed in a responsive grid
2. **Search Products**: Use the search bar to find products by name
3. **Add Product**: Click "Add Product" button and fill in the form
4. **Edit Product**: Click "Edit" button on any product card
5. **Delete Product**: Click "Delete" button (with confirmation)

## 🎨 UI Features

- **Gradient Background**: Beautiful blue gradient background
- **Card-based Design**: Each product is displayed in a clean card
- **Hover Effects**: Interactive hover states on buttons and cards
- **Icons**: Beautiful Lucide React icons throughout the app
- **Responsive Grid**: Adapts to different screen sizes
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages

## 🔧 Available Scripts

```bash
# Backend development server
npm run backend

# Frontend development server  
npm run frontend

# Build frontend for production
npm run build

# Production server (backend only)
npm start

# Backend development (alternative)
npm run dev
```

## 🐛 Troubleshooting

**Frontend not connecting to backend:**
- Ensure backend server is running on port 5000
- Check if API_URL in `frontend/src/services/api.js` is correct

**Database connection issues:**
- Verify MongoDB connection string in `.env`
- Check if your IP is whitelisted in MongoDB Atlas

**Build issues:**
- Run `npm install` in both root and frontend directories
- Check if all dependencies are installed

## 🔒 Security Notes

- The `.env` file contains sensitive database credentials
- Never commit `.env` to version control
- The `.gitignore` file is configured to exclude sensitive files

## 📄 License

This project is licensed under the ISC License.
