from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_medicines, name='list_medicines'),
    path('add/', views.add_medicine, name='add_medicine'),
    path('<int:pk>/delete/', views.delete_medicine, name='delete_medicine'),
]