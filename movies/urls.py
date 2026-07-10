from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('watch/<int:movie_id>/', views.watch_view, name='watch'),
]
