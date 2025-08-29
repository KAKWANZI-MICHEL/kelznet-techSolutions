from flask import Flask, request, Response
from config import Config
from app.extensions import db, jwt
from flask_migrate import Migrate
import json

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.debug = True

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    Migrate(app, db)

    # Import models so Flask-Migrate can detect them
    from app.model.serviceRequest import ServiceRequest
    from app.model.user import User
    from app.model.contactMessage import ContactMessage
    from app.model.service import Service
    from app.model.admin_login import AdminLogin
    from app.model.booking import Booking
    from app.model.contact import ContactBanner
    from app.model.footer import Footer
    from app.model.homepage import Homepage
    from app.model.about import About

    # Register Blueprints
    from app.controllers.auth_controller import auth_bp
    from app.controllers.service_request_controller import service_request_bp
    from app.controllers.user_controller import user_bp
    from app.controllers.contactMessage_controller import contact_bp
    from app.controllers.service_controller import service_bp
    from app.controllers.about_controller import about_bp
    from app.controllers.booking_controller import booking_bp
    from app.controllers.footer_controller import footer_bp
    from app.controllers.contact_controller import contact_bp as contact_banner_bp
    from app.controllers.admin_login_controller import admin_bp

    # Blueprint registration
    app.register_blueprint(auth_bp)
    app.register_blueprint(service_request_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(service_bp)
    app.register_blueprint(contact_bp)
    app.register_blueprint(contact_banner_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(footer_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(about_bp)

    # Simple route for testing
    @app.route('/manual', methods=["GET"])
    def manual_json():
        data = {"message": "Manual JSON"}
        return Response(json.dumps(data), content_type="application/json")

    return app
