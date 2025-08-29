from flask import Flask
from flask_cors import CORS
import os

from config import config
from models import DatabaseManager
from ml_model import DiabetesPredictor
from auth import create_auth_blueprint
from main import create_main_blueprint

def create_app(config_name='default'):
    """Application factory pattern for API"""
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Enable CORS for Next.js frontend
    CORS(app, origins=["https://dia-predict-xi.vercel.app"], supports_credentials=True)
    
    # Initialize database manager
    db_manager = DatabaseManager(app.config['DATABASE'])
    
    # Initialize ML predictor
    try:
        predictor = DiabetesPredictor()
    except Exception as e:
        print(f"Warning: Could not load ML models: {e}")
        predictor = None
    
    # Register API blueprints
    app.register_blueprint(create_auth_blueprint(db_manager), url_prefix='/api/auth')
    app.register_blueprint(create_main_blueprint(db_manager, predictor), url_prefix='/api')
    
    # Init DB if not exists (for SQLite)
    db_path = app.config['DATABASE'].replace("sqlite:///", "")
    if not os.path.exists(db_path):
        db_manager.init_db()
    
    return app

config_name = os.environ.get('FLASK_CONFIG', 'default')
app = create_app(config_name) 
