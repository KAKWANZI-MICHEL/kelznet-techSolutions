# from app import create_app
# # from flask import Blueprint
# # bp = Blueprint('routes', __name__)


# app = create_app()


# if __name__ =="__main__":
#     app.run(debug=True)



# run.py
# from app import create_app

# app = create_app()
# with app.app_context():
#     db.create_all()

# if __name__ == '__main__':
#     app.run(debug=True)
# from app import create_app
# from app.extensions import db


from app import create_app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        from app.extensions import db
        from app import create_app
        db.create_all()
        print("Database tables created.")
    app.run(debug=True, port=5000)
    

