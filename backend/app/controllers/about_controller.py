# controllers/about_controller.py

from flask import Blueprint, render_template, request, jsonify, flash, redirect, url_for
from app.extensions import db
from app.model.about import About  # Adjust import path if needed
import os
from werkzeug.utils import secure_filename
from datetime import datetime, timezone

# Create a Blueprint
about_bp = Blueprint('about', __name__)

# Utility: Get or create the single About record
def get_or_create_about():
    about = About.query.first()
    if not about:
        about = About(
            intro_text="Welcome to our company.",
            vision_title="Our Vision",
            vision_text="To be a global leader in innovation.",
            mission_title="Our Mission",
            mission_text="Empowering businesses through technology.",
            values_title="Our Core Values",
            values_list="Integrity\nInnovation\nExcellence",
            expertise_title="Our Expertise",
            expertise_intro="We specialize in modern web and mobile solutions.",
            expertise_list="Web Development\nMobile Apps\nCloud Solutions\nUI/UX Design"
        )
        db.session.add(about)
        db.session.commit()
    return about


# --- PUBLIC ROUTE ---
# Display the About Us page
@about_bp.route('/about')
def show_about():
    about = get_or_create_about()
    # Convert newline-separated strings to lists
    values = [v.strip() for v in about.values_list.split('\n') if v.strip()] if about.values_list else []
    expertise = [e.strip() for e in about.expertise_list.split('\n') if e.strip()] if about.expertise_list else []
    return render_template('about.html', about=about, values=values, expertise=expertise)


# --- ADMIN ROUTES ---
# Display admin form to edit About content
@about_bp.route('/admin/about', methods=['GET', 'POST'])
def admin_edit_about():
    about = get_or_create_about()

    if request.method == 'POST':
        try:
            # Update fields from form
            about.intro_text = request.form.get('intro_text')
            about.intro_image = request.files.get('intro_image').filename if 'intro_image' in request.files and request.files['intro_image'].filename else about.intro_image
            # Save image if uploaded
            if 'intro_image' in request.files and request.files['intro_image'].filename:
                file = request.files['intro_image']
                filename = secure_filename(file.filename)
                file.save(os.path.join('static/uploads', filename))
                about.intro_image = f"uploads/{filename}"

            about.vision_title = request.form.get('vision_title')
            about.vision_text = request.form.get('vision_text')
            about.mission_title = request.form.get('mission_title')
            about.mission_text = request.form.get('mission_text')

            about.values_title = request.form.get('values_title')
            values_list = request.form.get('values_list')
            about.values_list = '\n'.join([v.strip() for v in values_list.split('\n')]) if values_list else ''

            about.expertise_title = request.form.get('expertise_title')
            about.expertise_intro = request.form.get('expertise_intro')
            expertise_list = request.form.get('expertise_list')
            about.expertise_list = '\n'.join([e.strip() for e in expertise_list.split('\n')]) if expertise_list else ''

            # Handle expertise image
            if 'expertise_image' in request.files and request.files['expertise_image'].filename:
                file = request.files['expertise_image']
                filename = secure_filename(file.filename)
                file.save(os.path.join('static/uploads', filename))
                about.expertise_image = f"uploads/{filename}"

            # Update timestamp
            about.updated_at = datetime.utcnow()

            db.session.commit()
            flash("About page updated successfully!", "success")
            return redirect(url_for('about.show_about'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error updating content: {str(e)}", "danger")

    return render_template('admin/edit_about.html', about=about)


# --- API (Optional) ---
# GET JSON data
@about_bp.route('/v1/about', methods=['GET'])
def api_about():
    about = get_or_create_about()
    if hasattr(about, 'error'):
        return jsonify({'error': about.error}), 404

    return jsonify({
        'intro_text': about.intro_text,
        'intro_image': about.intro_image,
        'vision': {
            'title': about.vision_title,
            'text': about.vision_text
        },
        'mission': {
            'title': about.mission_title,
            'text': about.mission_text
        },
        'values': {
            'title': about.values_title,
            'list': [v.strip() for v in about.values_list.split('\n') if v.strip()] if about.values_list else []
        },
        'expertise': {
            'title': about.expertise_title,
            'intro': about.expertise_intro,
            'list': [e.strip() for e in about.expertise_list.split('\n') if e.strip()] if about.expertise_list else []
        },
        'created_at': about.created_at.isoformat(),
        'updated_at': about.updated_at.isoformat()
    })