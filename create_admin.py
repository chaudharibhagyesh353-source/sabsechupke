import os
import django

print("--- Starting Superuser Script ---")
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sabsechupke_project.settings')
django.setup()

from django.contrib.auth import get_user_model

def create_superuser():
    try:
        User = get_user_model()
        username = 'bhagyesh'
        email = 'bhagyesh@gmail.com'
        password = 'Bh@gye$h353'
        
        if not User.objects.filter(username=username).exists():
            print(f"User '{username}' not found. Attempting creation...")
            User.objects.create_superuser(username=username, email=email, password=password)
            print("Superuser created successfully.")
        else:
            print(f"Superuser '{username}' already exists in the database.")
    except Exception as e:
        print(f"Error occurred during superuser creation: {e}")

if __name__ == "__main__":
    create_superuser()
    print("--- Superuser Script Finished ---")