# Kelznet Tech Solutions - Full Stack Application

A complete monorepo containing both the React frontend and Flask backend for Kelznet Tech Solutions.

## 🏗️ Project Structure

```
kelznet-techSolutions/
├── frontend/                 # React.js application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS stylesheets
│   │   └── Services/        # API service layer
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
│
├── backend/                  # Flask API server
│   ├── app/
│   │   ├── controllers/     # API controllers
│   │   ├── model/           # SQLAlchemy models
│   │   └── extensions.py    # Flask extensions
│   ├── migrations/          # Database migrations
│   ├── instance/            # Database files
│   ├── config.py            # Application configuration
│   ├── run.py               # Application entry point
│   └── requirement.txt      # Backend dependencies
│
└── package.json             # Root package.json with scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (3.8 or higher)
- pip (Python package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KAKWANZI-MICHEL/kelznet-techSolutions.git
   cd kelznet-techSolutions
   ```

2. **Install all dependencies:**
   ```bash
   npm run setup
   ```

3. **Run both frontend and backend simultaneously:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://127.0.0.1:5000
   - **Admin Login**: http://localhost:3000/login

## 📋 Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run setup` - Install concurrently and all dependencies
- `npm run install-deps` - Install both frontend and backend dependencies
- `npm run build` - Build frontend for production

### Frontend Scripts

- `npm run frontend:dev` - Start React development server (localhost:3000)
- `npm run frontend:build` - Build React app for production
- `npm run frontend:test` - Run React tests
- `npm run frontend:install` - Install frontend dependencies only

### Backend Scripts

- `npm run backend:dev` - Start Flask development server
- `npm run backend:install` - Install Python dependencies only

## 🔧 Development

### Frontend Development
The React frontend runs on `http://localhost:3000` and includes:
- Modern React components with hooks
- React Router for navigation
- Axios for API communication
- Framer Motion for animations
- Material design components

### Backend Development
The Flask backend runs on `http://127.0.0.1:8000` and provides:
- RESTful API endpoints
- SQLAlchemy ORM for database operations
- Authentication system
- Admin dashboard functionality

## 🌟 Features

- **Responsive Design**: Mobile-first responsive web design
- **Authentication**: Secure user authentication and admin panel
- **Booking System**: Service booking with form validation
- **Admin Dashboard**: Protected admin routes with dashboard
- **Contact System**: Contact form with message handling
- **Service Management**: Dynamic service listing and management
- **Database Integration**: SQLite database with migrations

## 🔐 Authentication System

The application includes a complete JWT-based authentication system with admin and client roles.

### **Test Accounts**

| Role | Email | Password | Access Level |
|------|-------|----------|-------------|
| **👑 Admin** | `admin@kelznet.com` | `admin123` | Full dashboard access |
| **👤 Client** | `client@kelznet.com` | `client123` | Basic user access |

### **Authentication Endpoints**

- **Login**: `POST http://127.0.0.1:5000/api/v1/auth/login`
- **Register**: `POST http://127.0.0.1:5000/api/v1/auth/register`
- **Profile**: `GET http://127.0.0.1:5000/api/v1/auth/profile` (Protected)
- **Admin Dashboard**: `GET http://127.0.0.1:5000/api/v1/admin/dashboard` (Admin only)

### **Frontend Routes**

- **🏠 Home**: http://localhost:3000
- **🔐 Login**: http://localhost:3000/login
- **👑 Admin Dashboard**: http://localhost:3000/dashboard (Protected)
- **📋 Services**: http://localhost:3000/services
- **📞 Contact**: http://localhost:3000/contact
- **ℹ️ About**: http://localhost:3000/about

## 🔗 API Integration

The frontend connects to the Flask backend API. Key integration points:

- **Base URL**: `http://127.0.0.1:5000`
- **Authentication**: JWT-based authentication with 24-hour token expiry
- **CORS**: Configured for cross-origin requests between localhost:3000 and 127.0.0.1:5000

## 📦 Deployment

### Frontend Deployment
```bash
npm run frontend:build
# Deploy the build/ folder to your static hosting service
```

### Backend Deployment
```bash
cd backend
pip install -r requirement.txt
python run.py
```

## 🛠️ Troubleshooting

### Common Issues

**Port 5000 in use (macOS AirPlay):**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Or disable AirPlay Receiver in System Preferences > General > AirDrop & Handoff
```

**Port 3000 in use:**
```bash
# Kill process using port 3000
lsof -ti:3000 | xargs kill -9
```

**CORS Errors:**
- Ensure backend is running on `http://127.0.0.1:5000`
- Frontend should be on `http://localhost:3000`
- Check that CORS is properly configured in backend

**Authentication Issues:**
- Verify test accounts exist by checking backend logs
- Clear browser localStorage: `localStorage.clear()`
- Ensure JWT tokens haven't expired

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Contact

Kelznet Tech Solutions - Your trusted tech partner

---

**Note**: Make sure both Node.js and Python are installed on your system before running the application.
