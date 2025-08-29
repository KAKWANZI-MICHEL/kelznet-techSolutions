

from flask import Blueprint, request, jsonify   # Import Blueprint (for modular routes), request (for incoming HTTP data), jsonify (to send JSON responses)
from app.model.auth import User   # Import the User model (represents the user table in the DB)
from app.extensions import db   # Import SQLAlchemy database instance for queries and transactions
import re   # Import regex module for email validation

user_bp = Blueprint('user_bp', __name__, url_prefix='/api/v1/user_bp')   # Create a Flask blueprint for user routes with a URL prefix

# 🔹 Email validation regex
def is_valid_email(email):   # Function to check if email is valid using regex
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)   # Returns True if email matches pattern, else None

# 🔹 Create user
@user_bp.route('/create_user', methods=['POST'])   # Define POST endpoint for creating a new user
def create_user():
    if not request.is_json:   # Ensure request content is JSON
        return jsonify({"error": "Request must be JSON"}), 400   # Return error if not JSON

    try:
        data = request.get_json(force=True)  # Parse request body into JSON, force=True ensures strict parsing
    except Exception as e:   # Catch parsing errors
        return jsonify({"error": "Invalid JSON"}), 400   # Return invalid JSON error

    fullName = data.get('fullName')   # Extract fullName field from request body
    email = data.get('email')   # Extract email field
    phoneNumber = data.get('phoneNumber')   # Extract phoneNumber field
    company = data.get('company')   # Extract company field

    if not fullName:   # Validate fullName
        return jsonify({"error": "Full name is required"}), 400
    if not email:   # Validate email presence
        return jsonify({"error": "Email is required"}), 400
    if not is_valid_email(email):   # Validate email format
        return jsonify({"error": "Invalid email format"}), 400

    try:
        new_user = User(   # Create new User object with provided data
            full_name=fullName,
            email=email,
            password_hash='default_password_hash',  # You should hash a default password
            role='client'
        )
        db.session.add(new_user)   # Add new user to DB session
        db.session.commit()   # Commit transaction to save user
        return jsonify({"message": "User created successfully"}), 201   # Return success response
    except Exception as e:   # Handle DB errors
        db.session.rollback()   # Rollback transaction if error
        return jsonify({"error": str(e)}), 500   # Return error with status 500

# 🔹 Get all users
@user_bp.route('/users', methods=['GET'])   # Define GET endpoint for fetching all users
def get_all_users():
    users = User.query.all()   # Query all user records from DB
    result = [{   # Create list of user dicts
        "userId": user.userId,
        "fullName": user.full_name,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    } for user in users]   # List comprehension to map users to dictionaries
    return jsonify(result), 200   # Return all users in JSON with 200 status

# 🔹 Get user by ID
@user_bp.route('/users/<int:user_id>', methods=['GET'])   # Define GET endpoint to fetch user by ID
def get_user(user_id):
    user = User.query.get(user_id)   # Query DB for user with given ID
    if not user:   # If user not found
        return jsonify({"error": "User not found"}), 404   # Return error
    return jsonify({   # Return user details as JSON
        "userId": user.userId,
        "fullName": user.full_name,
        "email": user.email,
        "role": user.role,
        "created_at": user.created_at,
        "updated_at": user.updated_at
    }), 200

# 🔹 Update user
@user_bp.route('/users/<int:user_id>', methods=['PUT'])   # Define PUT endpoint to update user by ID
def update_user(user_id):
    user = User.query.get(user_id)   # Query DB for user by ID
    if not user:   # If user not found
        return jsonify({"error": "User not found"}), 404   # Return error

    if not request.is_json:   # Ensure request is JSON
        return jsonify({"error": "Request must be JSON"}), 400

    try:
        data = request.get_json(force=True)   # Parse JSON request body
    except:
        return jsonify({"error": "Invalid JSON format"}), 400   # Return error if JSON invalid

    full_name = data.get('fullName', user.full_name)   # Get new fullName or keep old
    email = data.get('email', user.email)   # Get new email or keep old

    if not full_name or not email:   # Validate required fields
        return jsonify({"error": "Full name and email cannot be empty"}), 400
    if not is_valid_email(email):   # Validate email format
        return jsonify({"error": "Invalid email format"}), 400

    user.full_name = full_name   # Update user fullName
    user.email = email   # Update user email

    try:
        db.session.commit()   # Commit changes to DB
        return jsonify({"message": "User updated successfully"}), 200   # Return success
    except Exception as e:   # Handle DB errors
        db.session.rollback()   # Rollback if error occurs
        return jsonify({"error": str(e)}), 500   # Return error response

# 🔹 Delete user
@user_bp.route('/users/<int:user_id>', methods=['DELETE'])   # Define DELETE endpoint to remove user by ID
def delete_user(user_id):
    user = User.query.get(user_id)   # Query DB for user by ID
    if not user:   # If user not found
        return jsonify({"error": "User not found"}), 404   # Return error

    try:
        db.session.delete(user)   # Delete user from DB session
        db.session.commit()   # Commit delete operation
        return jsonify({"message": "User deleted successfully"}), 200   # Return success
    except Exception as e:   # Handle errors
        db.session.rollback()   # Rollback if error
        return jsonify({"error": str(e)}), 500   # Return error response
