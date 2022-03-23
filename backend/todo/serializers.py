from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, StringRelatedField
from todo.models import Project, Notes


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class NotesModelSerializer(ModelSerializer):

    class Meta:
        model = Notes
        fields = '__all__'

    def to_representation(self, instance):
        rep = super(NotesModelSerializer, self).to_representation(instance)
        rep['project_name'] = instance.project_name.name
        return rep
