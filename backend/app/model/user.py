from datetime import datetime   # Import datetime so we can automatically track when users are created or updated
from app.extensions import db   # Import the database object (SQLAlchemy) to define our User table

class User(db.Model):   # Define a class "User" that represents the "users" table in the database
    __tablename__ = 'users'   # Explicitly set the table name to "users"

    userid = db.Column(db.Integer, primary_key=True)  
    # Column: "userid" is an integer, acts as the primary key (unique identifier for each user)

    fullName = db.Column(db.String(100), nullable=False)  
    # Column: "fullName" stores the user's full name as a string (max 100 chars). Cannot be empty.

    email = db.Column(db.String(100), nullable=False)  
    # Column: "email" stores the user's email as a string (max 100 chars). Cannot be empty.

    phoneNumber = db.Column(db.String(20))  
    # Column: "phoneNumber" stores the user's phone number as a string (max 20 chars). Optional field.

    company = db.Column(db.String(100))  
    # Column: "company" stores the company name the user belongs to as a string (max 100 chars). Optional field.

    created_at = db.Column(db.DateTime, default=datetime.utcnow)  
    # Column: "created_at" stores the date and time when the user was created. Defaults to current time automatically.

    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)  
    # Column: "updated_at" stores the date and time when the user record was last updated. Updates automatically whenever the row changes.

    def __init__(self, fullName, email, phoneNumber, company):  
        # Constructor method: runs when a new User object is created
        self.fullName = fullName   # Set the fullName property with the value passed in
        self.email = email   # Set the email property with the value passed in
        self.phoneNumber = phoneNumber   # Set the phoneNumber property with the value passed in
        self.company = company   # Set the company property with the value passed in
