from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from todo.models import Project, Notes
from todo.serializers import ProjectModelSerializer, NotesModelSerializer


# class ProjectLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 10


class ProjectCustomViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = ProjectLimitOffsetPagination

    # Фильтрация по названию - в названии должно присутствовать слово project.
    # def get_queryset(self):
    #     return Project.objects.filter(name__contains='project')


# class NotesLimitOffsetPagination(LimitOffsetPagination):
#     default_limit = 20


class NotesCustomViewSet(ModelViewSet):
    queryset = Notes.objects.all()
    serializer_class = NotesModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    # pagination_class = NotesLimitOffsetPagination
    # filterset_fields = ['project_name']

    # def perform_destroy(self, instance):
    #     instance.is_active = False
    #     instance.save()

