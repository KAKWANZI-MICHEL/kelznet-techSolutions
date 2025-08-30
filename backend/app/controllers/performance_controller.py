from flask import Blueprint, jsonify
from app.extensions import db
from app.model.booking import Booking
from datetime import datetime, timedelta

performance_bp = Blueprint('performance_bp', __name__, url_prefix='/v1/performance')

@performance_bp.route('/booking-verification', methods=['GET'])
def get_booking_verification_performance():
    """
    Calculates the booking verification rate and its trend.
    - Overall Performance: Percentage of all bookings that are verified.
    - Trend: Compares the verification rate of the last 7 days vs. the previous 7 days.
    """
    try:
        # --- Overall Performance Calculation ---
        total_bookings = Booking.query.count()
        verified_bookings = Booking.query.filter_by(is_verified=True).count()
        
        overall_performance = (verified_bookings / total_bookings * 100) if total_bookings > 0 else 0

        # --- Trend Calculation ---
        today = datetime.utcnow()
        
        # Date ranges for trend comparison
        end_date_current_week = today
        start_date_current_week = today - timedelta(days=7)
        end_date_previous_week = start_date_current_week
        start_date_previous_week = end_date_previous_week - timedelta(days=7)

        # Bookings in the last 7 days
        total_current_week = Booking.query.filter(
            Booking.created_at.between(start_date_current_week, end_date_current_week)
        ).count()
        verified_current_week = Booking.query.filter_by(is_verified=True).filter(
            Booking.created_at.between(start_date_current_week, end_date_current_week)
        ).count()
        
        # Bookings in the 7 days before that
        total_previous_week = Booking.query.filter(
            Booking.created_at.between(start_date_previous_week, end_date_previous_week)
        ).count()
        verified_previous_week = Booking.query.filter_by(is_verified=True).filter(
            Booking.created_at.between(start_date_previous_week, end_date_previous_week)
        ).count()
        
        # Calculate verification rates for the two periods
        rate_current_week = (verified_current_week / total_current_week * 100) if total_current_week > 0 else 0
        rate_previous_week = (verified_previous_week / total_previous_week * 100) if total_previous_week > 0 else 0

        # Calculate the percentage change (trend)
        trend = rate_current_week - rate_previous_week if rate_previous_week > 0 else rate_current_week

        return jsonify({
            "performance_percentage": round(overall_performance, 2),
            "trend_percentage": round(trend, 2)
        }), 200

    except Exception as e:
        return jsonify({"error": "Could not calculate performance metrics", "details": str(e)}), 500
