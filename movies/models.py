from django.db import models
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"


class Movie(models.Model):
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    rating = models.FloatField(default=0.0)
    views = models.CharField(max_length=50, default="0")
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, related_name='movies')
    duration = models.CharField(max_length=50)  # e.g., "2h 18m"
    desc = models.TextField()
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True)
    video_file = models.FileField(upload_to='videos/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def genre(self):
        return self.category.name if self.category else ""

    def __str__(self):
        return self.title
