# **Disport Tracker: Strava Integration App**

Disport Tracker is a React-Django-based application that integrates with the Strava API to help users monitor their fitness activities. The app provides a dashboard to view activity data and heart rate trends while ensuring secure token-based authentication.

## **Features**
- **Authentication**: OAuth integration with Strava for secure access.
- **Activity Tracking**: Fetch and display user activities from Strava.
- **Heart Rate Visualization**: Line chart to visualize average heart rate over time.
- **Token Refresh**: Automatic handling of expired access tokens.

---

## **Installation Instructions**

## **Backend (Django)**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/US-PRASATH/DiSport-Tracker.git
   cd backend
   ```
### Create a Virtual Environment: Create a virtual environment to isolate your Python dependencies:
   ```bash
   python -m venv env
```

### Activate the Virtual Environment:

On Windows:
```bash
env\Scripts\activate
```
On MacOS/Linux:
```bash
source env/bin/activate
```
### Install the Dependencies: Install the required Python packages using pip:

```bash
pip install -r requirements.txt
```

### Set Up Environment Variables: Create a .env file in the backend directory with the following content:
```bash
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_REDIRECT_URL=http://127.0.0.1:8000/strava/auth/callback/
DASHBOARD_REDIRECT_URL=http://127.0.0.1:3000/dashboard
```
Replace the placeholders with your actual Strava API credentials (which can be obtained from the Strava API).

### Run the server:
```bash
python manage.py runserver
```
## **Frontend (React)**

### Navigate to the Frontend Directory: From the root of the repository, move into the frontend directory:
```bash
cd frontend
```

### Install Node.js Dependencies: Make sure you have Node.js and npm installed. Then, install the required frontend dependencies:
```bash
npm install
```

### Start the React Development Server: Start the frontend server:
```bash
npm run start
```
### Open the Application: Navigate to http://localhost:3000 in your web browser to access the frontend.

## Usage Instructions
### Authenticate with Strava:
Once the application is running, you will be prompted to log in using your Strava credentials.
The OAuth flow will redirect you to Strava's login page. After granting permission, you will be redirected back to the app.
Once authenticated, the app will display your fitness activities and heart rate trends.


