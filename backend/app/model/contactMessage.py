
from datetime import datetime   # Import datetime to handle date and time values (like when the message was created)
from app.extensions import db   # Import the database instance (SQLAlchemy) from your app

class ContactMessage(db.Model):   # Define a class "ContactMessage" that represents a database table
    __tablename__ = 'contactMessages'   # Set the table name in the database to "contactMessages"

    id = db.Column(db.Integer, primary_key=True)   # Define a column "id" as an integer, make it the primary key (unique identifier)
    name = db.Column(db.String(100))   # Define a "name" column that stores up to 100 characters (string)
    email = db.Column(db.String(100))   # Define an "email" column that stores up to 100 characters (string)
    message = db.Column(db.Text)   # Define a "message" column that stores long text (no strict length limit)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)   # Define "created_at" column, store date/time, default is current time (UTC)

    def __init__(self, name, email, message):   # Constructor method to create a new ContactMessage object
        self.name = name   # Set the "name" field to the value passed in
        self.email = email   # Set the "email" field to the value passed in
        self.message = message   # Set the "message" field to the value passed in
