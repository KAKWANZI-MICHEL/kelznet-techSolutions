

# from flask import Blueprint, request, jsonify
# from app.model.service import Service
# from app.extensions import db

# service_bp = Blueprint('service_bp', __name__, url_prefix='/api/v1/service_bp')

# # 🔹 GET all services
# @service_bp.route('/services', methods=['GET'])
# def get_services():
#     services = Service.query.all()
    
#     if not services:
#         return jsonify({
#             "message": "No services available. Please add one.",
#             "services": []
#         }), 200

#     data = [{
#         "id": s.id,
#         "name": s.name,
#         "description": s.description,
#         "price": s.price,
#         "created_at": s.created_at.strftime("%Y-%m-%d %H:%M:%S")
#     } for s in services]

#     return jsonify({
#         "message": f"{len(data)} services found.",
#         "services": data
#     }), 200

# # 🔹 POST a new service
# @service_bp.route('/services', methods=['POST'])
# def create_service():
#     if not request.is_json:
#         return jsonify({"error": "Content-Type must be application/json"}), 400

#     data = request.get_json()
#     name = data.get("name")
#     description = data.get("description")
#     price = data.get("price")

#     if not name or price is None:
#         return jsonify({"error": "Service name and price are required"}), 400

#     try:
#         new_service = Service(
#             name=name,
#             description=description,
#             price=price
#         )
#         db.session.add(new_service)
#         db.session.commit()
#         return jsonify({"message": "Service created successfully"}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# # 🔹 PUT: Update service by ID
# @service_bp.route('/services/<int:service_id>', methods=['PUT'])
# def update_service(service_id):
#     service = Service.query.get(service_id)
#     if not service:
#         return jsonify({"error": "Service not found"}), 404

#     if not request.is_json:
#         return jsonify({"error": "Content-Type must be application/json"}), 400

#     data = request.get_json()
#     service.name = data.get("name", service.name)
#     service.description = data.get("description", service.description)
#     service.price = data.get("price", service.price)

#     try:
#         db.session.commit()
#         return jsonify({"message": "Service updated successfully"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# # 🔹 DELETE: Delete service by ID
# @service_bp.route('/services/<int:service_id>', methods=['DELETE'])
# def delete_service(service_id):
#     service = Service.query.get(service_id)
#     if not service:
#         return jsonify({"error": "Service not found"}), 404

#     try:
#         db.session.delete(service)
#         db.session.commit()
#         return jsonify({"message": "Service deleted successfully"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500


from flask import Blueprint, request, jsonify   # Importing Flask tools for creating routes, handling requests, and sending JSON responses
from app.model.service import Service           # Importing the Service model (represents services in the database)
from app.extensions import db                   # Importing the database instance (SQLAlchemy)

# Create a Blueprint for services (groups routes under a common URL prefix)
service_bp = Blueprint('service_bp', __name__, url_prefix='/v1/service_bp')

# 🔹 GET all services
@service_bp.route('/services', methods=['GET'])  # Route for fetching all services, using HTTP GET
def get_services():
    services = Service.query.all()              # Query the database for all services
    
    if not services:                            # If no services are found
        return jsonify({                        # Return a message and empty list
            "message": "No services available. Please add one.",
            "services": []
        }), 200

    # Convert each service object into a dictionary (serialize it)
    data = [{
        "id": s.id,                             # Service ID
        "name": s.name,                         # Service name
        "description": s.description,           # Service description
        "price": s.price,                       # Service price
        "created_at": s.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Format created_at date
    } for s in services]

    # Return all services in JSON format
    return jsonify({
        "message": f"{len(data)} services found.",   # Number of services found
        "services": data                             # List of services
    }), 200

# 🔹 POST a new service
@service_bp.route('/services', methods=['POST'])   # Route for creating a new service using POST
def create_service():
    if not request.is_json:                        # Check if request body is JSON
        return jsonify({"error": "Content-Type must be application/json"}), 400

    data = request.get_json()                      # Get JSON data from request body
    name = data.get("name")                        # Extract service name
    description = data.get("description")          # Extract service description
    price = data.get("price")                      # Extract service price

    # Check if required fields are missing
    if not name or price is None:
        return jsonify({"error": "Service name and price are required"}), 400

    try:
        # Create a new Service object
        new_service = Service(
            name=name,
            description=description,
            price=price
        )
        db.session.add(new_service)                # Add the new service to the database session
        db.session.commit()                        # Save changes permanently
        return jsonify({"message": "Service created successfully"}), 201
    except Exception as e:                         # If something goes wrong
        db.session.rollback()                      # Rollback changes to avoid corruption
        return jsonify({"error": str(e)}), 500     # Return the error message

# 🔹 PUT: Update service by ID
@service_bp.route('/services/<int:service_id>', methods=['PUT'])  # Route to update a service by ID
def update_service(service_id):
    service = Service.query.get(service_id)        # Find service by ID
    if not service:                                # If service not found
        return jsonify({"error": "Service not found"}), 404

    if not request.is_json:                        # Ensure request body is JSON
        return jsonify({"error": "Content-Type must be application/json"}), 400

    data = request.get_json()                      # Get JSON data
    service.name = data.get("name", service.name)  # Update name if provided
    service.description = data.get("description", service.description)  # Update description if provided
    service.price = data.get("price", service.price)  # Update price if provided

    try:
        db.session.commit()                        # Save updated service
        return jsonify({"message": "Service updated successfully"}), 200
    except Exception as e:
        db.session.rollback()                      # Undo changes if error
        return jsonify({"error": str(e)}), 500

# 🔹 DELETE: Delete service by ID
@service_bp.route('/services/<int:service_id>', methods=['DELETE'])  # Route to delete a service by ID
def delete_service(service_id):
    service = Service.query.get(service_id)        # Find service by ID
    if not service:                                # If not found
        return jsonify({"error": "Service not found"}), 404

    try:
        db.session.delete(service)                 # Delete service from session
        db.session.commit()                        # Save changes
        return jsonify({"message": "Service deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()                      # Rollback if error
        return jsonify({"error": str(e)}), 500
