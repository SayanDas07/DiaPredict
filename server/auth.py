from flask import Blueprint, request, jsonify
import jwt
from datetime import datetime, timedelta
from functools import wraps
import os
import re

def create_auth_blueprint(db_manager):
    auth_bp = Blueprint('auth', __name__)
    
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.headers.get('Authorization')
            if token:
                try:
                    token = token.split(' ')[1] 
                    data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
                    current_user = db_manager.get_user_by_id(data['user_id'])
                    if not current_user:
                        return jsonify({'error': 'Invalid token'}), 401
                except Exception as e:
                    return jsonify({'error': 'Invalid token'}), 401
            else:
                return jsonify({'error': 'Token missing'}), 401
            
            return f(current_user, *args, **kwargs)
        return decorated
    



    @auth_bp.route('/register', methods=['POST'])
    def register():
        """User registration API"""
        try:
            data = request.get_json()
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            confirm_password = data.get('confirmPassword')
            
            if not all([username, email, password, confirm_password]):
                return jsonify({'error': 'All fields are required'}), 400
            
            if not email.lower().endswith('@gmail.com'):
                return jsonify({'error': 'Only Gmail addresses are allowed'}), 400
            
            if password != confirm_password:
                return jsonify({'error': 'Passwords do not match'}), 400

            password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$'
            if not re.match(password_regex, password):
                return jsonify({
                    'error': 'Password must be at least 6 characters long and include uppercase, lowercase, number, and special character'
                }), 400
            
            if not re.match(r'^\w{3,20}$', username):
                return jsonify({'error': 'Username must be 3-20 characters and contain only letters, numbers, or underscores'}), 400

            if db_manager.create_user(username, email, password):
                return jsonify({'message': 'Registration successful'}), 201
            else:
                return jsonify({'error': 'Username or email already exists'}), 409
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    @auth_bp.route('/login', methods=['POST'])
    def login():
        """User login API"""
        try:
            data = request.get_json()
            username = data.get('username')
            password = data.get('password')
            
            user = db_manager.authenticate_user(username, password)
            if user:
                # Generate JWT token
                token = jwt.encode({
                    'user_id': user.id,
                    'username': user.username,
                    'exp': datetime.utcnow() + timedelta(hours=24)
                }, os.environ.get('SECRET_KEY'), algorithm='HS256')
                
                response = jsonify({
                    'message': 'Login successful',
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                })
                
                # Set HTTP-only cookie
                response.set_cookie(
                    'token', 
                    token, 
                    httponly=True, 
                    secure=False,  # Set to True in production with HTTPS
                    samesite='Lax',
                    max_age=24*60*60  # 24 hours
                )
                
                return response, 200
            else:
                return jsonify({'error': 'Invalid credentials'}), 401
                
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @auth_bp.route('/logout', methods=['POST'])
    def logout():
        """User logout API"""
        response = jsonify({'message': 'Logged out successfully'})
        response.set_cookie('token', '', expires=0)
        return response, 200
    
    @auth_bp.route('/verify', methods=['GET'])
    def verify_token():
        """Verify JWT token from cookie"""
        try:
            token = request.cookies.get('token')
            if not token:
                return jsonify({'error': 'No token provided'}), 401
            
            data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
            user = db_manager.get_user_by_id(data['user_id'])
            
            if user:
                return jsonify({
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                }), 200
            else:
                return jsonify({'error': 'User not found'}), 404
                
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401
    
    return auth_bp