from datetime import timedelta
import os
class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or f'sqlite:///{os.path.join(os.path.dirname(__file__), "instance", "database.db")}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = "exam" 
    JWT_EXPIRATION_DELTA = timedelta(minutes=10)
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'kelznet-tech-super-secret'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-super-secret-key'