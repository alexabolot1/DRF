from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from todo.views import ProjectModelViewSet, NotesModelViewSet
from users.views import UserModelViewSet

router = DefaultRouter()
router.register('users', UserModelViewSet)
router.register('projects', ProjectModelViewSet)
router.register('notes', NotesModelViewSet)

urlpatterns = [
   path('admin/', admin.site.urls),
   path('api-auth/', include('rest_framework.urls')),
   path('api/', include(router.urls)),
]
