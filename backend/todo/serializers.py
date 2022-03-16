from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from todo.models import Project, Notes
from users.serializers import UserModelSerializer


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class NotesModelSerializer(ModelSerializer):

    class Meta:
        model = Notes
        fields = '__all__'
