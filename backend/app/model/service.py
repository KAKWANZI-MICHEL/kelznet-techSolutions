from datetime import datetime   # Import datetime so we can record when a service is created
from app.extensions import db   # Import the database object (SQLAlchemy) from your app
from sqlalchemy.orm import relationship   # Import relationship to define table relationships (links between models)

class Service(db.Model):   # Define a class "Service" that maps to the "services" database table
    __tablename__ = 'services'   # Explicitly set the table name to "services"

    id = db.Column(db.Integer, primary_key=True)   # Column: "id" is an integer and primary key (unique identifier for each service)
    name = db.Column(db.String(100), nullable=False)   # Column: "name" is a string (max 100 chars) and cannot be empty (nullable=False)
    description = db.Column(db.Text)   # Column: "description" stores long text (optional field)
    price = db.Column(db.Float)   # Column: "price" stores a floating-point number (e.g., 50.0 for $50)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)   # Column: "created_at" stores date/time, defaults to now when service is added

    # 🔗 Relationship to ServiceRequest
    # requests = db.relationship('ServiceRequest', backref='service')   # (commented out old relationship syntax)
    requests = relationship(   # Define a relationship between Service and ServiceRequest
        'ServiceRequest',   # Name of the related model (ServiceRequest table)
        primaryjoin='Service.id == foreign(ServiceRequest.service_id)',   # Define how the tables are linked (Service.id → ServiceRequest.service_id)
        backref='service'   # Allow reverse access: each ServiceRequest can reference its related Service via `.service`
    )

    def __init__(self, name, description, price):   # Constructor method: runs when a new Service object is created
        self.name = name   # Set the "name" property with the value passed in
        self.description = description   # Set the "description" property with the value passed in
        self.price = price   # Set the "price" property with the value passed in
