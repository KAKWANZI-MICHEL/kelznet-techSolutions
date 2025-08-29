#!/usr/bin/env python3
"""
Create test users for Kelznet Tech Solutions
Run this script to create admin and client test accounts
"""

from app import create_app
from app.extensions import db
from app.model.auth import User
from werkzeug.security import generate_password_hash

def create_test_users():
    app = create_app()
    
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        
        # Check if admin user already exists
        admin_user = User.query.filter_by(email='admin@kelznet.com').first()
        if not admin_user:
            # Create admin user
            admin_user = User(
                full_name='Admin User',
                email='admin@kelznet.com',
                password_hash=generate_password_hash('admin123'),
                role='admin'
            )
            db.session.add(admin_user)
            print("✅ Created admin user: admin@kelznet.com / admin123")
        else:
            print("ℹ️ Admin user already exists")
        
        # Check if client user already exists  
        client_user = User.query.filter_by(email='client@kelznet.com').first()
        if not client_user:
            # Create client user
            client_user = User(
                full_name='Test Client',
                email='client@kelznet.com',
                password_hash=generate_password_hash('client123'),
                role='client'
            )
            db.session.add(client_user)
            print("✅ Created client user: client@kelznet.com / client123")
        else:
            print("ℹ️ Client user already exists")
            
        try:
            db.session.commit()
            print("\n🎉 Test users created successfully!")
            print("\n📋 Login Credentials:")
            print("👑 Admin Login:")
            print("   Email: admin@kelznet.com")
            print("   Password: admin123")
            print("   Role: admin")
            print("\n👤 Client Login:")
            print("   Email: client@kelznet.com") 
            print("   Password: client123")
            print("   Role: client")
            
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error creating users: {e}")

if __name__ == '__main__':
    create_test_users()
