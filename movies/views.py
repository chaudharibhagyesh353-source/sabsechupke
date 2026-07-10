from django.shortcuts import render, get_object_or_404
from django.db import models
from .models import Movie, Category

def home_view(request):
    q = request.GET.get('q', '').strip()
    genre = request.GET.get('genre', '').strip()
    
    movies = Movie.objects.all()
    categories = Category.objects.all()
    
    # Filter query
    if q:
        movies = movies.filter(
            models.Q(title__icontains=q) |
            models.Q(desc__icontains=q) |
            models.Q(category__name__icontains=q)
        )
    
    # Filter category by slug
    if genre:
        movies = movies.filter(category__slug__iexact=genre)
        
    is_searching = bool(q or genre)
    
    # Featured banner
    featured_movie = Movie.objects.filter(is_featured=True).first()
    if not featured_movie:
        featured_movie = Movie.objects.first()
        
    # Segmented lists
    freshly_uploaded = []
    hidden_gems = []
    trending_movies = []
    
    if not is_searching:
        freshly_uploaded = Movie.objects.all().order_by('-created_at')[:6]
        hidden_gems = Movie.objects.all().order_by('-rating')[:6]
        trending_movies = Movie.objects.all().order_by('?')[:6]

    context = {
        'featured_movie': featured_movie,
        'freshly_uploaded': freshly_uploaded,
        'hidden_gems': hidden_gems,
        'trending_movies': trending_movies,
        'movies': movies,
        'is_searching': is_searching,
        'categories': categories,
    }
    return render(request, 'home.html', context)

def watch_view(request, movie_id):
    movie = get_object_or_404(Movie, id=movie_id)
    next_up = Movie.objects.exclude(id=movie_id).order_by('-rating')[:7]
    categories = Category.objects.all()
    
    context = {
        'movie': movie,
        'next_up': next_up,
        'categories': categories,
    }
    return render(request, 'watch.html', context)
