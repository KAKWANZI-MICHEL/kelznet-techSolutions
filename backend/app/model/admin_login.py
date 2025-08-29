from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from datetime import timedelta
from app.model.auth import User
from app.extensions import db
from datetime import datetime

class AdminLogin(db.Model):  # ← Must be exactly this
    __tablename__ = 'adminlogins'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)
    last_login = db.Column(db.DateTime, default=lambda: datetime.now(datetime.timezone.utc))
    is_active = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f"<AdminLogin {self.username}>"