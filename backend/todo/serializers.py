from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from todo.models import Project, Notes


class ProjectModelSerializer(ModelSerializer):

    users = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class NotesModelSerializer(ModelSerializer):

    class Meta:
        model = Notes
        fields = '__all__'
