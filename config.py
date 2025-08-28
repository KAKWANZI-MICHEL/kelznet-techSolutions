from datetime import timedelta
import os
class Config:
     SQLALCHEMY_DATABASE_URI =  'mysql+pymysql://root:@localhost/kelznettech_db'
     JWT_SECRET_KEY = "exam" 
     JWT_EXPIRATION_DELTA = timedelta(minutes=10)
     SECRET_KEY = os.environ.get('SECRET_KEY') or 'kelznet-tech-super-secret'
     JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-super-secret-key'