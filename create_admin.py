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
        
        # Yeh line user ko dhundhegi ya naya banayegi
        user, created = User.objects.get_or_create(username=username, defaults={'email': email})
        
        # Yeh line FORCEFULLY password set karegi, chahe user purana ho ya naya
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        
        if created:
            print(f"Superuser '{username}' created successfully!")
        else:
            print(f"Superuser '{username}' already existed. Password FORCEFULLY reset to new password!")
            
    except Exception as e:
        print(f"Error occurred during superuser creation: {e}")

if __name__ == "__main__":
    create_superuser()
    print("--- Superuser Script Finished ---")