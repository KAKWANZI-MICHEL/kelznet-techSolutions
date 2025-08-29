from datetime import datetime   # Import datetime so we can automatically store when requests are created or updated
from app.extensions import db   # Import the database object (SQLAlchemy) to define our database table

class ServiceRequest(db.Model):   # Define a class "ServiceRequest" that maps to the "serviceRequests" table in the database
    __tablename__ = 'serviceRequests'   # Explicitly set the table name to "serviceRequests"

    serviceRequestId = db.Column(db.Integer, primary_key=True, autoincrement=True)  
    # Column: "serviceRequestId" is an integer, acts as the primary key (unique ID), and will auto-increment (1,2,3,...)

    # No foreign keys → means we just store IDs directly (not linked to other tables with actual constraints)
    userId = db.Column(db.Integer, nullable=False)  
    # Column: "userId" is an integer representing the user who made the request. Cannot be empty.

    service_id = db.Column(db.Integer, nullable=False)  
    # Column: "service_id" is an integer representing which service was requested. Cannot be empty.

    additionalDetails = db.Column(db.String(100), nullable=False)  
    # Column: "additionalDetails" is a string (max 100 characters) where extra info about the request can be stored. Cannot be empty.

    created_at = db.Column(db.DateTime, default=datetime.utcnow)  
    # Column: "created_at" stores the exact date and time the request was created. Defaults to the current time automatically.

    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)  
    # Column: "updated_at" stores the date and time when the request was last updated. Updates automatically whenever the row changes.
