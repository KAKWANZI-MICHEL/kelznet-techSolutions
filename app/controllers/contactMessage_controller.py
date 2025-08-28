

from flask import Blueprint, request, jsonify  # Import Flask tools: Blueprint (for routes), request (to read client data), jsonify (to send JSON responses)
from app.model.contactMessage import ContactMessage  # Import the ContactMessage model (represents messages table in DB)
from app.extensions import db  # Import database connection (SQLAlchemy instance)

contact_bp = Blueprint('contact_bp', __name__, url_prefix='/api/v1/contact_bp')  # Create a blueprint for contact routes with a URL prefix

# 🔹 POST: Send a contact message
@contact_bp.route('/contact', methods=['POST'])  # Define POST route /api/v1/contact_bp/contact
def send_contact():  # Function to handle sending a new contact message
    if not request.is_json:  # Check if the request body is in JSON format
        return jsonify({"error": "Content-Type must be application/json"}), 400  # If not, return error response

    data = request.get_json()  # Parse JSON body from client request
    name = data.get('name')  # Extract "name" field
    email = data.get('email')  # Extract "email" field
    message = data.get('message')  # Extract "message" field

    if not name or not email or not message:  # Check if any field is missing
        return jsonify({"error": "All fields (name, email, message) are required"}), 400  # Return error if missing

    msg = ContactMessage(name=name, email=email, message=message)  # Create new ContactMessage object with data
    db.session.add(msg)  # Add new message to the database session
    db.session.commit()  # Save (commit) the message into the database

    return jsonify({"message": "Message sent"}), 201  # Return success response with status code 201 (Created)


# 🔹 GET: Get all contact messages
@contact_bp.route('/contact', methods=['GET'])  # Define GET route /api/v1/contact_bp/contact
def get_contacts():  # Function to fetch all messages
    messages = ContactMessage.query.all()  # Query database for all messages
    if not messages:  # Check if there are no messages
        return jsonify({"message": "No messages found", "messages": []}), 200  # Return empty list if none found

    data = [{  # Convert each message object into a dictionary (JSON serializable)
        "id": m.id,  # Message ID
        "name": m.name,  # Sender's name
        "email": m.email,  # Sender's email
        "message": m.message,  # Message content
        "created_at": m.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Format created_at datetime
    } for m in messages]  # Do this for every message in the list

    return jsonify({  # Return response with count and list of messages
        "message": f"{len(data)} messages found.",  # Message with number of results
        "messages": data  # The list of messages
    }), 200  # Success status


# 🔹 GET: Get one contact message by ID
@contact_bp.route('/contact/<int:message_id>', methods=['GET'])  # Define GET route with message_id parameter
def get_contact_by_id(message_id):  # Function to fetch single message by ID
    msg = ContactMessage.query.get(message_id)  # Search for message with that ID in the database
    if not msg:  # If message does not exist
        return jsonify({"error": "Message not found"}), 404  # Return error response

    return jsonify({  # Return the found message
        "id": msg.id,  # Message ID
        "name": msg.name,  # Sender's name
        "email": msg.email,  # Sender's email
        "message": msg.message,  # Message content
        "created_at": msg.created_at.strftime("%Y-%m-%d %H:%M:%S")  # Formatted creation date
    }), 200  # Success status


# 🔹 DELETE: Delete contact message by ID
@contact_bp.route('/contact/<int:message_id>', methods=['DELETE'])  # Define DELETE route with message_id parameter
def delete_contact(message_id):  # Function to delete message by ID
    msg = ContactMessage.query.get(message_id)  # Find message by ID
    if not msg:  # If message not found
        return jsonify({"error": "Message not found"}), 404  # Return error response

    db.session.delete(msg)  # Delete the found message
    db.session.commit()  # Save (commit) changes to the database

    return jsonify({"message": "Message deleted successfully"}), 200  # Return success confirmation
