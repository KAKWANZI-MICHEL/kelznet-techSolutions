import os
import sys

# Add backend to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from flask import Flask
from app import create_app

# Create Flask app
app = create_app()

# Vercel needs this specific handler pattern
def handler(environ, start_response):
    return app(environ, start_response)
