#!/usr/bin/env python3
"""
Create services for Kelznet Tech Solutions booking system
This populates the services table with the options shown in the frontend
"""

from app import create_app
from app.extensions import db
from app.model.service import Service

def create_services():
    app = create_app()
    
    with app.app_context():
        # Create tables if they don't exist
        db.create_all()
        
        # Services from the frontend BookingForm.js
        services_data = [
            {
                'name': 'Computer Repair',
                'description': 'Professional computer hardware and software repair services',
                'price': 75.00
            },
            {
                'name': 'Software Installation', 
                'description': 'Installation and configuration of software applications',
                'price': 50.00
            },
            {
                'name': 'Lab set-up',
                'description': 'Complete computer lab setup and configuration',
                'price': 200.00
            },
            {
                'name': 'Network set-up',
                'description': 'Network infrastructure setup and configuration',
                'price': 150.00
            },
            {
                'name': 'ICT Training',
                'description': 'Information and Communication Technology training sessions',
                'price': 100.00
            }
        ]
        
        for service_data in services_data:
            # Check if service already exists
            existing_service = Service.query.filter_by(name=service_data['name']).first()
            if not existing_service:
                # Create new service
                service = Service(
                    name=service_data['name'],
                    description=service_data['description'],
                    price=service_data['price']
                )
                db.session.add(service)
                print(f"✅ Created service: {service_data['name']} (${service_data['price']})")
            else:
                print(f"ℹ️ Service already exists: {service_data['name']}")
        
        try:
            db.session.commit()
            print(f"\n🎉 Services setup completed successfully!")
            
            # Show all services
            all_services = Service.query.all()
            print(f"\n📋 Available Services:")
            for service in all_services:
                print(f"   {service.id}. {service.name} - ${service.price}")
                
        except Exception as e:
            db.session.rollback()
            print(f"❌ Error creating services: {e}")

if __name__ == '__main__':
    create_services()
