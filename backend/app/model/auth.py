from datetime import datetime
from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    userId = db.Column(db.Integer, primary_key=True)
    fullName = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)  # Stores hashed password
    role = db.Column(db.String(20), default='client')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def __init__(self, fullName, email, password, role='client'):
        """
        Constructor to initialize a User instance.
        Password should already be hashed before passing in.
        """
        self.fullName = fullName
        self.email = email
        self.password = password  # Already hashed
        self.role = role

    def set_password(self, password_plaintext):
        """Hash and set the password."""
        self.password = generate_password_hash(password_plaintext)

    def check_password(self, password_plaintext):
        """Check plaintext password against stored hash."""
        return check_password_hash(self.password, password_plaintext)

    def __repr__(self):
        return f"<User {self.fullName} ({self.email})>"
