from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Medicine


class MedicineAPITests(APITestCase):

    def setUp(self):
        # Create a user and log in to get token
        self.user = User.objects.create_user(username='meduser', password='medpass123')
        login_response = self.client.post('/api/auth/login/', {
            'username': 'meduser',
            'password': 'medpass123'
        })
        self.token = login_response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_add_medicine(self):
        response = self.client.post('/api/medicines/add/', {
            'name': 'Paracetamol',
            'dosage': '500mg',
            'reminder_time': '08:00:00'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'Paracetamol')

    def test_list_medicines(self):
        Medicine.objects.create(user=self.user, name='Ibuprofen', dosage='400mg', reminder_time='12:00:00')
        response = self.client.get('/api/medicines/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_delete_medicine(self):
        medicine = Medicine.objects.create(user=self.user, name='Aspirin', dosage='100mg', reminder_time='20:00:00')
        response = self.client.delete(f'/api/medicines/{medicine.id}/delete/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Medicine.objects.count(), 0)

    def test_add_medicine_without_auth(self):
        self.client.credentials()
        response = self.client.post('/api/medicines/add/', {
            'name': 'Metformin',
            'dosage': '500mg',
            'reminder_time': '07:00:00'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_five_dummy_medicines(self):
        dummy_medicines = [
            {'name': 'Paracetamol', 'dosage': '500mg', 'reminder_time': '08:00:00'},
            {'name': 'Ibuprofen', 'dosage': '400mg', 'reminder_time': '12:00:00'},
            {'name': 'Amoxicillin', 'dosage': '250mg', 'reminder_time': '09:00:00'},
            {'name': 'Metformin', 'dosage': '500mg', 'reminder_time': '07:00:00'},
            {'name': 'Aspirin', 'dosage': '100mg', 'reminder_time': '20:00:00'},
        ]
        for medicine in dummy_medicines:
            response = self.client.post('/api/medicines/add/', medicine)
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        list_response = self.client.get('/api/medicines/')
        self.assertEqual(len(list_response.data), 5)