from datetime import datetime
from app.extensions import db

class Booking(db.Model):
    __tablename__ = "bookings"
    __table_args__ = {'extend_existing': True}
    
    booking_id = db.Column(db.Integer, primary_key=True)
    service_id = db.Column(db.Integer, db.ForeignKey('services.id'))
    status = db.Column(db.String(50), default="pending")
    verification_code = db.Column(db.String(6), nullable=True)
    is_verified = db.Column(db.Boolean, default=False)
    preferred_date = db.Column(db.Date, nullable=False)  # Required by existing schema
    guest_name = db.Column(db.String(100), nullable=True)
    guest_contact = db.Column(db.String(100), nullable=True)  # Will store combined info

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

  
    service = db.relationship('Service', backref='bookings')