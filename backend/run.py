from app import create_app
from app.extensions import db

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()
        print("Database tables created.")
    app.run(debug=True, port=5000)
