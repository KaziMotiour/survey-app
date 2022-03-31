from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from authentication.serializers import UserSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializer(self.user).data

        for k, v in serializer.items():
            data[k] = v
        # data['username'] = self.user.name
        data['email'] = self.user.email
        data['is_superuser'] = self.user.is_superuser

        return data