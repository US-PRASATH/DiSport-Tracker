from django.shortcuts import render
from rest_framework.views import APIView, Response
from rest_framework import status
from django.shortcuts import redirect
import requests
import os
from localStoragePy import localStoragePy


STRAVA_CLIENT_ID = os.getenv("STRAVA_CLIENT_ID")
STRAVA_CLIENT_SECRET = os.getenv("STRAVA_CLIENT_SECRET")
STRAVA_REDIRECT_URL = os.getenv("STRAVA_REDIRECT_URL")
DASHBOARD_REDIRECT_URL = os.getenv("DASHBOARD_REDIRECT_URL")

class StravaAuthView(APIView):
    def get(self, request):    
        auth_url = f"http://www.strava.com/oauth/authorize?client_id={STRAVA_CLIENT_ID}&response_type=code&redirect_uri={STRAVA_REDIRECT_URL}&approval_prompt=force&scope=read,activity:read"
        
        return redirect(auth_url)
    
class StravaDataView(APIView):
    def get(self, request):
        localStorage = localStoragePy('me.fit.disport','sqlite3')
        access_token = localStorage.getItem("access_token")
        if not access_token:
            redirect("/strava/auth")
        activities_url = "https://www.strava.com/api/v3/athlete/activities"
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(activities_url, headers=headers)    
        return Response(response.json())

class StravaTokenView(APIView):
    def get(self, request):
        localStorage = localStoragePy('me.fit.disport','sqlite3')
        code = request.GET.get("code")
        if not code:
            return Response({"error": "No authorization code provided"}, status=status.HTTP_400_BAD_REQUEST)
        token_url = "https://www.strava.com/oauth/token"
        response = requests.post(
        token_url,
        data={
            "client_id": STRAVA_CLIENT_ID,
            "client_secret": STRAVA_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
        },
        )
        response_data = response.json()
        access_token = response_data.get("access_token")
        refresh_token = response_data.get("refresh_token")
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("access_token_expires_in",response_data.get("expires_in"))
        localStorage.setItem("refresh_token", refresh_token)
        return redirect(f"{DASHBOARD_REDIRECT_URL}")

    
class StravaRefreshTokenView(APIView):
    def post(self, request):
        localStorage = localStoragePy('me.fit.disport','sqlite3')
        refresh_token = request.data['refresh_token']
        token_url = "https://www.strava.com/oauth/token"
        response = requests.post(
        token_url,
        data={
            "client_id": STRAVA_CLIENT_ID,
            "client_secret": STRAVA_CLIENT_SECRET,
            "grant_type": "refresh_token",
            "refresh_token": refresh_token,
        },
        )
        response_data = response.json()
        access_token = response_data.get("access_token")
        refresh_token = response_data.get("refresh_token")
        localStorage.setItem("access_token", access_token)
        localStorage.setItem("access_token_expires_in",response_data.get("expires_in"))
        return Response({"access_token":access_token})

class RefreshToken(APIView):
    def get(self, request):
        localStorage = localStoragePy('me.fit.disport','sqlite3')
        return Response({"refresh_token":localStorage.getItem("refresh_token")})
    
class AccessToken(APIView):
    def get(self, request):
        localStorage = localStoragePy('me.fit.disport','sqlite3')
        return Response({"access_token":localStorage.getItem("access_token"),"expires_in":localStorage.getItem("access_token_expires_in")})
    