from datetime import datetime
from app.extensions import db
from app.extensions import db

class Footer(db.Model):
    __tablename__ = "footers"
    id = db.Column(db.Integer, primary_key=True)

    link_name = db.Column(db.String(100), nullable=False)
    link_url = db.Column(db.String(255), nullable=False)

    email = db.Column(db.String(100))
    phone = db.Column(db.String(50))
    address = db.Column(db.String(255))

    # ✅ Fixed: db.Column (capital C)
    whatsapp = db.Column(db.String(255))  # ← This was the issue

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(datetime.timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(datetime.timezone.utc),
        onupdate=lambda: datetime.now(datetime.timezone.utc)
    )
