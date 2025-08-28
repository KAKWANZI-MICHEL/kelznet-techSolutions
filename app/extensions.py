from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail


#extensions 
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()  # ← This was missing!
cors = CORS()
mail = Mail()