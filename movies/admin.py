from django.contrib import admin
from .models import Movie, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name',)

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'year', 'rating', 'views', 'duration', 'is_featured', 'created_at')
    list_filter = ('category', 'year', 'is_featured')
    search_fields = ('title', 'desc')
    list_editable = ('is_featured',)
    ordering = ('-created_at',)
