from datetime import datetime
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    userId = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)  # Stores hashed password
    role = db.Column(db.String(20), default='client')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, full_name, email, password_hash, role='client'):
        """
        Constructor to initialize a User instance.
        Password should already be hashed before passing in.
        """
        self.full_name = full_name
        self.email = email
        self.password_hash = password_hash  # Already hashed
        self.role = role

    # For compatibility with existing code
    @property
    def fullName(self):
        return self.full_name
    
    @property  
    def password(self):
        return self.password_hash

    def set_password(self, password_plaintext):
        """Hash and set the password."""
        self.password_hash = generate_password_hash(password_plaintext)

    def check_password(self, password_plaintext):
        """Check plaintext password against stored hash."""
        return check_password_hash(self.password_hash, password_plaintext)

    def __repr__(self):
        return f"<User {self.full_name} ({self.email})>"
