


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from "axios";
import React, {  useEffect } from "react";
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import Testimonial from './components/Testimonial';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/manual")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/bookingForm" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route (optional: redirect to Home or 404 page) */}
        <Route path="*" element={<Login />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
