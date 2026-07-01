from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Medicine
from .serializers import MedicineSerializer


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_medicines(request):
    medicines = Medicine.objects.filter(user=request.user)
    serializer = MedicineSerializer(medicines, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_medicine(request):
    serializer = MedicineSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_medicine(request, pk):
    try:
        medicine = Medicine.objects.get(pk=pk, user=request.user)
        medicine.delete()
        return Response({'message': 'Medicine deleted successfully'})
    except Medicine.DoesNotExist:
        return Response({'error': 'Medicine not found'}, status=status.HTTP_404_NOT_FOUND)