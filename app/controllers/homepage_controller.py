# app/routes/admin.py
from flask import Blueprint, request, jsonify
from app.controllers.homepage_controller import HomeController

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

# --- INTRO ---
@admin_bp.route('/intro', methods=['GET'])
def get_intro():
    intro = HomeController.get_intro()
    if intro:
        return jsonify({
            'id': intro.id,
            'title': intro.title,
            'text': intro.text,
            'image': intro.image,
            'created_at': intro.created_at,
            'updated_at': intro.updated_at
        })
    return jsonify({}), 404

@admin_bp.route('/intro', methods=['POST'])
def update_intro():
    data = request.json
    intro = HomeController.update_intro(
        title=data.get('title'),
        text=data.get('text'),
        image=data.get('image')
    )
    return jsonify({'message': 'Intro updated', 'id': intro.id}), 200