
from flask import Blueprint, request, jsonify   # Import Blueprint (for modular routes), request (to get data from client), jsonify (to return JSON responses)
from app.model.serviceRequest import ServiceRequest  # Import the ServiceRequest model (represents the service_request table in DB)
from app.extensions import db   # Import the db object (SQLAlchemy instance) to interact with the database

# ✅ Define the blueprint
service_request_bp = Blueprint('service_request_bp', __name__,url_prefix='/api/v1/service_request_bp')  # Create a blueprint named 'service_request_bp' with base URL prefix

# 🔹 Create a new service request
@service_request_bp.route('/service-requests', methods=['POST'])   # Define POST endpoint for creating a new service request
def create_service_request():
    data = request.get_json()   # Get JSON data sent by client
    try:
        new_request = ServiceRequest(   # Create a new ServiceRequest object with data from client
            serviceRequestId=data.get('serviceRequestId'),  # Assign serviceRequestId from JSON body
            userId=data.get('userId'),   # Assign userId from JSON body
            service_id=data.get('service_id'),   # Assign service_id from JSON body
            additionalDetails=data.get('additionalDetails')  # Assign additionalDetails from JSON body
        )
        db.session.add(new_request)   # Add the new object to the DB session
        db.session.commit()   # Commit transaction (save to database)
        return jsonify({"message": "Service request created successfully"}), 201   # Return success response with 201 status
    except Exception as e:   # If any error occurs
        return jsonify({"error": str(e)}), 400   # Return error message with status 400


# 🔹 Get all service requests
@service_request_bp.route('/service-requests', methods=['GET'])   # Define GET endpoint for fetching all service requests
def get_all_service_requests():
    requests = ServiceRequest.query.all()   # Query all service requests from DB
    result = []   # Create an empty list to store results
    for r in requests:   # Loop through each service request
        result.append({   # Append dictionary with service request details
            "serviceRequestId": r.serviceRequestId,
            "userId": r.userId,
            "additionalDetails": r.additionalDetails,
            "created_at": r.created_at,
            "updated_at": r.updated_at
        })
    return jsonify(result), 200   # Return list of service requests with status 200


# 🔹 Get service request by ID
@service_request_bp.route('/service-requests/<int:req_id>', methods=['GET'])   # Define GET endpoint for fetching one request by ID
def get_service_request(req_id):
    r = ServiceRequest.query.get(req_id)   # Query DB for a service request with given ID
    if not r:   # If no record found
        return jsonify({"error": "Service request not found"}), 404   # Return error with status 404

    return jsonify({   # Return the found service request details
        "serviceRequestId": r.serviceRequestId,
        "userId": r.userId,
        "additionalDetails": r.additionalDetails,
        "created_at": r.created_at,
        "updated_at": r.updated_at
    }), 200


# 🔹 Update service request
@service_request_bp.route('/service-requests/<int:req_id>', methods=['PUT'])   # Define PUT endpoint for updating a service request
def update_service_request(req_id):
    r = ServiceRequest.query.get(req_id)   # Find the service request by ID
    if not r:   # If not found
        return jsonify({"error": "Service request not found"}), 404   # Return error

    data = request.get_json()   # Get JSON data from request body
    r.userId = data.get('userId', r.userId)   # Update userId if provided, otherwise keep old value
    r.additionalDetails = data.get('additionalDetails', r.additionalDetails)   # Update details if provided
    db.session.commit()   # Save changes to database

    return jsonify({"message": "Service request updated successfully"}), 200   # Return success response


# 🔹 Delete service request
@service_request_bp.route('/service-requests/<int:req_id>', methods=['DELETE'])   # Define DELETE endpoint for removing a service request
def delete_service_request(req_id):
    r = ServiceRequest.query.get(req_id)   # Find the service request by ID
    if not r:   # If not found
        return jsonify({"error": "Service request not found"}), 404   # Return error

    db.session.delete(r)   # Delete the record from DB
    db.session.commit()   # Commit deletion
    return jsonify({"message": "Service request deleted successfully"}), 200   # Return success response
