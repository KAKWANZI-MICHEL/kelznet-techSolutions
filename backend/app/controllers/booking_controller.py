# controllers/booking_controller.py

from flask import Blueprint, request, jsonify, render_template, flash, redirect, url_for
from app.extensions import db
from app.model.booking import Booking
from app.model.service import Service  # Assuming you have a Service model
from datetime import datetime
import random
import string

# Create a Blueprint
booking_bp = Blueprint('booking', __name__)

# Utility: Generate a random 6-character verification code
def generate_verification_code():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

# --- PUBLIC/ADMIN: List All Bookings ---
@booking_bp.route('/bookings', methods=['GET'])
def list_bookings():
    bookings = Booking.query.all()
    return render_template('bookings/list.html', bookings=bookings)

# --- PUBLIC: Create a New Booking ---
@booking_bp.route('/bookings/create', methods=['GET', 'POST'])
def create_booking():
    if request.method == 'POST':
        try:
            service_id = request.form.get('service_id')
            preferred_date = request.form.get('preferred_date')
            guest_name = request.form.get('guest_name')
            guest_contact = request.form.get('guest_contact')

            # Validate required fields
            service = Service.query.get(service_id)
            if not service:
                flash("Invalid service selected.", "danger")
                return redirect(url_for('booking.create_booking'))

            if not preferred_date:
                flash("Preferred date is required.", "danger")
                return redirect(url_for('booking.create_booking'))

            # Create new booking
            booking = Booking(
                service_id=service_id,
                preferred_date=datetime.strptime(preferred_date, '%Y-%m-%d').date(),
                guest_name=guest_name,
                guest_contact=guest_contact,
                status="pending",
                verification_code=generate_verification_code(),
                is_verified=False
            )

            db.session.add(booking)
            db.session.commit()

            flash(f"Booking created! Your verification code: {booking.verification_code}", "success")
            return redirect(url_for('booking.view_booking', booking_id=booking.booking_id))
        except Exception as e:
            db.session.rollback()
            flash(f"Error creating booking: {str(e)}", "danger")

    # GET: Show form
    services = Service.query.all()
    return render_template('bookings/create.html', services=services)

# --- PUBLIC/ADMIN: View a Booking ---
@booking_bp.route('/bookings/<int:booking_id>', methods=['GET'])
def view_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    return render_template('bookings/detail.html', booking=booking)

# --- ADMIN: Update Booking Status or Verify ---
@booking_bp.route('/bookings/<int:booking_id>/update', methods=['POST'])
def update_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    data = request.json

    try:
        if 'status' in data:
            booking.status = data['status']
        if 'is_verified' in data:
            booking.is_verified = bool(data['is_verified'])
        if 'preferred_date' in data:
            booking.preferred_date = datetime.strptime(data['preferred_date'], '%Y-%m-%d').date()

        booking.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify({
            'success': True,
            'message': 'Booking updated successfully.',
            'booking': {
                'booking_id': booking.booking_id,
                'status': booking.status,
                'is_verified': booking.is_verified,
                'preferred_date': booking.preferred_date.isoformat(),
                'updated_at': booking.updated_at.isoformat()
            }
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 400

# --- ADMIN: Cancel or Delete Booking ---
@booking_bp.route('/bookings/<int:booking_id>/cancel', methods=['POST'])
def cancel_booking(booking_id):
    booking = Booking.query.get_or_404(booking_id)
    try:
        # You may want to soft delete or just update status
        booking.status = "cancelled"
        db.session.commit()
        flash("Booking has been cancelled.", "info")
    except Exception as e:
        db.session.rollback()
        flash(f"Error cancelling booking: {str(e)}", "danger")
    return redirect(url_for('booking.list_bookings'))

# --- API: Create Booking via JSON ---
@booking_bp.route('/v1/bookings', methods=['POST'])
def api_create_booking():
    try:
        data = request.get_json()
        
        # Get data from frontend
        name = data.get('name')
        phone = data.get('phone') 
        email = data.get('email')
        service_name = data.get('service')
        message = data.get('message', '')
        
        # Find service by name
        service = Service.query.filter_by(name=service_name).first()
        if not service:
            return jsonify({
                'success': False, 
                'message': f'Service "{service_name}" not found'
            }), 400
            
        # Work with existing database schema
        contact_info = f"Phone: {phone} | Email: {email}"
        if message:
            contact_info += f" | Message: {message}"
            
        booking = Booking(
            service_id=service.id,
            guest_name=name,
            guest_contact=contact_info,  # Store all info in existing contact field
            preferred_date=datetime.utcnow().date(),  # Default to today since required
            status="pending",
            verification_code=generate_verification_code(),
            is_verified=False
        )
        
        db.session.add(booking)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Booking created successfully!',
            'booking_id': booking.booking_id,
            'verification_code': booking.verification_code,
            'service': service_name
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': f'Error creating booking: {str(e)}'
        }), 500

# --- API: List Bookings as JSON ---
@booking_bp.route('/v1/bookings', methods=['GET'])
def api_list_bookings():
    bookings = Booking.query.all()
    result = []
    for b in bookings:
        result.append({
            'booking_id': b.booking_id,
            'service_id': b.service_id,
            'service_name': b.service.name if b.service else 'Unknown Service',
            'status': b.status,
            'is_verified': b.is_verified,
            'verification_code': b.verification_code,
            'preferred_date': b.preferred_date.isoformat() if b.preferred_date else None,
            'guest_name': b.guest_name,
            'guest_contact': b.guest_contact,  # Contains combined phone|email|message info
            'created_at': b.created_at.isoformat(),
            'updated_at': b.updated_at.isoformat() if b.updated_at else None
        })
    return jsonify(result)

# --- API: Verify Booking with Code ---
@booking_bp.route('/v1/bookings/verify', methods=['POST'])
def verify_booking():
    data = request.json
    code = data.get('verification_code')

    booking = Booking.query.filter_by(verification_code=code).first()
    if not booking:
        return jsonify({'success': False, 'message': 'Invalid verification code.'}), 404

    if booking.is_verified:
        return jsonify({'success': False, 'message': 'Booking already verified.'}), 400

    booking.is_verified = True
    booking.status = "confirmed"
    booking.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify({
        'success': True,
        'message': 'Booking verified successfully!',
        'booking_id': booking.booking_id,
        'guest_name': booking.guest_name
    }), 200