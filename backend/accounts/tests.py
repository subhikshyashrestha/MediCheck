from django.test import TestCase

# Create your tests here.
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status


class AuthTests(APITestCase):

    def test_register_success(self):
        response = self.client.post('/api/auth/register/', {
            'username': 'newuser',
            'email': 'newuser@gmail.com',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_duplicate_username(self):
        User.objects.create_user(username='dupuser', password='pass123')
        response = self.client.post('/api/auth/register/', {
            'username': 'dupuser',
            'email': 'dup@gmail.com',
            'password': 'testpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_success(self):
        User.objects.create_user(username='loginuser', password='loginpass123')
        response = self.client.post('/api/auth/login/', {
            'username': 'loginuser',
            'password': 'loginpass123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    def test_login_wrong_password(self):
        User.objects.create_user(username='wronguser', password='correctpass')
        response = self.client.post('/api/auth/login/', {
            'username': 'wronguser',
            'password': 'wrongpass'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_logout_success(self):
        User.objects.create_user(username='logoutuser', password='logoutpass123')
        login_response = self.client.post('/api/auth/login/', {
            'username': 'logoutuser',
            'password': 'logoutpass123'
        })
        refresh_token = login_response.data['refresh']
        response = self.client.post('/api/auth/logout/', {
            'refresh': refresh_token
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class DummyDataAuthTests(APITestCase):

    def test_five_dummy_users_register_login_logout(self):
        dummy_users = [
            {'username': 'ram', 'email': 'ram@gmail.com', 'password': 'rampass123'},
            {'username': 'sita', 'email': 'sita@gmail.com', 'password': 'sitapass123'},
            {'username': 'hari', 'email': 'hari@gmail.com', 'password': 'haripass123'},
            {'username': 'gita', 'email': 'gita@gmail.com', 'password': 'gitapass123'},
            {'username': 'shyam', 'email': 'shyam@gmail.com', 'password': 'shyampass123'},
        ]

        for user_data in dummy_users:
            # Register
            register_response = self.client.post('/api/auth/register/', user_data)
            self.assertEqual(register_response.status_code, status.HTTP_201_CREATED)

            # Login
            login_response = self.client.post('/api/auth/login/', {
                'username': user_data['username'],
                'password': user_data['password']
            })
            self.assertEqual(login_response.status_code, status.HTTP_200_OK)
            self.assertIn('access', login_response.data)

            # Logout
            refresh_token = login_response.data['refresh']
            logout_response = self.client.post('/api/auth/logout/', {
                'refresh': refresh_token
            })
            self.assertEqual(logout_response.status_code, status.HTTP_200_OK)