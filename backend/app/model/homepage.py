
from app.extensions import db
from datetime import datetime

class Homepage(db.Model):
    __tablename__ = 'homepages'

    id = db.Column(db.Integer, primary_key=True)

    # Hero Section
    hero_title = db.Column(db.String(200), nullable=False)
    hero_subtitle = db.Column(db.String(300))
    hero_image = db.Column(db.String(255))

    # About Section
    about_title = db.Column(db.String(200))
    about_description = db.Column(db.Text)

    # Services Section
    services_title = db.Column(db.String(200))

    # Call to Action
    cta_text = db.Column(db.String(100))
    cta_link = db.Column(db.String(255))

    created_at = db.Column(db.DateTime, default=lambda: datetime.now(datetime.timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(datetime.timezone.utc),
        onupdate=lambda: datetime.now(datetime.timezone.utc)
    )

    def __repr__(self):
        return f"<Homepage {self.hero_title}>"