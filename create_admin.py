import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sabsechupke_project.settings')
django.setup()

from django.contrib.auth import get_user_model

def create_superuser():
    User = get_user_model()
    username = 'bhagyesh'
    email = 'bhagyesh@gmail.com'
    password = 'Bh@gye$h353'
    
    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser for {username}...")
        User.objects.create_superuser(username, email, password)
        print("Superuser created successfully.")
    else:
        print(f"Superuser {username} already exists.")

if __name__ == "__main__":
    create_superuser()