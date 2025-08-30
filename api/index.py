import os
import sys

# Ensure the backend package is on the import path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, ".."))
BACKEND_DIR = os.path.join(REPO_ROOT, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from app import create_app

# Create the Flask app instance
app = create_app()

# This is the entry point for Vercel
def handler(event, context):
    from vercel_wsgi import handle
    return handle(app, event, context)


