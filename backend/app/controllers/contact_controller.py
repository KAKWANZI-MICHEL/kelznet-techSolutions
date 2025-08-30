# controllers/contact_controller.py

from flask import Blueprint, request, jsonify, render_template, flash, redirect, url_for
from app.extensions import db
from app.model.contact import ContactMessage, ContactBanner  # Adjust import path as needed
from datetime import datetime
import os
from werkzeug.utils import secure_filename

# Create Blueprint
contact_bp = Blueprint('contact', __name__)

# Configure upload folder (adjust as needed)
UPLOAD_FOLDER = 'static/uploads/banners'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# --- UTILITY: Get or create default banner ---
def get_or_create_banner():
    banner = ContactBanner.query.first()
    if not banner:
        # Create default placeholder
        banner = ContactBanner(image_url="/static/uploads/banners/default-contact.jpg")
        db.session.add(banner)
        db.session.commit()
    return banner


# --- PUBLIC: Display Contact Page ---
@contact_bp.route('/contact', methods=['GET'])
def contact_page():
    banner = get_or_create_banner()
    return render_template('contact/index.html', banner=banner)


# --- PUBLIC: Submit Contact Form ---
@contact_bp.route('/contact', methods=['POST'])
def submit_contact():
    try:
        first_name = request.form.get('first_name')
        last_name = request.form.get('last_name')
        email = request.form.get('email')
        subject = request.form.get('subject')
        message = request.form.get('message')

        # Validation
        if not all([first_name, last_name, email, subject]):
            return jsonify({"success": False, "message": "All fields are required."}), 400

        # Save message
        msg = ContactMessage(
            first_name=first_name,
            last_name=last_name,
            email=email,
            subject=subject,
            message=message
        )
        db.session.add(msg)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Thank you! Your message has been sent.",
            "id": msg.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"An error occurred: {str(e)}"
        }), 500


# --- ADMIN: List All Messages ---
@contact_bp.route('/admin/contact/messages')
def admin_list_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return render_template('admin/contact_messages.html', messages=messages)


# --- ADMIN: View Single Message ---
@contact_bp.route('/admin/contact/messages/<int:message_id>')
def admin_view_message(message_id):
    message = ContactMessage.query.get_or_404(message_id)
    return render_template('admin/contact_message_detail.html', message=message)


# --- ADMIN: Delete Message ---
@contact_bp.route('/admin/contact/messages/<int:message_id>/delete', methods=['POST'])
def admin_delete_message(message_id):
    message = ContactMessage.query.get_or_404(message_id)
    try:
        db.session.delete(message)
        db.session.commit()
        flash("Message deleted successfully.", "info")
    except Exception as e:
        db.session.rollback()
        flash(f"Error deleting message: {str(e)}", "danger")
    return redirect(url_for('contact.admin_list_messages'))


# --- ADMIN: Manage Banner ---
@contact_bp.route('/admin/contact/banner', methods=['GET', 'POST'])
def admin_manage_banner():
    banner = get_or_create_banner()

    if request.method == 'POST':
        try:
            if 'image' in request.files and request.files['image'].filename:
                file = request.files['image']
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    filepath = os.path.join(UPLOAD_FOLDER, filename)
                    file.save(filepath)
                    # Update DB
                    old_image = banner.image_url
                    banner.image_url = f"uploads/banners/{filename}"
                    # Optional: delete old file
                    if old_image.startswith("uploads/banners/") and os.path.exists(f"static/{old_image}"):
                        os.remove(f"static/{old_image}")
            db.session.commit()
            flash("Banner updated successfully!", "success")
            return redirect(url_for('contact.admin_manage_banner'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error uploading banner: {str(e)}", "danger")

    return render_template('admin/contact_banner.html', banner=banner)


# --- API: Get Messages ---
@contact_bp.route('/v1/contact/messages', methods=['GET'])
def api_list_messages():
    messages = ContactMessage.query.order_by(ContactMessage.created_at.desc()).all()
    return jsonify([msg.as_dict() for msg in messages])


# --- API: Get Banner ---
@contact_bp.route('/v1/contact/banner', methods=['GET'])
def api_get_banner():
    banner = get_or_create_banner()
    return jsonify({
        "id": banner.id,
        "image_url": banner.image_url
    })