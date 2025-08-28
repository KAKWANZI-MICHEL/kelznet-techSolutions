# controllers/footer_controller.py

from flask import Blueprint, request, jsonify, render_template, flash, redirect, url_for
from app.extensions import db
from app.model.footer import Footer
from datetime import datetime

# Create Blueprint
footer_bp = Blueprint('footer', __name__)

# Utility: Get main footer (or first)
def get_footer():
    footer = Footer.query.first()
    if not footer:
        # Optional: create default footer
        footer = Footer(
            link_name="Home",
            link_url="/",
            email="contact@example.com",
            phone="+1234567890",
            address="123 Main St, City, Country",
            whatsapp="https://wa.me/1234567890"
        )
        db.session.add(footer)
        db.session.commit()
    return footer

# --- PUBLIC: Render Footer in Context (or standalone) ---
# Usually footers are partials, but here's a preview route
@footer_bp.route('/footer/preview')
def preview_footer():
    footer = get_footer()
    # In real use, this would be in base.html
    return render_template('footer/preview.html', footer=footer)

# --- ADMIN: List all footer links (or just the one) ---
@footer_bp.route('/admin/footer', methods=['GET', 'POST'])
def manage_footer():
    footer = get_footer()

    if request.method == 'POST':
        try:
            # Update fields
            footer.link_name = request.form.get('link_name')
            footer.link_url = request.form.get('link_url')
            footer.email = request.form.get('email')
            footer.phone = request.form.get('phone')
            footer.address = request.form.get('address')
            footer.whatsapp = request.form.get('whatsapp')

            footer.updated_at = datetime.utcnow()
            db.session.commit()

            flash("Footer updated successfully!", "success")
            return redirect(url_for('footer.manage_footer'))
        except Exception as e:
            db.session.rollback()
            flash(f"Error updating footer: {str(e)}", "danger")

    return render_template('admin/footer_form.html', footer=footer)

# --- API: Get Footer Data (for frontend or SPA) ---
@footer_bp.route('/api/footer', methods=['GET'])
def api_get_footer():
    footer = get_footer()
    return jsonify(footer.to_dict())

# --- API: Bulk Update or Add Links (Optional: support multiple links) ---
# If you want multiple quick links, consider a separate QuickLink model.
# But for now, this updates the single record.
@footer_bp.route('/api/footer', methods=['PUT'])
def api_update_footer():
    footer = get_footer()
    data = request.get_json()

    try:
        footer.link_name = data.get('link_name', footer.link_name)
        footer.link_url = data.get('link_url', footer.link_url)
        footer.email = data.get('email', footer.email)
        footer.phone = data.get('phone', footer.phone)
        footer.address = data.get('address', footer.address)
        footer.whatsapp = data.get('whatsapp', footer.whatsapp)

        footer.updated_at = datetime.utcnow()
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Footer updated.",
            "footer": footer.to_dict()
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "success": False,
            "message": f"Error: {str(e)}"
        }), 400