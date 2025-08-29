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
   git clone https://github.com/KAKWANZI-MICHEL/kelznet-tech.git
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

## 🔗 API Integration

The frontend connects to the Flask backend API. Key integration points:

- **Base URL**: `http://127.0.0.1:8000`
- **Authentication**: JWT-based authentication
- **CORS**: Configured for cross-origin requests

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
