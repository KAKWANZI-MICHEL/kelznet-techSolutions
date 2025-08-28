from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.model.user import User

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/api/v1/admin')

# 🔹 Admin dashboard landing page (protected)
@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()  # Require JWT token to access
def dashboard():
    current_user = get_jwt_identity()  # Get user info from token

    # Check if the user is an admin
    if current_user['role'] != 'admin':
        return jsonify({"error": "Access forbidden: admins only"}), 403

    user = User.query.get(current_user['userId'])
    if not user:
        return jsonify({"error": "Admin not found"}), 404

    # Return dashboard info (can be customized with stats, messages, etc.)
    return jsonify({
        "message": f"Welcome to the admin dashboard, {user.full_name}!",
        "user": user.to_dict()
    }), 200
