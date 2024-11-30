from django.urls import path
from .views import *

urlpatterns = [
    path("auth/", StravaAuthView.as_view(), name="authenticate"),
    path("callback/", StravaTokenView.as_view(), name="stravatokenview"),
    path("refresh/",StravaRefreshTokenView.as_view(), name="stravarefreshtokenview"),
    path("data/", StravaDataView.as_view(), name="data"),
    path("refresh_token/", RefreshToken.as_view(),name="refresh_token"),
    path("access_token/", AccessToken.as_view(),name="access_token")
]
