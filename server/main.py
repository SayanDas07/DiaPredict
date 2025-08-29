from flask import Blueprint, request, jsonify
import jwt
from functools import wraps
import os
import traceback
from dotenv import load_dotenv
load_dotenv()

def create_main_blueprint(db_manager, predictor):
    main_bp = Blueprint('main', __name__)
    
    def token_required(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            token = request.cookies.get('token')
            if not token:
                return jsonify({'error': 'Token missing'}), 401
            
            try:
                data = jwt.decode(token, os.environ.get('SECRET_KEY'), algorithms=['HS256'])
                current_user = db_manager.get_user_by_id(data['user_id'])
                if not current_user:
                    return jsonify({'error': 'Invalid token'}), 401
            except Exception as e:
                return jsonify({'error': 'Invalid token'}), 401
            
            return f(current_user, *args, **kwargs)
        return decorated
    
    @main_bp.route('/predict', methods=['POST'])
    @token_required
    def predict(current_user):
        try:
            data = request.get_json()
            feature_names = predictor.get_feature_names()
            features = [float(data.get(f, 0)) for f in feature_names]

            if len(features) != 8:
                return jsonify({'error': 'Features must have 8 numbers'}), 400

            prediction, probability = predictor.predict(features)
            result = "High Risk" if prediction == 1 else "Low Risk"

            # Save prediction immediately; suggestion can be None
            db_manager.save_prediction(current_user.id, features, prediction, probability, suggestion=None)

            return jsonify({
                'result': result,
                'prediction': int(prediction),
                'probability': float(probability),
                'message': f'Prediction: {result} (Probability: {probability:.1%})'
            }), 200

        except Exception as e:
            print("Error in /predict:", traceback.format_exc())
            return jsonify({'error': str(e)}), 500

    @main_bp.route('/dashboard', methods=['GET'])
    @token_required
    def dashboard(current_user):
        """Get dashboard data"""
        try:
            predictions = db_manager.get_user_predictions(current_user.id)
            recent_predictions = predictions[:5] if predictions else []
            
            return jsonify({
                'user': {
                    'username': current_user.username,
                    'email': current_user.email
                },
                'recent_predictions': [
                    {
                        'id': p['id'],
                        'result': 'High Risk' if p['prediction'] == 1 else 'Low Risk',
                        'probability': p['probability'],
                        'created_at': p['created_at'],
                        'bmi': p['bmi'],
                        'age': p['age']
                    } for p in recent_predictions
                ]
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
   
        try:
            data = request.get_json()
            print("Received data:", data)

            feature_names = predictor.get_feature_names()
            features = [float(data.get(f, 0)) for f in feature_names]
            print("Processed features:", features)

            prediction, probability = predictor.predict(features)
            print("Prediction:", prediction, "Probability:", probability)

            result = "High Risk" if prediction == 1 else "Low Risk"
            return jsonify({
                'result': result,
                'prediction': int(prediction),
                'probability': float(probability),
                'message': f'Prediction: {result} (Probability: {probability:.1%})'
            }), 200

        except Exception as e:
            print("Error in /predict:", traceback.format_exc())
            return jsonify({'error': str(e)}), 500

    @main_bp.route('/history', methods=['GET'])
    @token_required
    def history(current_user):
        """Get prediction history"""
        try:
            predictions = db_manager.get_user_predictions(current_user.id)
            
            return jsonify({
                'predictions': [
                    {
                        'id': p['id'],
                        'result': 'High Risk' if p['prediction'] == 1 else 'Low Risk',
                        'probability': p['probability'],
                        'created_at': p['created_at'],
                        'bmi': p['bmi'],
                        'age': p['age'],
                        'high_bp': p['high_bp'],
                        'high_chol': p['high_chol'],
                        'gen_hlth': p['gen_hlth'],
                        'suggestion': p['suggestion']
                    } for p in predictions
                ]
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @main_bp.route('/profile', methods=['GET'])
    @token_required
    def profile(current_user):
        """Get user profile data"""
        try:
            predictions = db_manager.get_user_predictions(current_user.id)
            prediction_count = len(predictions)
            last_prediction_date = predictions[0]['created_at'] if predictions else None
            
            return jsonify({
                'user': {
                    'username': current_user.username,
                    'email': current_user.email
                },
                'stats': {
                    'prediction_count': prediction_count,
                    'last_prediction_date': last_prediction_date
                }
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @main_bp.route('/suggestion', methods=['POST'])
    @token_required
    def suggestion(current_user):
        """Generate AI-based health suggestion using Gemini-2.5-Flash"""
        try:
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No input data provided'}), 400

            features = data.get('features', [])
            prediction = int(data.get('prediction', 0))
            probability = float(data.get('probability', 0.0))
            suggestion_text = data.get('suggestion')  # optional

            if len(features) != 8:
                return jsonify({'error': 'Features must be a list of 8 numbers'}), 400

            # Only generate AI suggestion if not provided
            if not suggestion_text:
                api_key = os.environ.get('GOOGLEAI_API_KEY')
               

                if not api_key:
                    return jsonify({'error': 'GOOGLEAI_API_KEY not set'}), 500

                try:
                    from google import genai
                    client = genai.Client(api_key=api_key)

                    prompt = f"""
                    User prediction: {"High Risk" if prediction==1 else "Low Risk"}
                    Risk probability: {probability:.2%}
                    Features: {features}
                    Provide a friendly health suggestion for diabetes prevention or management.
                    """

                    # Use the new SDK method
                    response = client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt
                    )

                    suggestion_text = response.text.strip()
                    print("AI suggestion generated:", suggestion_text)

                except Exception as e:
                    print("Gemini API error:", traceback.format_exc())
                    return jsonify({'error': 'Failed to get suggestion from AI', 'details': str(e)}), 500

            # Save to DB
            db_manager.save_prediction(current_user.id, features, prediction, probability, suggestion_text)

            return jsonify({'suggestion': suggestion_text, 'message': 'Suggestion generated successfully'}), 200

        except Exception as e:
            print("Suggestion route error:", traceback.format_exc())
            return jsonify({'error': str(e)}), 500

    return main_bp