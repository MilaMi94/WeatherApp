from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate_password(self, value):
        validate_password(value)  # Django built-in validation
        return value

    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters.")
        if not value.isalnum() and "_" not in value:
            raise serializers.ValidationError("Username can only contain letters, numbers, and underscores.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user