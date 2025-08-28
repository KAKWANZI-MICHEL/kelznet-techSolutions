from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.model.user import User
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import timedelta

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')

# Helper function: verify user
def get_user(email, password):
    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        return user
    return None

# Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    fullName = data.get('fullname')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'client')

    # Validate required fields
    if not fullName or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    if role not in ['client', 'admin']:
        return jsonify({"error": "Invalid role"}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    try:
        # Create user with hashed password
        new_user = User(
            fullName=fullName,
            email=email,
            password=generate_password_hash(password),  # Store hashed password
            role=role
        )
        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "userId": new_user.userId,
                "fullName": new_user.fullName,
                "email": new_user.email,
                "role": new_user.role,
                "created_at": new_user.created_at
            }
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    user = get_user(email, password)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity={"userId": user.userId, "role": user.role},
        expires_delta=timedelta(hours=24)
    )

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "userId": user.userId,
            "fullName": user.fullName,
            "email": user.email,
            "role": user.role
        }
    }), 200

# Profile route (protected)
@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user = get_jwt_identity()
    user = User.query.get(current_user["userId"])
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "userId": user.userId,
        "fullName": user.fullName,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }), 200

# Logout route
@auth_bp.route('/logout', methods=['GET'])
def logout():
    return jsonify({"message": "Logged out successfully"}), 200
