import os
import sys

# Ensure the backend package is on the import path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
BACKEND_DIR = os.path.join(REPO_ROOT, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from app import create_app
from vercel_wsgi import handle

# Create the Flask app instance
flask_app = create_app()

# Vercel serverless function handler
def handler(request, *args):
    return handle(flask_app, request)


