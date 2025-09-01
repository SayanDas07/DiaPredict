# DiaPredict 🩺

A comprehensive full-stack diabetes prediction application that uses machine learning to assess diabetes risk and provides personalized health recommendations.

## 🌟 Features

- **Diabetes Risk Prediction**: Advanced ML algorithms to predict diabetes risk based on health metrics
- **User Authentication**: Secure registration and login system
- **Interactive Dashboard**: Clean, intuitive interface for health monitoring
- **AI-Powered Suggestions**: Personalized health recommendations based on your risk profile
- **Doctor Locator**: Find nearby healthcare professionals when needed
- **Health Records**: Track and visualize your prediction history and health stats
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Deployment

- **Docker** - Containerized deployment
- **Multi-stage Build** - Optimized container images

## 📋 Prerequisites

- **Docker & Docker Compose** (for containerized setup)
- **Node.js 18+** and **Python 3.10+** (for local development)

## 🚀 Setup & Installation

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DiaPredict
   ```

2. **Build and run with Docker**
   ```bash
   docker build -t diapredict .
   docker run -p 3000:3000 -p 5000:5000 diapredict
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Server main API: http://localhost:5000

### Option 2: Local Development Setup

#### Backend Setup
1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server**
   ```bash
   python app.py
   ```
   Server runs on: http://localhost:5000

#### Frontend Setup
1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:3000

## 🔧 Environment Variables

### Server (.env)
```bash
copy the .env.sample variables and use your data
```



## 📖 How to Use DiaPredict

### Step 1: Register & Login
1. Visit http://localhost:3000
2. Click on **"Sign Up"** to create a new account
3. Fill in your details (name, email, password)
4. After registration, **login** with your credentials

### Step 2: Access Dashboard
1. Once logged in, you'll be redirected to your **Dashboard**
2. The dashboard shows your health overview and quick actions
3. Navigate through the clean, intuitive interface

### Step 3: Make a Prediction
1. Click on **"New Prediction"** or **"Health Check"**
2. Enter your health metrics:
   - Age
   - BMI (Body Mass Index)
   - Blood Pressure
   - Other relevant health indicators

3. Click **"Predict Risk"**
4. View your diabetes risk assessment:
   - **Low Risk**: ✅ You're in good shape! Keep maintaining healthy habits
   - **High Risk**: ⚠️ Consider lifestyle changes and medical consultation

### Step 4: Get Personalized Support (For High Risk)
If your prediction shows higher diabetes risk, you'll see two powerful features:

#### 🤖 AI Suggestions
- Personalized dietary recommendations
- Exercise plans tailored to your profile
- Lifestyle modification tips
- Prevention strategies

#### 🏥 Find Nearby Doctors
- Locate healthcare professionals in your area
- Filter by specialty (endocrinologists, general practitioners)
- View ratings and contact information
- Get directions to clinics

### Step 5: Track Your Progress
1. Visit your **Profile** page to:
   - View account settings
   - Manage preferences
   - View health statistics

2. Check **Records** page to:
   - See all past predictions
   - Track risk trends over time



