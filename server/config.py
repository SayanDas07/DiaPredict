import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-change-this'
    DATABASE = os.environ.get('DATABASE') or 'sqlite:///diabetes_app.db'
    
class DevelopmentConfig(Config):
    DEBUG = True
    FLASK_ENV = os.environ.get('FLASK_ENV') or 'development'
    
class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
